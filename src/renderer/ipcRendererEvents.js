import { ipcRenderer } from 'electron'
import { addImagesEvents, selectFirstImage, clearImages, loadImages } from './images-ui'

/**
 * Send event to IPCmain
 */
function openDirectory () {
  ipcRenderer.send('open-directory')
}

/**
 * Everything to be executed after load-images event
 */
function setIpc () {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages()
    loadImages(images)
    addImagesEvents()
    selectFirstImage()
  })
}

module.exports = {
  openDirectory: openDirectory,
  setIpc: setIpc
}
