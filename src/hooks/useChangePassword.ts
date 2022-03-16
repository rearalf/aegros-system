import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { passwordValidation } from '../utils/Utils'
import NotificationContext from '../context/NotificationContext'

interface showPasswordInterface {
	current_password_show: boolean
	password1_show: boolean
	password2_show: boolean
}

function useChangePassword(){
	const navigate = useNavigate()
	const params = useParams()
	const { setNotification } = useContext(NotificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ userPasswords, setUserPasswords ] = useState({
		current_password: '',
		password1: '',
		password2: '',
	})
	const [ showPassword, setShowPassword ] = useState<showPasswordInterface>({
		current_password_show: false,
		password1_show: false,
		password2_show: false,
	})
	const [ userPasswordValid, setUserPasswordValid ] = useState({
		uppercase: false,
		lowercase: false,
		num: false,
		char: false,
		more8: false,
	})

	const handleOnchengeInput = (e: any) =>
		setUserPasswords({
			...userPasswords,
			[e.target.name]: e.target.value,
		})

	const handleChangePassword = (e: any) => {
		const valid = passwordValidation(e.target.value)
		setUserPasswordValid(valid)
		setUserPasswords({
			...userPasswords,
			[e.target.name]: e.target.value,
		})
	}

	const handleShowPassword = (e: string, value: boolean) =>
		setShowPassword({
			...showPassword,
			[e]: !value,
		})

	const handleOnSubmit = (e: any) => {
		try {
			e.preventDefault()
			const { current_password, password1, password2 } = userPasswords
			if (current_password === password1)
				throw {
					type: 'warning',
					title: 'Advertencia.',
					message: 'La contraseña no debe ser igual que la anterior.',
				}
			if (password1 !== password2)
				throw {
					type: 'warning',
					title: 'Advertencia.',
					message: 'Las nuevas contraseñas no coinciden.',
				}
			if (!userPasswordValid.uppercase)
				throw {
					title: 'Advertencia.',
					message: 'La contraseña no tiene mayúsculas.',
					type: 'warning',
				}
			if (!userPasswordValid.lowercase)
				throw {
					title: 'Advertencia.',
					message: 'La contraseña no tiene minúsculas.',
					type: 'warning',
				}
			if (!userPasswordValid.num)
				throw {
					title: 'Advertencia.',
					message: 'La contraseña no tiene números.',
					type: 'warning',
				}
			if (!userPasswordValid.char)
				throw {
					title: 'Advertencia.',
					message: 'La contraseña no tiene caracteres especiales.',
					type: 'warning',
				}
			if (!userPasswordValid.more8)
				throw {
					title: 'Advertencia.',
					message: 'La contraseña no tiene más de 8 caracteres.',
					type: 'warning',
				}
			const userData = {
				id: params.id,
				current_password,
				new_password: password1,
			}
			const result = window.ipcRenderer.sendSync('change-password-main', userData)
			if (!result.success) {
				throw {
					message: 'Ocurrio un error.',
				}
			}
			if (result.userFind === 0)
				throw {
					message: 'El usuario no fue encontrado.',
				}
			if (result.userFind === 1)
				throw {
					message: 'La contraseña actual no es correocta.',
				}
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Tu contraseña fue modificados',
				typeNotification: 'success',
			})
			navigate('/private/profile')
		} catch (error) {
			const { title, message, type } = error as any
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error.',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
			})
		}
	}

	const handleCancel = () => {
		navigate('/private/profile')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo el cambio de contraseña.',
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
			link_name: 'Cambiar contraseña',
			link_to: `/private/users/change-password`,
		},
	]

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 500)
	}, [])

	return {
		breadCrumbsLinks,
		userPasswordValid,
		validShowContent,
		userPasswords,
		showPassword,
		handleChangePassword,
		handleOnchengeInput,
		handleShowPassword,
		handleOnSubmit,
		handleCancel,
	}
}

export default useChangePassword
