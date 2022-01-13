import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format, formatDistanceToNow } from 'date-fns'
import esLocale from 'date-fns/locale/es'

const useAppointment = id => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ appointment, setAppointment ] = useState({
		appointment_observation: '',
		format_created: '',
		format_appointment_date: '',
		distance_to_now_appointment_date: '',
	})
	const [ patient, setPatient ] = useState({
		appointments: [],
	})
	const [ loading, setLoading ] = useState(false)
	const [ changeDate, setChangeDate ] = useState({
		openDialog: false,
	})

	const getAppointment = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-appointment-main', {
				id,
			})
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const appointment_result = JSON.parse(result.appointment)
			const patient_result = JSON.parse(result.patient)
			const { patient_date_birth, patient_name, patient_allergies } = patient_result
			/* Calculate age */
			const resultAge = formatDistanceToNow(new Date(patient_date_birth))
			if (
				new Date(patient_date_birth).getMonth() === 0 ||
				new Date(patient_date_birth).getMonth() === 1 ||
				new Date(patient_date_birth).getMonth() === 2
			) {
				const patient_age = resultAge.split(' ')[1] - 1
				patient_result.patient_age = patient_age
			}
			else {
				const patient_age = resultAge.split(' ')[1]
				patient_result.patient_age = patient_age
			}
			/* Da formato a las fechas */
			const format_appointment_date = format(
				new Date(appointment_result.appointment_date),
				'dd / MMM / yyyy - h:m bbbb',
			)
			const format_created = format(
				new Date(appointment_result.createdAt),
				'dd / MMM / yyyy - h:m bbbb',
			)
			/* Calcula distancias entre fechas */
			const DistanceToNow = formatDistanceToNow(
				new Date(appointment_result.appointment_date),
				{
					locale: esLocale,
					addSuffix: true,
				},
			)
			/* Agrega los nuevos valores */
			appointment_result.state_date =
				new Date(appointment_result.appointment_date).getTime() > new Date().getTime()
			appointment_result.format_created = format_created
			appointment_result.format_appointment_date = format_appointment_date
			/* Agrega en estados los resutados */
			setAppointment({
				...appointment_result,
				distance_to_now_appointment_date: DistanceToNow,
			})
			setPatient({
				...patient_result,
				appointments: patient_result.appointments.reverse(),
			})
			console.log({ appointment_result, patient_result })
			setLoading(false)
		} catch (error) {
			console.log(error)
			navigate(-1)
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const handleChangeObservation = e =>
		setAppointment({
			...appointment,
			appointment_observation: e.target.value,
		})

	const handleOpenDialog = () =>
		setChangeDate({
			...changeDate,
			openDialog: !changeDate.openDialog,
		})

	const handleCancelAppointment = () => {
		setAppointment({
			...appointment,
			appointment_state: 'Cancelada',
		})
		console.log({ appointment_observation: appointment.appointment_observation, appointment })
	}

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => {
				getAppointment()
			}, 1000)
		},
		[ id ],
	)

	return {
		appointment,
		patient,
		loading,
		changeDate,
		handleChangeObservation,
		handleOpenDialog,
		handleCancelAppointment,
	}
}

export default useAppointment
