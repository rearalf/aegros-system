import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { capitlizeString, validateEmails, passwordValidation } from '../utils/Utils'
import { userProfile, userProfileDefaut } from '../Interface/UsersInterface'
import { linkInterface } from '../Interface/Interface'
import NotificationContext from '../context/NotificationContext'

function useCreateUser(){
	const navigate = useNavigate()
	const { setNotification } = useContext(NotificationContext)
	const [ showPassword1, setShowPassword1 ] = useState(false)
	const [ showPassword2, setShowPassword2 ] = useState(false)
	const [ userForm, setUserForm ] = useState<userProfile>(userProfileDefaut)
	const [ userFormError, setUserFormError ] = useState({
		user_name_error: false,
		user_email_error: false,
		user_password_error: false,
		user_password2_error: false,
		user_role_error: false,
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

	const handleOnchengeInput = (e: any) =>
		setUserForm({
			...userForm,
			[e.target.name]: e.target.value,
		})

	const handleOnChangePhone = (value: any) =>
		setUserForm({
			...userForm,
			user_phone: value,
		})

	const handleChangePassword = (e: any) => {
		const valid = passwordValidation(e.target.value)
		setUserPasswordValid(valid)
		setUserForm({
			...userForm,
			user_password: e.target.value,
		})
	}

	const handleOnSubmit = async (e: any) => {
		try {
			e.preventDefault()
			const { user_name, user_email, user_password, user_password2, user_role } = userForm
			const { uppercase, lowercase, num, char, more8 } = userPasswordValid
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
			if (user_password === '') {
				setUserFormError({
					...userFormError,
					user_password_error: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					meesage: 'Debe agregar una contraseña.',
				}
			}
			if (user_password !== user_password2) {
				setUserFormError({
					...userFormError,
					user_password2_error: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					message: 'Las contraseñas no coinciden.',
				}
			}
			if (user_password === user_email) {
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
			if (user_role === '') {
				setUserFormError({
					...userFormError,
					user_role_error: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe agregar un rol.',
				}
			}
			if (!uppercase)
				throw {
					title: 'Advertencia',
					message: 'La contraseña no tiene mayúsculas.',
					type: 'warning',
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
				user_name: capitlizeString(user_name),
				user_email,
				user_password,
				user_phone: userForm.user_phone,
				user_role,
			}
			const result = await window.ipcRenderer.sendSync('create-user-main', user_data)
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
			const user_result = JSON.parse(result.user)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Usuario ${user_result.user_name} creado.`,
				typeNotification: 'success',
			})
			navigate('/private/users')
			setUserFormError({
				user_name_error: false,
				user_email_error: false,
				user_password_error: false,
				user_password2_error: false,
				user_role_error: false,
			})
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
		setUserForm(userProfileDefaut)
		navigate('/private/users')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		})
	}

	const breadCrumbsLinks: linkInterface[] = [
		{
			link_name: 'Usuarios',
			link_to: '/private/users',
		},
		{
			link_name: 'Crear usuario',
			link_to: '/private/users/create-user',
		},
	]

	return {
		userForm,
		showPassword1,
		showPassword2,
		userFormError,
		userPasswordValid,
		breadCrumbsLinks,
		handleChangePassword,
		handleClickShowPassword1,
		handleClickShowPassword2,
		handleOnchengeInput,
		handleOnChangePhone,
		handleOnSubmit,
		handleCancel,
	}
}

export default useCreateUser
