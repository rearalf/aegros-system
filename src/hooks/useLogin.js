import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import notificationContext from '@context/notificationContext'
import initialState from '../../initialState'

export const useLogin = () => {
	const history = useHistory()
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
		const { user } = initialState
		const result = user.find(user => user.user_email === email)
		if (result !== undefined) {
			if (result.user_password === password) {
				history.push('/Dashboard')
				localStorage.setItem('user', JSON.stringify(result))
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
		else {
			setStateForm({
				...stateForm,
				errroEmail: true,
			})
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: 'EL correo no esta registrado.',
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
