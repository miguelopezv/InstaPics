import { app, dialog } from 'electron'

function relaunchApp (win) {
  dialog.showMessageBox(win, {
    type: 'error',
    title: 'InstaPics',
    message: 'Unexpected error, app will be restarted.'
  }, () => {
    app.relaunch()
    app.exit(0)
  })
}

function setupErrors (win) {
  win.webContents.on('crashed', () => {
    relaunchApp(win)
  })

  win.on('unresponsive', () => {
    dialog.showMessageBox(win, {
      type: 'warning',
      title: 'InstaPics',
      message: 'This is taking more time than expected, want to relaunch the app?'
    })
  })

  process.on('uncaughtException', () => {
    relaunchApp(win)
  })
}

module.exports = setupErrors
