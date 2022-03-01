import { ipcRenderer } from 'electron'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { capitlizeString, validateEmails } from '@utils/utils'
import notificationContext from '@context/notificationContext'

function useUpdateUser(){
	const navigate = useNavigate()
	const params = useParams()
	const { setNotification } = useContext(notificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ userData, setUserData ] = useState({
		user_name: '',
		user_email: '',
		user_phone: '',
	})

	const getUsers = async () => {
		try {
			const result = ipcRenderer.sendSync('get-user-main', { id: params.id })
			if (!result.success) throw 'Ocurrió un error obteniendo los datos.'
			console.log(JSON.parse(result.user))
			const { user_name, user_email, user_phone } = JSON.parse(result.user)
			setUserData({
				...userData,
				user_name,
				user_email,
				user_phone,
			})
			setLoading(false)
		} catch (error) {
			setLoading(false)
			navigate('/private/profile')
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const handleOnchengeInput = e =>
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})

	const handleOnChangePhone = value =>
		setUserData({
			...userData,
			user_phone: value,
		})

	const handleOnSubmit = e => {
		try {
			e.preventDefault()
			const { user_name, user_email, user_phone } = userData
			if (user_name === '') {
				setUserFormError({
					...userFormError,
					user_name_error: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'Debe agregar un nombre.',
				}
			}
			if (user_email === '') {
				setUserFormError({
					...userFormError,
					user_email_error: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'Debe agregar un correo.',
				}
			}
			const emailValid = validateEmails(user_email)
			if (!emailValid) {
				setUserFormError({
					...userFormError,
					user_email_error: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'El correo no es valido.',
				}
			}
			const user_data = {
				user_name: capitlizeString(user_name),
				user_email,
				user_phone: userForm.user_phone,
			}
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Tus datos han sido modificados',
				typeNotification: 'success',
			})
			navigate('/private/profile')
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message ? error.message : 'Ocurrio un error',
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleCancel = () => {
		setUserData({
			user_name: '',
			user_email: '',
			user_phone: '',
		})
		navigate('/private/profile')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancel modificar tus datos.',
			typeNotification: 'information',
		})
	}

	const validShowContent = loading ? 'hide' : ''
	const breadCrumbsLinks = [
		{
			link_name: 'Tu perfil',
			link_to: '/private/profile',
		},
		{
			link_name: 'Actualiza tus datos',
			link_to: `/private/users/update-user${params.id}`,
		},
	]

	useEffect(() => {
		setTimeout(() => {
			getUsers()
		}, 1000)
	}, [])

	return {
		userData,
		validShowContent,
		breadCrumbsLinks,
		handleOnChangePhone,
		handleOnchengeInput,
		handleOnSubmit,
		handleCancel,
	}
}

export default useUpdateUser
