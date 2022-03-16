import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { nameSplit, getRole } from '../utils/Utils'
import { formatDate } from '../utils/FormatDate'
import { userProfile, userProfileDefaut } from '../Interface/UsersInterface'
import { linkInterface } from '../Interface/Interface'
import NotificationContext from '../context/NotificationContext'

function useProfile(){
	const params = useParams()
	const { setNotification } = useContext(NotificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ userData, setUserData ] = useState<userProfile>(userProfileDefaut)

	const getUserData = () => {
		try {
			const id =
				params.id === undefined
					? JSON.parse(`${sessionStorage.getItem('user')}`)._id
					: params.id
			const result = window.ipcRenderer.sendSync('get-user-main', { id })
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const {
				user_name,
				user_state,
				user_role,
				user_email,
				user_phone,
				updatedAt,
				createdAt,
				_id,
			} = JSON.parse(result.user)
			setUserData({
				_id,
				user_name,
				user_name_short: nameSplit(user_name),
				user_state,
				user_role: getRole(user_role),
				user_email,
				user_phone,
				updatedAt: formatDate({ date: new Date(updatedAt), formatDate: 'MMMM dd yyyy' }),
				createdAt: formatDate({ date: new Date(createdAt), formatDate: 'MMMM dd yyyy' }),
			})
			setLoading(false)
		} catch (error) {
			const err = error as any
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: err,
				typeNotification: 'error',
			})
		}
	}

	const getRoleUser = sessionStorage.getItem('role')
	const validShowContent = loading ? 'hide' : ''
	const idExists = params.id === undefined
	const titleParams = idExists ? 'Tu perfil' : `Perfil de ${userData.user_name}`
	const validUserState = idExists ? '' : 'hide__it'
	const enableOrDisable = !idExists && getRoleUser === 'master-chief' ? '' : 'hide__it'
	const BreadCrumbs: linkInterface[] = idExists
		? [
				{
					link_name: 'Tu perfil',
					link_to: '/private/profile',
				},
			]
		: [
				{
					link_name: 'Usuarios',
					link_to: '/private/users',
				},
				{
					link_name: `Perfil de ${userData.user_name}`,
					link_to: `/private/users/${params.id}`,
				},
			]

	useEffect(() => {
		setTimeout(() => {
			getUserData()
		}, 500)
	}, [])

	return {
		userData,
		loading,
		validShowContent,
		enableOrDisable,
		validUserState,
		BreadCrumbs,
		titleParams,
	}
}

export default useProfile
