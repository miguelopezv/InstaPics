import { ipcRenderer } from 'electron'
import { addImagesEvents, selectFirstImage, clearImages, loadImages } from './images-ui'
import { saveImage } from './filters'
import path from 'path'

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
  showDialog: showDialog
}
