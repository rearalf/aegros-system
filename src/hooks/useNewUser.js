import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmails, passwordValidation } from '@utils/utils'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'

function useNewUser(){
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ showPassword1, setShowPassword1 ] = useState(false)
	const [ showPassword2, setShowPassword2 ] = useState(false)
	const [ loading, setLoading ] = useState(true)
	const [ userForm, setUserForm ] = useState({
		user_name: 'Master Chief',
		user_email: '',
		user_password: '',
		user_password2: '',
		user_role: 'master-chief',
	})
	const [ userFormError, setUserFormError ] = useState({
		user_email_error: false,
		user_password_error: false,
		user_password2_error: false,
	})
	const [ userPasswordValid, setUserPasswordValid ] = useState({
		uppercase: false,
		lowercase: false,
		num: false,
		char: false,
		more8: false,
	})

	const handleClickShowPassword1 = () => setShowPassword1(!showPassword1)
	const handleClickShowPassword2 = () => setShowPassword2(!showPassword2)

	const handleOnchengeInput = e =>
		setUserForm({
			...userForm,
			[e.target.name]: e.target.value,
		})

	const handleChangePassword = e => {
		const valid = passwordValidation(e.target.value)
		setUserPasswordValid(valid)
		setUserForm({
			...userForm,
			user_password: e.target.value,
		})
	}

	const handleOnSubmit = async e => {
		try {
			e.preventDefault()
			const { user_email, user_password, user_password2 } = userForm
			const { uppercase, lowercase, num, char, more8 } = userPasswordValid
			if (user_email === '') {
				setUserFormError({
					...userFormError,
					user_email_error: true,
				})
				throw {
					title: 'Error',
					message: 'Debe agregar un correo.',
					type: 'error',
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
					message: 'El correo no es valido.',
					type: 'error',
				}
			}
			if (user_password === '') {
				setUserFormError({
					...userFormError,
					user_password_error: true,
				})
				throw {
					title: 'Error',
					message: 'Debe agregar una contraseña.',
					type: 'error',
				}
			}
			if (user_password !== user_password2) {
				setUserFormError({
					...userFormError,
					user_password_error: true,
					user_password2_error: true,
				})
				throw {
					title: 'Error',
					message: 'Las contraseñas no coinciden.',
					type: 'error',
				}
			}
			if (user_password === emailValid) {
				setUserFormError({
					...userFormError,
					user_password_error: true,
					user_email_error: true,
				})
				throw {
					title: 'Error',
					message: 'La contraseña no debe ser igual que el correo.',
					type: 'error',
				}
			}
			if (!uppercase)
				throw {
					title: 'Advertencia',
					type: 'warning',
					message: 'La contraseña no tiene mayúsculas.',
				}
			if (!lowercase)
				throw {
					title: 'Advertencia',
					message: 'La contraseña no tiene minúsculas.',
					type: 'warning',
				}
			if (!num)
				throw {
					title: 'Advertencia',
					message: 'La contraseña no tiene números.',
					type: 'warning',
				}
			if (!char)
				throw {
					title: 'Advertencia',
					message: 'La contraseña no tiene caracteres especiales.',
					type: 'warning',
				}
			if (!more8)
				throw {
					title: 'Advertencia',
					message: 'La contraseña no tiene más de 8 caracteres.',
					type: 'warning',
				}
			const user_data = {
				user_name: 'Master Chief',
				user_email: userForm.user_email,
				user_password: userForm.user_password,
				user_role: 'master-chief',
			}
			const result = await ipcRenderer.sendSync('create-user-main', user_data)
			if (!result.success) {
				console.log(result)
				setUserFormError({
					...userFormError,
					[`${result.errorFields}_error`]: true,
				})
				throw {
					title: 'Error',
					message: result.errorsMessage,
					type: 'error',
				}
			}
			console.log(JSON.parse(result.user))
			navigate('/')
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Usuario Master Chief creado.',
				typeNotification: 'success',
			})
			setUserFormError({
				user_email_error: false,
				user_password_error: false,
				user_password2_error: false,
			})
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title,
				subTitleNotification: error.message,
				typeNotification: error.type,
			})
		}
	}

	const validateEmptyDatabase = async () => {
		try {
			const result = await ipcRenderer.sendSync('validate-empty-database-main')
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error',
				}
			}
			if (result.totalUsers > 0) {
				navigate('/')
				setNotification({
					isOpenNotification: true,
					titleNotification: 'Información',
					subTitleNotification: 'Hay usuarios en la base de datos.',
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
		setTimeout(() => {
			validateEmptyDatabase()
			setLoading(false)
		}, 1000)
		ipcRenderer.setMaxListeners(50)
		return () => {
			if (sessionStorage.getItem('user') !== null) navigate('/dashboard')
		}
	}, [])

	return {
		userForm,
		showPassword1,
		showPassword2,
		userFormError,
		userPasswordValid,
		loading,
		handleChangePassword,
		handleClickShowPassword1,
		handleClickShowPassword2,
		handleOnchengeInput,
		handleOnSubmit,
	}
}

export default useNewUser
