import {enableLiveReload} from 'electron-compile'
import electronDebug from 'electron-debug'

/**
 * if dev enable devTools
 */
module.exports = function devtools () {
  enableLiveReload()
  electronDebug({showDevTools: true})
}
