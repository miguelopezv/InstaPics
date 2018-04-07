'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

if (process.env.NODE_ENV === 'develop') {
  devtools()
}

// All that is going to happen when the window is ready with the config
app.on('ready', () => {
  let win = new BrowserWindow({
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
