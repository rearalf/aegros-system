import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router'
import notificationContext from '@context/notificationContext'

export const usePatient = ({ id }) => {
	const navigate = useNavigate()
	/* Context */
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
			const { patient } = result
			const { patient_date_birth, patient_name, patient_allergies } = patient

			/* Calculate age */
			const resultAge = formatDistanceToNow(new Date(patient_date_birth))
			const patient_age = resultAge.split(' ')[1]

			/* Shorten name */
			const shorten_name_split = patient_name.split(' ')
			const shorten_name =
				shorten_name_split.length === 4
					? `${shorten_name_split[0]} ${shorten_name_split[2]}`
					: shorten_name_split.length === 3
						? `${shorten_name_split[0]} ${shorten_name_split[2]}`
						: `${shorten_name_split[0]} ${shorten_name_split[1]}`

			setPatient({
				...patient,
				patient,
				patient_age,
				shorten_name,
			})
			setInputAllergies({
				...inputAllergies,
				input_allergies: patient_allergies,
			})
			setLoading(false)
			console.log(patient)
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
			getPatient()
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
				titleNotification: 'Success',
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

	return {
		patient,
		loading,
		changeStateInputAllergies,
		inputAllergies,
		changeInputeAllergies,
		cancelChangeAllergies,
		saveInputAllergies,
	}
}
