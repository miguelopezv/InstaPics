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
      accelerator: 'CmdOrCtrl+O',
      click () { openDirectory() }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click () { saveFile() }
    },
    {
      label: 'Preferences',
      accelerator: 'CmdOrCtrl+,',
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
      accelerator: 'CmdOrCtrl+P',
      click () { print() }
    },
    {
      label: 'Upload',
    },
    {
      label: 'Paste image',
      accelerator: 'CmdOrCtrl+V',
      click () { pasteImage() }
    }]
  }]
  const menu = remote.Menu.buildFromTemplate(template)
  remote.Menu.setApplicationMenu(menu)
}

module.exports = createMenu