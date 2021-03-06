const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const {
	getAllappointments,
	createAppointment,
	findPatientByName,
	getAppointment,
	getAllAppointmentsOfTheDay,
	updateAppointmentDate,
	cancelAppointment,
	finishedAppointment,
} = require('./controllers/appointment.controllers')
const {
	getAllPatients,
	createPatient,
	getPatient,
	modifyAllergy,
	updatePatient,
	deletePatient,
} = require('./controllers/patient.controllers')
const {
	getAppointmentsDashboard,
	getCountDataDashboard,
} = require('./controllers/dashboard.controllers')
const {
	createUser,
	getUsers,
	validateEmptyDatabase,
	signInUser,
	getUser,
	updateUser,
	changePassword,
} = require('./controllers/user.controllers')

let mainWindow

let dev = false

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
	dev = true
}

const icons = {
	darwin: './icons/logo16x16.png',
	linux: './icons/logo64x64.png',
	win32: './icons/logo64x64.png',
}

function createWindow(){
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 768,
		minWidth: 768,
		minHeight: 668,
		frame: false,
		show: false,
		title: 'Aegros',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	})
	mainWindow.setIcon(path.join(__dirname, icons[process.platform]))

	let indexPath
	if (dev) {
		indexPath = 'http://localhost:3000'
	}
	else {
		indexPath = `file://${path.join(__dirname, 'dist/index.html')}`
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

	/* Actions Patients */
	ipcMain.on('get-all-patients-main', getAllPatients)
	ipcMain.on('get-patient-main', getPatient)
	ipcMain.on('create-patient-main', createPatient)
	ipcMain.on('modify-patient-allergy-main', modifyAllergy)
	ipcMain.on('find-patients-by-name-main', getAllPatients)
	ipcMain.on('update-patient-main', updatePatient)
	ipcMain.on('delete-patient-main', deletePatient)

	/* Actions Appointment */
	ipcMain.on('get-all-appointment-main', getAllappointments)
	ipcMain.on('find-appointment-patient-by-name-main', findPatientByName)
	ipcMain.on('get-all-appointments-of-the-day-main', getAllAppointmentsOfTheDay)
	ipcMain.on('create-appointment-main', createAppointment)
	ipcMain.on('get-appointment-main', getAppointment)
	ipcMain.on('update-appointment-date-main', updateAppointmentDate)
	ipcMain.on('cancel-appointment-main', cancelAppointment)
	ipcMain.on('finished-appointment-main', finishedAppointment)

	/* Actions Dashboard */
	ipcMain.handle('get-appointments-dashboard-main', getAppointmentsDashboard)
	ipcMain.on('get-count-data-dashboard-main', getCountDataDashboard)

	/* Actions User */
	ipcMain.on('validate-empty-database-main', validateEmptyDatabase)
	ipcMain.on('get-users-main', getUsers)
	ipcMain.on('get-user-main', getUser)
	ipcMain.on('create-user-main', createUser)
	ipcMain.on('update-user-main', updateUser)
	ipcMain.on('change-password-main', changePassword)
	ipcMain.on('sign-in-user-main', signInUser)

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
