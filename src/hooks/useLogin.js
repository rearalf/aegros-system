import { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import notificationContext from '@context/notificationContext'
import { ipcRenderer } from 'electron'

export const useLogin = () => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)

	const formData = useRef(null)
	const [ stateForm, setStateForm ] = useState({
		errroEmail: false,
		errorPassword: false,
		showPassword: false,
	})

	const handleSubmit = e => {
		e.preventDefault()
		const data = new FormData(formData.current)
		const email = data.get('email')
		const password = data.get('password')
		if ('soyLuigi1' === password && 'mario.verde@gmail.com' === email) {
			navigate('/dashboard')
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Bienvenido',
				subTitleNotification: 'Credenciales aceptadas.',
				typeNotification: 'success',
			})
		}
		else {
			setStateForm({
				...stateForm,
				errorPassword: true,
			})
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: 'La contraseña es incorrecta.',
				typeNotification: 'error',
			})
		}
	}

	const changePasswordViewer = () =>
		setStateForm({
			...stateForm,
			showPassword: !stateForm.showPassword,
		})

	const validateEmptyDatabase = async () => {
		try {
			const result = await ipcRenderer.sendSync('validate-empty-database-main')
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error',
				}
			}
			if (result.totalUsers === 0) {
				navigate('/new-user')
				setNotification({
					isOpenNotification: true,
					titleNotification: 'Información',
					subTitleNotification: 'No hay usuario en la base de datos.',
					typeNotification: 'information',
				})
			}
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

	useEffect(() => {
		validateEmptyDatabase()
	}, [])

	return {
		handleSubmit,
		formData,
		stateForm,
		changePasswordViewer,
	}
}
