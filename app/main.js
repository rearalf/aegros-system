const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { getAllPatients, createPatient } = require('./controllers/patient.controllers')

let mainWindow

let dev = false

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
	dev = true
}

const icons = {
	darwin: '../src/assets/image/icons/logo16x16.png',
	linux: '../src/assets/image/icons/logo64x64.png',
	win32: '../src/assets/image/icons/logo64x64.png',
}

function createWindow(){
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 768,
		minHeight: 668,
		frame: false,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	})
	mainWindow.setIcon(path.join(__dirname, icons[process.platform]))

	let indexPath
	if (dev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	}
	else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		if (dev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch(err =>
				console.log('Error loading React DevTools: ', err),
			)
			mainWindow.webContents.openDevTools()
		}
	})

	ipcMain.on('closed', () => {
		mainWindow.close()
	})

	ipcMain.on('minimized', () => {
		mainWindow.minimize()
	})

	ipcMain.on('maximized', () => {
		if (mainWindow.isMaximized()) {
			mainWindow.restore()
		}
		else {
			mainWindow.maximize()
		}
	})

	ipcMain.handle('get-all-patients', getAllPatients)
	ipcMain.on('create-patient-main', createPatient)
	ipcMain.on('test-main', async (event, args) => {
		console.log(args)
		event.reply('test-render', {
			result: args,
		})
	})

	mainWindow.on('maximize', () => {
		mainWindow.webContents.send('isMaximized')
	})
	mainWindow.on('unmaximize', () => {
		mainWindow.webContents.send('isRestore')
	})
}

module.exports = { createWindow }