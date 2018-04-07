import url from 'url'
import path from 'path'
import applyFilter from './filters'

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectedFilterEvent()
})

// Add event 'click' to all images
function addImagesEvents () {
  const thumbs = document.querySelectorAll('li.list-group-item')

  thumbs.forEach(t => {
    t.addEventListener('click', function () {
      changeImage(this)
    })
  })
}

// Apply filters to photos using an imported function
function selectedFilterEvent () {
  const selected = document.getElementById('filters')

  selected.addEventListener('change', function () {
    applyFilter(this.value, document.getElementById('image-displayed'))
  })
}

// change image for the one clicked
function changeImage (node) {
  if (node) {
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')

    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

// function for searchBox
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

// Select first image to be displayed after filtered
function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}
