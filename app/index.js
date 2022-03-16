const { app, BrowserWindow } = require('electron')
const { createWindow } = require('./main')
require('./database.dev')

if (process.platform === 'win32') {
	app.commandLine.appendSwitch('high-dpi-support', 'true')
	app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

/* app.on('ready', createWindow) */
app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows() === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
