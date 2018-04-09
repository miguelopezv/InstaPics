import { ipcRenderer, remote } from 'electron'
import settings from 'electron-settings'
import { addImagesEvents, selectFirstImage, clearImages, loadImages } from './images-ui'
import { saveImage } from './filters'
import path from 'path'
import os from 'os'

/**
 * Everything to be executed after load-images event
 */
function setIpc () {
  if (settings.has('directory')) {
    ipcRenderer.send('load-directory', settings.get('directory'))
  }

  ipcRenderer.on('load-images', (event, dir, images) => {
    clearImages()
    loadImages(images)
    addImagesEvents()
    selectFirstImage()
    settings.set('directory', dir)
  })

  ipcRenderer.on('save-image', (event, file) => {
    saveImage(file, (err) => {
      if (err) return showDialog('error', 'InstaPics', err.message)
      showDialog('info', 'InstaPics', 'Image saved')
    })
  })
}

/**
 * Send event to IPCmain
 */
function openDirectory () {
  ipcRenderer.send('open-directory')
}

/**
 * open preferences window from the renderer instead of the IpcMain
 */
function openPreferences () {
  const BrowserWindow = remote.BrowserWindow
  const mainWindow = remote.getGlobal('win')

  const preferencesWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Preferences',
    center: true,
    modal: true,
    frame: false,
    show: false
  })

  if (os.platform() !== 'win32') {
    preferencesWindow.setParentWindow(mainWindow)
  }
  preferencesWindow.once('ready-to-show', () => {
    preferencesWindow.show()
    preferencesWindow.focus()
  })
  preferencesWindow.loadURL(`file://${path.join(__dirname, '..')}/preferences.html`)
}

/**
 * shows dialog depending on the situation
 * @param  {string} type  type of message
 * @param  {string} title title of the window
 * @param  {string} msg   description of the message
 */
function showDialog (type, title, msg) {
  ipcRenderer.send('show-dialog', {type: type, title: title, message: msg})
}

/**
 * Gets the extension of the img and save the file
 */
function saveFile () {
  const image = document.getElementById('image-displayed').dataset.original
  const extension = path.extname(image)
  ipcRenderer.send('open-save-dialog', extension)
}

module.exports = {
  openDirectory: openDirectory,
  setIpc: setIpc,
  saveFile: saveFile,
  showDialog: showDialog,
  openPreferences: openPreferences
}
