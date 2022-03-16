import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { capitlizeString, validateEmails } from '../utils/Utils'
import { updateUserInterface } from '../Interface/UsersInterface'
import NotificationContext from '../context/NotificationContext'

function useUpdateUser(){
	const navigate = useNavigate()
	const params = useParams()
	const { setNotification } = useContext(NotificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ userData, setUserData ] = useState<updateUserInterface>({
		user_name: '',
		user_email: '',
		user_phone: '',
	})

	const getUsers = async () => {
		try {
			const result = window.ipcRenderer.sendSync('get-user-main', { id: params.id })
			if (!result.success) throw 'Ocurrió un error obteniendo los datos.'
			const { user_name, user_email, user_phone } = JSON.parse(result.user)
			setUserData({
				...userData,
				user_name,
				user_email,
				user_phone,
			})
			setLoading(false)
		} catch (error) {
			const err = error as any
			setLoading(false)
			navigate('/private/profile')
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: err,
				typeNotification: 'error',
			})
		}
	}

	const handleOnchengeInput = (e: any) =>
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})

	const handleOnChangePhone = (value: any) =>
		setUserData({
			...userData,
			user_phone: value,
		})

	const handleOnSubmit = (e: any) => {
		try {
			e.preventDefault()
			const { user_name, user_email, user_phone } = userData
			if (user_name === '') {
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'Debe agregar un nombre.',
				}
			}
			if (user_email === '') {
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'Debe agregar un correo.',
				}
			}
			const emailValid = validateEmails(user_email)
			if (!emailValid) {
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'El correo no es valido.',
				}
			}
			const user_data = {
				user_name: capitlizeString(user_name),
				user_email,
				user_phone,
			}
			const result = window.ipcRenderer.sendSync('update-user-main', {
				id: params.id,
				data: user_data,
			})
			if (!result.success) {
				console.log(result)
				throw {
					title: 'Error',
					message: result.errorsMessage,
					type: 'error',
				}
			}
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Tus datos han sido modificados',
				typeNotification: 'success',
			})
			navigate('/private/profile')
		} catch (error) {
			const { title, message, type } = error as any
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message ? message : 'Ocurrio un error',
				typeNotification: type ? type : 'error',
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
