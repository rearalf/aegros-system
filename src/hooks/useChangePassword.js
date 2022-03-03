import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import { passwordValidation } from '@utils/utils'
import notificationContext from '@context/notificationContext'

function useChangePassword(){
	const navigate = useNavigate()
	const params = useParams()
	const { setNotification } = useContext(notificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ userPasswords, setUserPasswords ] = useState({
		current_password: '',
		password1: '',
		password2: '',
	})
	const [ showPassword, setShowPassword ] = useState({
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

	const handleOnchengeInput = e =>
		setUserPasswords({
			...userPasswords,
			[e.target.name]: e.target.value,
		})

	const handleChangePassword = e => {
		const valid = passwordValidation(e.target.value)
		setUserPasswordValid(valid)
		setUserPasswords({
			...userPasswords,
			[e.target.name]: e.target.value,
		})
	}

	const handleShowPassword = e =>
		setShowPassword({
			...showPassword,
			[e]: !showPassword[e],
		})

	const handleOnSubmit = e => {
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
			const result = ipcRenderer.sendSync('change-password-main', userData)
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
			navigate(-1)
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error.',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleCancel = () => {
		navigate(-1)
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
