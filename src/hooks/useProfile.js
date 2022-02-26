import { useState, useEffect, useContext } from 'react'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import { getRole } from '@utils/utils'

function useProfile(){
	const { setNotification } = useContext(notificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ userData, setUserData ] = useState({
		user_name: '',
		user_state: '',
		user_role: '',
		user_email: '',
		user_phone: '',
		updatedAt: '',
		createdAt: '',
	})

	const getUserData = () => {
		try {
			const id = JSON.parse(sessionStorage.getItem('user'))._id
			const result = ipcRenderer.sendSync('get-user-main', { id })
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
			} = JSON.parse(result.user)
			console.log(JSON.parse(result.user))
			setUserData({
				user_name,
				user_state,
				user_role: getRole(user_role),
				user_email,
				user_phone,
				updatedAt: format(new Date(updatedAt), 'MMMM dd yyyy', {
					locale: esLocale,
				}),
				createdAt: format(new Date(createdAt), 'MMMM dd yyyy', {
					locale: esLocale,
				}),
			})
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const validShowContent = loading ? 'hide' : ''

	useEffect(() => {
		setTimeout(() => {
			getUserData()
		}, 500)
	}, [])

	return {
		userData,
		loading,
		validShowContent,
	}
}

export default useProfile
