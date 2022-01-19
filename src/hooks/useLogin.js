import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notificationContext from '@context/notificationContext'

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
			navigate('/Dashboard')
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

	return {
		handleSubmit,
		formData,
		stateForm,
		changePasswordViewer,
	}
}
