import { setIpc, openDirectory } from './ipcRendererEvents'
import { addImagesEvents, searchImagesEvent, selectedFilterEvent } from './images-ui'

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
