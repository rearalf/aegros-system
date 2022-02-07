import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { capitlizeString, validateEmails } from '@utils/utils'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'

function useCreateUser(){
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ showPassword, setShowPassword ] = useState(false)
	const [ userForm, setUserForm ] = useState({
		user_name: '',
		user_email: '',
		user_password: '',
		user_phone: '',
		user_role: '',
	})
	const [ userFormError, setUserFormError ] = useState({
		user_name_error: false,
		user_email_error: false,
		user_password_error: false,
		user_role_error: false,
	})

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	const handleOnchengeInput = e =>
		setUserForm({
			...userForm,
			[e.target.name]: e.target.value,
		})

	const handleOnChangePhone = value => {
		setUserForm({
			...userForm,
			user_phone: value,
		})
	}

	const handleOnSubmit = async e => {
		try {
			e.preventDefault()
			const { user_name, user_email, user_password, user_role } = userForm
			if (user_name === '') {
				setUserFormError({
					...userFormError,
					user_name_error: true,
				})
				throw {
					meesage: 'Debe agregar un nombre.',
				}
			}
			if (user_email === '') {
				setUserFormError({
					...userFormError,
					user_email_error: true,
				})
				throw {
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
					meesage: 'El correo no es valido.',
				}
			}
			if (user_password === '') {
				setUserFormError({
					...userFormError,
					user_password_error: true,
				})
				throw {
					meesage: 'Debe agregar una contraseña.',
				}
			}
			if (user_role === '') {
				setUserFormError({
					...userFormError,
					user_role_error: true,
				})
				throw {
					message: 'Debe agregar un rol.',
				}
			}
			const user_data = {
				...userForm,
				user_name: capitlizeString(user_name),
			}
			const result = await ipcRenderer.sendSync('create-user-main', user_data)
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error',
				}
			}
			const user_result = JSON.parse(result.patien)
			console.log(user_data)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Paciente ${user_result.user_name} creado.`,
				typeNotification: 'success',
			})
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

	const handleCancel = () => {
		setUserForm({
			user_name: '',
			user_email: '',
			user_password: '',
			user_phone: '',
			user_role: '',
		})
		navigate(-1)
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		})
	}

	return {
		userForm,
		showPassword,
		userFormError,
		handleClickShowPassword,
		handleOnchengeInput,
		handleOnChangePhone,
		handleOnSubmit,
		handleCancel,
	}
}

export default useCreateUser
