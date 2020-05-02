import fs from 'fs-extra'

/**
 * Apply filter to the image
 * @param  {string} filter       name of the filter to apply
 * @param  {string} currentImage src of the image
 */
function applyFilter (filter, currentImage) {
    let imgObj = new Image() // eslint-disable-line
  imgObj.src = currentImage.dataset.original

    filterous.importImage(imgObj, {}) // eslint-disable-line
    .applyInstaFilter(filter)
    .renderHtml(currentImage)
}

/**
 * saveImage in destination folder
 * @param  {string}   filename src of the image
 * @param  {Function} callback function used as callback
 */
function saveImage (filename, callback) {
  let fileSrc = unescape(document.getElementById('image-displayed').src)
  if (fileSrc.indexOf(';base64,') !== -1) {
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')
    fs.writeFile(filename, fileSrc, 'base64', callback)
  } else {
    fileSrc = fileSrc.replace('inst://', '')
    fs.copy(fileSrc, filename, callback)
  }
}

module.exports = {
  applyFilter: applyFilter,
  saveImage: saveImage
}
