import { ipcMain, dialog } from 'electron'
import isImage from 'is-image'
import fs from 'fs'
import path from 'path'
import filesize from 'filesize'

/**
 * Define events to listen
 * @param {object} win reference to the window
 */
function setIpcMain (win) {
  ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
      title: 'select location',
      buttonLabel: 'Open',
      properties: ['openDirectory']
    },
    (dir) => {
      if (dir) {
        loadImages(event, dir[0])
      }
    })
  })

  ipcMain.on('load-directory', (event, dir) => {
    loadImages(event, dir)
  })

  ipcMain.on('open-save-dialog', (event, ext) => {
    dialog.showSaveDialog(win, {
      title: 'Save file',
      buttonLabel: 'Save',
      filters: [{name: 'image', extensions: [ext.substr(1)]}]
    }, (file) => {
      if (file) {
        event.sender.send('save-image', file)
      }
    })
  })

  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message
    })
  })
}

/**
 * load images on folder
 * @param  {event} event triggered event
 * @param  {string} dir   directory to load
 */
function loadImages (event, dir) {
  const images = []


  if (dir) {
        fs.readdir(dir, (err, files) => {
          if (err) throw err
          files.forEach(f => {
            if (isImage(f)) {
              let imageFile = path.join(dir, f)
              let stats = fs.statSync(imageFile)
              let size = filesize(stats.size, {round: 0})
              images.push({filename: f, src: `file://${imageFile}`, size: size})
            }
          })
          event.sender.send('load-images', dir, images)
        })
      }
}

module.exports = setIpcMain
