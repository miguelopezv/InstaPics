'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'
import isImage from 'is-image'
import fs from 'fs'
import path from 'path'
import filesize from 'filesize'

if (process.env.NODE_ENV === 'develop') {
  devtools()
}

let win

// All that is going to happen when the window is ready with the config
app.on('ready', () => {
  win = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    title: 'Hola Mundo',
    center: true,
    maximizable: false
  })

  // this will run one time, when window is ready to show
  win.once('ready-to-show', () => {
    win.show()
  })

  // Content to be loaded inside the window
  win.loadURL(`file://${__dirname}/renderer/index.html`)

  // This will log the position of the window everytime it's moving
  win.on('move', () => {
    // const position = win.getPosition()
    // console.log(`La posición es ${position}`)
  })

  // When the window is closed, the variable is emptied and executes code after quit
  win.on('closed', () => {
    win = null
    app.quit()
  })
})

// Code to run just before quit
app.on('before-quit', () => {
  console.log('Saliendo')
})

ipcMain.on('open-directory', (event) => {
  dialog.showOpenDialog(win, {
    title: 'select location',
    buttonLabel: 'Open',
    properties: ['openDirectory']
  },
  (dir) => {
    const images = []
    if (dir) {
      fs.readdir(dir[0], (err, files) => {
        if (err) throw err
        files.forEach(f => {
          if (isImage(f)) {
            let imageFile = path.join(dir[0], f)
            let stats = fs.statSync(imageFile)
            let size = filesize(stats.size, {round: 0})
            images.push({filename: f, src: `file://${imageFile}`, size: size})
          }
        })
        event.sender.send('load-images', images)
      })
    }
  })
})
