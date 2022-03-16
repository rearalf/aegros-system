import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRole, nameSplit } from '../utils/Utils'
import notificationContext from '../context/NotificationContext'

function useSideBar(){
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const path = pathname.split('/')
	const { setNotification } = useContext(notificationContext)
	const [ dataUser, setDataUser ] = useState({
		user_name: '',
		user_name_short: '',
		user_role: '',
	})

	const handleLogOut = () => {
		navigate('/')
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('role')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Sesión cerrada',
			subTitleNotification: 'La sesión fuen cerrada.',
			typeNotification: 'information',
		})
	}

	const stateLinkDashboard = path[2] === '' ? 'nav__link__active' : null
	const stateLinkAppointment = path[2] === 'appointments' ? 'nav__link__active' : null
	const stateLinkPatient = path[2] === 'patients' ? 'nav__link__active' : null
	const stateLinkUsers = path[2] === 'users' ? 'nav__link__active' : null
	const stateLinkSystem = path[2] === 'system' ? 'nav__link__active' : null
	const stateLinkProfile = path[2] === 'profile' ? 'nav__link__active' : null

	useEffect(
		() => {
			return () => {
				window.scroll(0, 0)
				if (sessionStorage.getItem('user') === null) {
					navigate('/')
					setNotification({
						isOpenNotification: true,
						titleNotification: 'Sesión cerrada',
						subTitleNotification: 'La sesión fuen cerrada.',
						typeNotification: 'information',
					})
				}
			}
		},
		[ pathname ],
	)

	interface userInterface {
		user_email: string
		user_name: string
		user_role: string
		user_state: boolean
		_id: string
	}

	const handleGetInformation = () => {
		const data = `${sessionStorage.getItem('user')}`
		const data_user: userInterface = JSON.parse(data)
		setDataUser({
			...dataUser,
			user_name_short: sessionStorage.getItem('user') ? nameSplit(data_user.user_name) : '',
			user_name: sessionStorage.getItem('user') ? data_user.user_name : '',
			user_role: sessionStorage.getItem('user') ? getRole(data_user.user_role) : '',
		})
	}

	useEffect(() => {
		setTimeout(() => handleGetInformation(), 500)
	}, [])

	return {
		dataUser,
		stateLinkDashboard,
		stateLinkAppointment,
		stateLinkPatient,
		stateLinkUsers,
		stateLinkSystem,
		stateLinkProfile,
		handleLogOut,
	}
}

export default useSideBar
