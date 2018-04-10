import { remote } from 'electron'
import { openDirectory, saveFile, openPreferences, pasteImage } from './ipcRendererEvents'
import { print } from './images-ui'
function createMenu () {
  const template = [
  {
    label: 'File',
    submenu: [
    {
      label: 'Open folder',
      click () { openDirectory() }
    },
    {
      label: 'Save',
      click () { saveFile() }
    },
    {
      label: 'Preferences',
      click () { openPreferences() }
    },
    {
      label: 'close',
      role: 'quit'
    }]
  },
  {
    label: 'Edit',
    submenu: [
    {
      label: 'Print',
      click () { print() }
    },
    {
      label: 'Upload',
    },
    {
      label: 'Paste image',
      click () { pasteImage() }
    }]
  }]
  const menu = remote.Menu.buildFromTemplate(template)
  remote.Menu.setApplicationMenu(menu)
}

module.exports = createMenu