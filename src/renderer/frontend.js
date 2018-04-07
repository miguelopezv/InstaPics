import url from 'url'
import path from 'path'
import applyFilter from './filters'
import { setIpc, openDirectory } from './ipcRendererEvents'

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectedFilterEvent()
  buttonEvent('open-dir', openDirectory)
})

/**
 * Adds a event to a button
 * @param  {string} id   Id of the element
 * @param  {function} func function to use as callback
 */
function buttonEvent (id, func) {
  const opendir = document.getElementById(id)
  opendir.addEventListener('click', func)
}

/**
 * Add click event to all images
 */
function addImagesEvents () {
  const thumbs = document.querySelectorAll('li.list-group-item')

  thumbs.forEach(t => {
    t.addEventListener('click', function () {
      changeImage(this)
    })
  })
}

/**
 * Apply filter to image
 */
function selectedFilterEvent () {
  const selected = document.getElementById('filters')

  selected.addEventListener('change', function () {
    applyFilter(this.value, document.getElementById('image-displayed'))
  })
}

/**
 * set selected image
 * @param  {} node the element to set as selected
 */
function changeImage (node) {
  if (node) {
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')

    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

/**
 * Function to filter images
 */
function searchImagesEvent () {
  const searchBox = document.getElementById('search-box')

  searchBox.addEventListener('keyup', function () {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')
    const thumbs = document.querySelectorAll('li.list-group-item img')

    if (this.value.length > 0) {
      thumbs.forEach(i => {
        const fileUrl = (url.parse(i.src))
        const fileName = path.basename(fileUrl.pathname)

        if (fileName.match(regex)) {
          i.parentNode.classList.remove('hidden')
        } else {
          i.parentNode.classList.add('hidden')
        }
      })
    } else {
      thumbs.forEach(t => t.parentNode.classList.remove('hidden'))
    }
    selectFirstImage()
  })
}

/**
 * Select first image from the array
 */
function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}
