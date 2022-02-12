import { ipcRenderer } from 'electron'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import dialogContext from '@context/dialogContext'
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import notificationContext from '@context/notificationContext'

export const useNavBar = () => {
	const { dialog, setDialog } = useContext(dialogContext)
	const [ dateTime, setDateTime ] = useState({
		hours: format(new Date(), 'h', {
			locale: esLocale,
		}),
		minutes: format(new Date(), 'm', {
			locale: esLocale,
		}),
		date: format(new Date(), 'dd / MMM / yyyy', {
			locale: esLocale,
		}),
		timeSystem: format(new Date(), 'aaaa', {
			locale: esLocale,
		}),
	})
	const [ openSideBar, setOpenSideBar ] = useState(false)
	const [ loading, setLoading ] = useState(true)
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

	const changeValueSidebar = () => setOpenSideBar(!openSideBar)

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime({
				...dateTime,
				hours: format(new Date(), 'h', {
					locale: esLocale,
				}),
				minutes: format(new Date(), 'm', {
					locale: esLocale,
				}),
			})
			setLoading(false)
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	return {
		openSideBar,
		dateTime,
		loading,
		Closed,
		Minimized,
		Maximized,
		changeValueSidebar,
	}
}

export const useSideBar = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const path = pathname.split('/')
	const { setNotification } = useContext(notificationContext)
	const [ dataUser, setDataUser ] = useState({
		user_name: '',
		user_role: '',
	})

	const handleLogOut = () => {
		navigate('/')
		sessionStorage.removeItem('user')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Sesión cerrada',
			subTitleNotification: 'La sesión fuen cerrada.',
			typeNotification: 'information',
		})
	}

	const stateLinkDashboard = path[1] === 'dashboard' ? 'nav__link__active' : null
	const stateLinkAppointment = path[1] === 'appointments' ? 'nav__link__active' : null
	const stateLinkPatient = path[1] === 'patients' ? 'nav__link__active' : null
	const stateLinkUsers = path[1] === 'users' ? 'nav__link__active' : null
	const stateLinkSystem = path[1] === 'system' ? 'nav__link__active' : null

	const getRole = role => {
		return role === 'master-chief'
			? 'Master Chief'
			: role === 'secretary' ? 'Secretaria' : 'Doctor'
	}

	useEffect(() => {
		setTimeout(() => {
			setDataUser({
				user_name: sessionStorage.getItem('user')
					? JSON.parse(sessionStorage.getItem('user')).user_name
					: '',
				user_role: sessionStorage.getItem('user')
					? getRole(JSON.parse(sessionStorage.getItem('user')).user_role)
					: '',
			})
		}, 500)
		return () => {
			if (sessionStorage.getItem('user') === null) navigate('/')
		}
	}, [])

	return {
		dataUser,
		stateLinkDashboard,
		stateLinkAppointment,
		stateLinkPatient,
		stateLinkUsers,
		stateLinkSystem,
		handleLogOut,
	}
}
