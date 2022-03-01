import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRole } from '@utils/utils'
import notificationContext from '@context/notificationContext'

function useSideBar(){
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
