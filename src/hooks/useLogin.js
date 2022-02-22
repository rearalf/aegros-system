import { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'

function useLogin(){
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const formData = useRef(null)
	const [ loading, setLoading ] = useState(true)
	const [ stateForm, setStateForm ] = useState({
		errroEmail: false,
		errorPassword: false,
		showPassword: false,
	})

	const handleSubmit = async e => {
		try {
			e.preventDefault()
			const data = new FormData(formData.current)
			const user_email = data.get('user_email')
			const user_password = data.get('user_password')
			const result = await ipcRenderer.sendSync('sign-in-user-main', {
				user_email,
				user_password,
			})
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error.',
				}
			}
			if (result.userFind === 0) {
				throw {
					message: 'Correo incorrecto.',
				}
			}
			if (result.userFind === 1) {
				throw {
					message: 'Contraseña incorrecto.',
				}
			}
			navigate('private/')
			window.location.hash
			const result_user = JSON.parse(result.user)
			const data_user = JSON.stringify({
				user_email: result_user.user_email,
				user_name: result_user.user_name,
				user_role: result_user.user_role,
				user_state: result_user.user_state,
				_id: result_user._id,
			})
			sessionStorage.setItem('user', data_user)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Credenciales validas.',
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
					message: 'Ocurrio un error en conectarse con la base.',
				}
			}
			if (result.totalUsers === 0) {
				navigate('/new-user')
				setNotification({
					isOpenNotification: true,
					titleNotification: 'Información',
					subTitleNotification: 'No hay usuarios en la base de datos.',
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
		if (sessionStorage.getItem('user') !== null) navigate('private')
	}, [])

	return {
		formData,
		stateForm,
		loading,
		handleSubmit,
		changePasswordViewer,
	}
}

export default useLogin
