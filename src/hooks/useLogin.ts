import { useContext, useRef, useState, useEffect, MutableRefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationContext from '../context/NotificationContext'

function useLogin(){
	const navigate = useNavigate()
	const { setNotification } = useContext(NotificationContext)
	const formData = useRef() as MutableRefObject<HTMLFormElement>
	const [ loading, setLoading ] = useState(true)
	const [ stateForm, setStateForm ] = useState({
		errroEmail: false,
		errorPassword: false,
		showPassword: false,
	})

	const handleSubmit = async (e: any) => {
		try {
			e.preventDefault()
			const data = new FormData(formData.current)
			const user_email = data.get('user_email')
			const user_password = data.get('user_password')
			const result = await window.ipcRenderer.sendSync('sign-in-user-main', {
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
			const result_user = JSON.parse(result.user)
			if (!result_user.user_state) {
				throw {
					message: 'Su cuenta está deshabilitada.',
					type: 'warning',
					title: 'Advertencia.',
				}
			}
			navigate('private/')
			window.location.hash
			const data_user = JSON.stringify({
				user_email: result_user.user_email,
				user_name: result_user.user_name,
				user_role: result_user.user_role,
				user_state: result_user.user_state,
				_id: result_user._id,
			})
			sessionStorage.setItem('role', result_user.user_role)
			sessionStorage.setItem('user', data_user)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Credenciales validas.',
				typeNotification: 'success',
			})
		} catch (error) {
			const { title, message, type } = error as any
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
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
			const result = await window.ipcRenderer.sendSync('validate-empty-database-main')
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
			setLoading(false)
		} catch (error) {
			setLoading(false)
			const { message } = error as any
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	useEffect(() => {
		setTimeout(() => validateEmptyDatabase(), 1000)
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
