import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notificationContext from '@context/notificationContext'
import { passwordValidation } from '@utils/utils'

function useChangePassword(){
	const navigate = useNavigate()
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
		} catch (error) {}
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
