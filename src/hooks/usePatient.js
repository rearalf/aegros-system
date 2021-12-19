import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router'
import notificationContext from '@context/notificationContext'
import dialogContext from '@context/dialogContext'

export const usePatient = ({ id }) => {
	const navigate = useNavigate()
	/* Context */
	const { dialog, setDialog } = useContext(dialogContext)
	const { setNotification } = useContext(notificationContext)
	/* State */
	const [ patient, setPatient ] = useState({})
	const [ loading, setLoading ] = useState(false)
	const [ inputAllergies, setInputAllergies ] = useState({
		state_input_allergies: true,
		state_button_allergies: true,
		input_allergies: '',
	})

	const getPatient = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-patient-main', { id })
			/* result validation */
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un problema.',
				}
			}

			/* Separating data */
			const patient = JSON.parse(result.patient_result)
			const { patient_date_birth, patient_name, patient_allergies } = patient
			/* Calculate age */
			const resultAge = formatDistanceToNow(new Date(patient_date_birth))
			if (
				new Date(patient_date_birth).getMonth() === 0 ||
				new Date(patient_date_birth).getMonth() === 1 ||
				new Date(patient_date_birth).getMonth() === 2
			) {
				const patient_age = resultAge.split(' ')[1] - 1
				patient.patient_age = patient_age
			}
			else {
				const patient_age = resultAge.split(' ')[1]
				patient.patient_age = patient_age
			}
			/* Shorten name */
			const shorten_name_split = patient_name.split(' ')
			const shorten_name =
				shorten_name_split.length === 4
					? `${shorten_name_split[0]} ${shorten_name_split[2]}`
					: shorten_name_split.length === 3
						? `${shorten_name_split[0]} ${shorten_name_split[2]}`
						: `${shorten_name_split[0]} ${shorten_name_split[1]}`
			patient.shorten_name = shorten_name
			setPatient(patient)
			setInputAllergies({
				...inputAllergies,
				input_allergies: patient_allergies,
			})
			setLoading(false)
		} catch (error) {
			navigate(-1)
			setLoading(false)
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}
	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => {
				getPatient()
			}, 1000)
		},
		[ id ],
	)

	const changeStateInputAllergies = () =>
		setInputAllergies({
			...inputAllergies,
			state_input_allergies: !inputAllergies.state_input_allergies,
		})

	const changeInputeAllergies = e => {
		const { value } = e.target
		patient.patient_allergies !== e.target.value
			? setInputAllergies({
					...inputAllergies,
					state_button_allergies: false,
					input_allergies: value,
				})
			: setInputAllergies({
					...inputAllergies,
					state_button_allergies: true,
					input_allergies: value,
				})
	}

	const cancelChangeAllergies = () => {
		setInputAllergies({
			...inputAllergies,
			state_input_allergies: true,
			state_button_allergies: true,
			input_allergies: patient.patient_allergies,
		})
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Aviso',
			subTitleNotification: 'Se cancelo el cambio de información de alergias',
			typeNotification: 'information',
		})
	}

	const saveInputAllergies = async () => {
		try {
			/* calling the function for updating patient allergies  */
			const result = await ipcRenderer.sendSync('modify-patient-allergy-main', {
				id,
				patient_allergies: inputAllergies.input_allergies,
			})
			/* Validation */
			if (!result.success) {
				throw {
					message: 'Ocurrio un error al actualizar información de alergias.',
				}
			}
			/* Updating of patient State */
			await getPatient()
			/* Notification State */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: 'Datos de alergias actualizados.',
				typeNotification: 'success',
			})
			/* updating of inputAllergies State */
			await setInputAllergies({
				...inputAllergies,
				state_input_allergies: true,
				state_button_allergies: true,
			})
		} catch (error) {
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

	const handleDeletePatient = () => {
		setDialog({
			...dialog,
			isOpenDialog: true,
			titleDialog: patient.patient_state ? 'Advertencia' : 'Información',
			textDialog: patient.patient_state
				? 'Esta apunto de deshabilitar un paciente. Ya no podra crear citas con este paciente.'
				: 'Esta apunto de habilitar un paciente. Podra crear citas con este paciente.',
			typeDialog: patient.patient_state ? 'warning' : 'information',
			textButtonDialogAgree: patient.patient_state ? 'No deshabilitar' : 'No habilitar',
			textButtonDialogDisagree: patient.patient_state ? 'Deshabilitar' : 'Habilitar',
			handleAgreeDialog: () => {},
			handleDisagreeDialog: () => {
				deletePatient()
			},
		})
	}

	const deletePatient = async () => {
		try {
			/* calling the function for delete patient */
			const result = await ipcRenderer.sendSync('delete-patient-main', {
				id,
				patient_state: !patient.patient_state,
			})
			/* Validation */
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error al deshabilitar al paciente.',
				}
			}
			/* Notification State */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `El paciente fue ${patient.patient_state
					? 'deshabilitado'
					: 'habilitado'}.`,
				typeNotification: 'success',
			})
			/* navigate(-1) */
			getPatient()
		} catch (error) {
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

	return {
		patient,
		loading,
		changeStateInputAllergies,
		inputAllergies,
		changeInputeAllergies,
		cancelChangeAllergies,
		saveInputAllergies,
		handleDeletePatient,
	}
}
