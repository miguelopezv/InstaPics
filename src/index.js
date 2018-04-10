'use strict'

import { app, BrowserWindow, Tray, globalShortcut, protocol } from 'electron'
import devtools from './devtools'
import handleErrors from './handleErrors'
import setIpcMain from './ipcMainEvents'
import os from 'os'
import path from 'path'

if (process.env.NODE_ENV === 'develop') {
  devtools()
}

global.win //eslint-disable-line
global.tray //eslint-disable-line

// All that is going to happen when the window is ready with the config
app.on('ready', () => {
  protocol.registerFileProtocol('inst', (request, callback) => {
      const url = request.url.substr(7)
      callback({path: path.normalize(url)})
    }, (err) => {
      if (err) throw err
    })


  global.win = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    title: 'InstaPics',
    center: true,
    maximizable: false
  })

  globalShortcut.register('CmdOrCtrl+Alt+P', () => {
    global.win.show()
    global.win.focus()
  })

  handleErrors(global.win)
  setIpcMain(global.win)

  // this will run one time, when window is ready to show
  global.win.once('ready-to-show', () => {
    global.win.show()
  })

  let icon
  if (os.platform == 'win32') {
    icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.ico')
  } else {
    icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.png')
  }

  global.tray = new Tray(icon)
  global.tray.setToolTip('InstaPics')
  global.tray.on('click', () => {
    global.win.isVisible() ? global.win.hide() : global.win.show()
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
  globalShortcut.unregisterAll()
})
