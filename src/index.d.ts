import { IpcRenderer,Shell } from 'electron'

declare global {
	interface Window {
		ipcRenderer: IpcRenderer
		shell: Shell
	}
}
