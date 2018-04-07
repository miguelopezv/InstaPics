import { ipcRenderer } from 'electron'

/**
 * Send event to IPCmain
 */
function openDirectory () {
  ipcRenderer.send('open-directory')
}

/**
 * Remove all images already on the sidebar
 */
function clearImages () {
  const oldImages = document.querySelectorAll('li.list-group-item')
  console.log("oldImages", oldImages);
  oldImages.forEach((o, index) => o.parentNode.removeChild(o))
}

/**
 * insert all images from folder on sidebar
 * @param  {array} images array of images to display
 */
function loadImages(images) {
    const imagesList = document.querySelector('ul.list-group')
    images.forEach(i => {
    const node = `<li class="list-group-item">
              <img class="media-object pull-left" src="${i.src}" height="32">
              <div class="media-body">
                <strong>${i.filename}</strong>
                <p>${i.size}</p>
              </div>
            </li>`

    imagesList.insertAdjacentHTML('beforeend', node)
    })
}

/**
 * Add click event to images loaded
 */
function addImagesEvent () {
    const thumbs = document.querySelectorAll('li.list-group-item')

  thumbs.forEach(t => {
    t.addEventListener('click', function () {
      changeImage(this)
    })
  })
}

/**
 * Remove selected image andd add new one
 * @param  {} node node to alter in HTML
 */
function changeImage (node) {
  if (node) {
    const selected = document.querySelector('li.selected')
    if (selected) {
        selected.classList.remove('selected')
    }
    node.classList.add('selected')

    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

/**
 * Select first image from list
 */
function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}

/**
 * Everything to be executed after load-images event
 */
function setIpc () {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages()
    loadImages(images)
    addImagesEvent()
    selectFirstImage()
  })
}

module.exports = {
  openDirectory: openDirectory,
  setIpc: setIpc
}
