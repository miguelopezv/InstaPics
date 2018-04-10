import { setIpc, openDirectory, saveFile, openPreferences } from './main-window/ipcRendererEvents'
import { addImagesEvents, searchImagesEvent, selectedFilterEvent, print } from './main-window/images-ui'

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImagesEvent()
  selectedFilterEvent()
  buttonEvent('open-dir', openDirectory)
  buttonEvent('save-button', saveFile)
  buttonEvent('open-preferences', openPreferences)
  buttonEvent('print-button', print)
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
