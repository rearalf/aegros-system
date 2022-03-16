import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { nameSplit, getAge } from '../utils/Utils'
import { formatDate, formatDistanceToNowDate } from '../utils/FormatDate'
import NotificationContex from '../context/NotificationContext'
import { appointmentDefault, appointmentInterface } from '../Interface/AppointmentsInterface'
import { patientDefault, patientInterface } from '../Interface/PatientsInterface'

function useAppointment(){
	const { id } = useParams()
	const navigate = useNavigate()
	const { setNotification } = useContext(NotificationContex)
	const [ appointment, setAppointment ] = useState<appointmentInterface>(appointmentDefault)
	const [ patient, setPatient ] = useState<patientInterface>(patientDefault)
	const [ loading, setLoading ] = useState(true)

	const getAppointment = async () => {
		try {
			const result = await window.ipcRenderer.sendSync('get-appointment-main', {
				id,
			})
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const appointment_result = JSON.parse(result.appointment)
			const patient_result = JSON.parse(result.patient)
			formatAppointment(appointment_result)
			formatPatient(patient_result)
			setLoading(false)
		} catch (error) {
			const err = error as any
			navigate(-1)
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: err,
				typeNotification: 'error',
			})
		}
	}

	const formatAppointment = (data: any) => {
		const { appointment_date, createdAt } = data
		/* Da formato a las fechas */
		data.format_appointment_date = formatDate({
			date: appointment_date,
			formatDate: 'dd / MMM / yyyy - h:mm bbbb',
		})
		data.format_created = formatDate({
			date: createdAt,
			formatDate: 'dd / MMM / yyyy - h:mm bbbb',
		})
		/* Calcula distancias entre fechas */
		data.distance_to_now = formatDistanceToNowDate(appointment_date)
		/* Agrega los nuevos valores */
		data.state_date = new Date(data.appointment_date).getTime() > new Date().getTime()
		if (data.appointment_observation === undefined) data.appointment_observation = ''
		if (data.appointment_update_date !== undefined)
			data.format_appointment_update_date = formatDate({
				date: data.appointment_update_date,
				formatDate: 'dd / MMM / yyyy - h:mm bbbb',
			})
		if (data.appointment_end_date !== undefined)
			data.format_appointment_end_date = formatDate({
				date: data.appointment_end_date,
				formatDate: 'dd / MMM / yyyy - h:mm bbbb',
			})
		if (data.appointment_cancel_date !== undefined)
			data.format_appointment_cancel_date = formatDate({
				date: data.appointment_cancel_date,
				formatDate: 'dd / MMM / yyyy - h:mm bbbb',
			})
		setAppointment({
			...appointment,
			...data,
		})
	}

	const formatPatient = (data: any) => {
		const { patient_date_birth, appointments } = data
		data.appointments = formatPatientAppointmets(appointments)
		data.patient_date_birth_format = formatDate({
			date: patient_date_birth,
			formatDate: 'dd / MMMM / yyyy',
		})
		data.patient_age = getAge(patient_date_birth)
		data.appointments = data.appointments.reverse()
		data.patient_short_name = nameSplit(data.patient_name)
		setPatient({
			...patient,
			...data,
		})
	}

	const formatPatientAppointmets = (data: []) => {
		if (data.length) {
			const result = data.map(({ _id, appointment_date, appointment_state, createdAt }) => {
				const appointment_date_format = formatDate({
					date: appointment_date,
					formatDate: 'dd / MMM / yyyy - h:m bbbb',
				})
				const createdAt__format = formatDate({
					date: createdAt,
					formatDate: 'dd / MMM / yyyy - h:m bbbb',
				})
				let arrayData = {
					_id,
					appointment_state,
					appointment_date_format,
					createdAt__format,
				}
				return arrayData
			})
			return result
		}
	}

	const handleChangeObservation = (e: any) =>
		setAppointment({
			...appointment,
			appointment_observation: e.target.value,
		})

	const handleCancelAppointment = async () => {
		try {
			const result = await window.ipcRenderer.sendSync('cancel-appointment-main', {
				id,
			})
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error al cancelar la cita.'
			}
			setAppointment({
				...appointment,
				appointment_state: 'Cancelada',
			})
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Información.',
				subTitleNotification: `La cita está cancelada.`,
				typeNotification: 'information',
			})
			getAppointment()
		} catch (error) {
			const message = error as string
			console.log(message)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const handleFinishedAppointment = async () => {
		try {
			const result = await window.ipcRenderer.sendSync('finished-appointment-main', {
				id,
				appointment_observation: appointment.appointment_observation,
			})
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error al cancelar la cita.'
			}
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `La cita está finalizada.`,
				typeNotification: 'success',
			})
			setAppointment({
				...appointment,
				appointment_state: 'Finalizada',
			})
			getAppointment()
		} catch (error) {
			const message = error as string
			console.log(message)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const validShowContent = loading ? 'hide' : ''
	const validStateAppointment = appointment.appointment_state === 'Activa'
	const validShowContacts = patient.patient_phone_number && patient.patient_email
	const validAlert = validStateAppointment && !appointment.state_date
	const breadCrumbs = [
		{
			link_name: 'Citas',
			link_to: '/private/appointments',
		},
		{
			link_name: patient.patient_name ? `Cita de ${patient.patient_name_short}` : '',
			link_to: `/private/appointments/${appointment._id}`,
		},
	]

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => getAppointment(), 500)
			window.ipcRenderer.setMaxListeners(30)
		},
		[ id ],
	)

	return {
		appointment,
		patient,
		loading,
		validShowContent,
		breadCrumbs,
		validAlert,
		validShowContacts,
		validStateAppointment,
		handleChangeObservation,
		handleCancelAppointment,
		handleFinishedAppointment,
	}
}

export default useAppointment
