import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format, formatDistanceToNow } from 'date-fns'
import { nameSplit } from '@utils/utils'
import esLocale from 'date-fns/locale/es'

const useAppointment = id => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ appointment, setAppointment ] = useState({
		appointment_observation: '',
		format_created: '',
		format_appointment_update_date: '',
		format_appointment_end_date: '',
		format_appointment_cancel_date: '',
		format_appointment_date: '',
		distance_to_now_appointment_date: '',
		id,
	})
	const [ patient, setPatient ] = useState({
		appointments: [],
		patient_phone_number: '',
		patient_email: '',
		patient_name: '',
		patient_name_short: '',
		patient_age: '',
		patient_allergies: '',
		patient_gender: '',
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
			formatAppointment(appointment_result)
			formatPatient(patient_result)
			setLoading(false)
		} catch (error) {
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

	const formatAppointment = data => {
		const { appointment_date, createdAt } = data
		/* Da formato a las fechas */
		data.format_appointment_date = format(
			new Date(appointment_date),
			'dd / MMM / yyyy - h:mm bbbb',
		)
		data.format_created = format(new Date(createdAt), 'dd / MMM / yyyy - h:mm bbbb', {
			locale: esLocale,
		})
		/* Calcula distancias entre fechas */
		data.distance_to_now = formatDistanceToNow(new Date(appointment_date), {
			locale: esLocale,
			addSuffix: true,
		})
		/* Agrega los nuevos valores */
		data.state_date = new Date(data.appointment_date).getTime() > new Date().getTime()
		if (data.appointment_observation === undefined) data.appointment_observation = ''
		if (data.appointment_update_date !== undefined)
			data.format_appointment_update_date = format(
				new Date(data.appointment_update_date),
				'dd / MMM / yyyy - h:mm bbbb',
				{
					locale: esLocale,
				},
			)
		if (data.appointment_end_date !== undefined)
			data.format_appointment_end_date = format(
				new Date(data.appointment_end_date),
				'dd / MMM / yyyy - h:mm bbbb',
				{
					locale: esLocale,
				},
			)
		if (data.appointment_cancel_date !== undefined)
			data.format_appointment_cancel_date = format(
				new Date(data.appointment_cancel_date),
				'dd / MMM / yyyy - h:mm bbbb',
				{
					locale: esLocale,
				},
			)
		setAppointment({
			...appointment,
			...data,
		})
	}

	const formatPatient = data => {
		const { patient_date_birth } = data
		const resultAge = formatDistanceToNow(new Date(patient_date_birth))
		if (
			new Date(patient_date_birth).getMonth() === 0 ||
			new Date(patient_date_birth).getMonth() === 1 ||
			new Date(patient_date_birth).getMonth() === 2
		) {
			const patient_age = resultAge.split(' ')[1] - 1
			data.patient_age = patient_age
		}
		else {
			const patient_age = resultAge.split(' ')[1]
			data.patient_age = patient_age
		}
		data.appointments = data.appointments.reverse()
		data.patient_name_short = nameSplit(data.patient_name)
		setPatient({
			...patient,
			...data,
		})
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

	const handleCancelAppointment = async () => {
		try {
			const result = await ipcRenderer.sendSync('cancel-appointment-main', {
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
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const handleFinishedAppointment = async () => {
		try {
			const result = await ipcRenderer.sendSync('finished-appointment-main', {
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
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const breadCrumbs = [
		{
			link_name: 'Citas',
			link_to: '/appointments',
		},
		{
			link_name: patient.patient_name ? `Cita de ${patient.patient_name_short}` : '',
			link_to: `/appointments/${appointment.id}`,
		},
	]

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => {
				getAppointment()
				ipcRenderer.setMaxListeners(30)
			}, 1000)
		},
		[ id ],
	)

	return {
		appointment,
		patient,
		loading,
		changeDate,
		breadCrumbs,
		handleChangeObservation,
		handleOpenDialog,
		handleCancelAppointment,
		handleFinishedAppointment,
	}
}

export default useAppointment
