import { ipcRenderer } from 'electron'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import dialogContext from '@context/dialogContext'

export const useNavBar = () => {
	const { dialog, setDialog } = useContext(dialogContext)
	const [ openSideBar, setOpenSideBar ] = useState(false)
	const Closed = () => {
		setDialog({
			...dialog,
			isOpenDialog: true,
			titleDialog: 'Información',
			textDialog: 'Seguro que desea salir? Si acepta cerrara sesión y saldrá del programa.',
			typeDialog: 'information',
			textButtonDialogAgree: 'Quedarse',
			textButtonDialogDisagree: 'Salir',
			handleAgreeDialog: () => {},
			handleDisagreeDialog: () => {
				ipcRenderer.send('closed')
			},
		})
	}

	const Minimized = () => {
		ipcRenderer.send('minimized')
	}
	const Maximized = () => {
		ipcRenderer.send('maximized')
	}

	ipcRenderer.on('isMaximized', () => {
		ChangeMaxRestore(true)
	})
	ipcRenderer.on('isRestore', () => {
		ChangeMaxRestore(false)
	})

	const ChangeMaxRestore = isMaximized => {
		const btnResotre = document.getElementById('restore')
		const btnMaximize = document.getElementById('maximize')

		if (isMaximized) {
			btnMaximize.classList.add('hide__btn')
			btnResotre.classList.remove('hide__btn')
		}
		else {
			btnMaximize.classList.remove('hide__btn')
			btnResotre.classList.add('hide__btn')
		}
	}

	const meses = new Array(
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	)
	const f = new Date()
	const date = f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()

	const changeValueSidebar = () => setOpenSideBar(!openSideBar)

	return {
		Closed,
		Minimized,
		Maximized,
		openSideBar,
		changeValueSidebar,
		date,
	}
}

export const useSideBar = ({ openSideBar, changeValueSidebar }) => {
	const { pathname } = useLocation()
	const path = pathname.split('/')

	const changeValueSidebarOnBluer = () => {
		openSideBar ? changeValueSidebar() : null
	}
	const changeValueSidebarOnFocus = () => {
		!openSideBar ? changeValueSidebar() : null
	}

	const stateLinkDashboard = path[1] === 'dashboard' ? 'nav__link__active' : null
	const stateLinkAppointment = path[1] === 'appointments' ? 'nav__link__active' : null
	const stateLinkPatient = path[1] === 'patients' ? 'nav__link__active' : null

	return {
		changeValueSidebarOnFocus,
		changeValueSidebarOnBluer,
		stateLinkDashboard,
		stateLinkAppointment,
		stateLinkPatient,
	}
}
