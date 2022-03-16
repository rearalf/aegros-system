const { ipcRenderer, shell } = require('electron')
window.ipcRenderer = ipcRenderer
window.shell = shell
/* const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		// whitelist channels
		let validChannels = [ 'toMain' ]
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data)
		}
	},
	receive: (channel, func) => {
		let validChannels = [ 'fromMain' ]
		if (validChannels.includes(channel)) {
			// Deliberately strip event as it includes `sender`
			ipcRenderer.on(channel, (event, ...args) => func(...args))
		}
	},
})

window.ipcRenderer = ipcRenderer
 */

// https://stackoverflow.com/questions/63615355/how-to-import-ipcrenderer-in-vue-js-dirname-is-not-defined
// https://lifesaver.codes/answer/error-while-importing-electron-in-react-import-%7B-ipcrenderer-%7D-from-electron
// https://github.com/electron/electron/issues/24005
