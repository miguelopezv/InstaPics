import { applyFilter } from './filters'
import url from 'url'
import path from 'path'

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
 * set selected image
 * @param  {} node the element to set as selected
 */
function changeImage (node) {
  if (node) {
    const selected = document.querySelector('li.selected')

    if (selected) {
      selected.classList.remove('selected')
    }
    node.classList.add('selected')
    const image = document.getElementById('image-displayed')
    image.src = node.querySelector('img').src
    image.dataset.original = image.src
    document.getElementById('filters').selectedIndex = 0
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

/**
 * Select first image from the array
 */
function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
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
 * Remove all images already on the sidebar
 */
function clearImages () {
  const oldImages = document.querySelectorAll('li.list-group-item')
  oldImages.forEach((o, index) => o.parentNode.removeChild(o))
}

/**
 * insert all images from folder on sidebar
 * @param  {array} images array of images to display
 */
function loadImages (images) {
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

module.exports = {
  addImagesEvents: addImagesEvents,
  changeImage: changeImage,
  selectFirstImage: selectFirstImage,
  selectedFilterEvent: selectedFilterEvent,
  searchImagesEvent: searchImagesEvent,
  clearImages: clearImages,
  loadImages: loadImages
}
