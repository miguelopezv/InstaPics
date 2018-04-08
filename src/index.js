'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'
import handleErrors from './handleErrors'
import setIpcMain from './ipcMainEvents'

if (process.env.NODE_ENV === 'develop') {
  devtools()
}

global.win //eslint-disable-line

// All that is going to happen when the window is ready with the config
app.on('ready', () => {
  global.win = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    title: 'Hola Mundo',
    center: true,
    maximizable: false
  })

  handleErrors(global.win)
  setIpcMain(global.win)

  // this will run one time, when window is ready to show
  global.win.once('ready-to-show', () => {
    global.win.show()
  })

  // Content to be loaded inside the window
  global.win.loadURL(`file://${__dirname}/renderer/index.html`)

  // When the window is closed, the variable is emptied and executes code after quit
  global.win.on('closed', () => {
    global.win = null
    app.quit()
  })
})

// Code to run just before quit
app.on('before-quit', () => {
  console.log('Saliendo')
})
