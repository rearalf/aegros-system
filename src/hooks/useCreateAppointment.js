import { useState, useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import { roundDate } from '@utils/utils'
import notificationContext from '@context/notificationContext'

function useCreateAppointment({ patient_id }){
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ appointment, setAppointment ] = useState({
		patient_id: '',
		appointment_date: roundDate(),
		appointment_reason: '',
		appointment_state: true,
	})
	const [ patient, setPatient ] = useState({
		patient_name: '',
		patient_state_form: false,
	})
	const [ appointments, setAppointments ] = useState([])
	const [ appointmentsToday, setAppointmentsToday ] = useState([])
	const [ patients, setPatients ] = useState([])
	const [ dialog, setDialog ] = useState(false)

	const handleChangeInput = e => {
		const { name, value } = e.target
		if (name === 'patient_name') {
			setPatient({
				...patient,
				[name]: value,
			})
		}
		else {
			setAppointment({
				...appointment,
				[name]: value,
			})
		}
	}

	const handleChangeInpuDate = value => {
		try {
			setAppointment({
				...appointment,
				appointment_date: value,
			})
		} catch (error) {
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: 'Ocurrio un error',
				typeNotification: 'error',
			})
		}
	}

	const getPatient = async ({ id = '' }) => {
		try {
			const result = await ipcRenderer.sendSync('get-patient-main', {
				id,
			})
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error',
				}
			}
			const patient_result = JSON.parse(result.patient_result)
			setPatient({
				...patient,
				patient_name: patient_result.patient_name,
				_id: patient_result._id,
				patient_state_form: true,
			})
			setAppointment({
				...appointment,
				patient_id: patient_result._id,
			})
			setAppointments(patient_result.appointments)
			setPatients([])
		} catch (error) {
			console.log(error)
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

	const handleFindPatient = async e => {
		try {
			e.preventDefault()
			const { patient_name } = patient
			if (patient_name.length < 5) {
				throw {
					message: 'Debe de agregar más información.',
					type: 'information',
					title: 'Información',
				}
			}
			const result = await ipcRenderer.sendSync('find-appointment-patient-by-name-main', {
				patient_name,
			})
			setPatients(JSON.parse(result.patients))
			console.log(JSON.parse(result.patients))
		} catch (error) {
			console.log(error)
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleFoundPatient = values => getPatient({ id: values._id })

	const handleResetFindPatient = () => {
		setPatient({
			patient_name: '',
			patient_state_form: false,
		})
		setAppointment({
			...appointment,
			patient_id: '',
		})
		setAppointments([])
		setPatients([])
	}

	const handleCancelCreateAppointment = () => {
		navigate(-1)
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación de la cita.',
			typeNotification: 'information',
		})
	}

	const handleCreateAppointment = async e => {
		try {
			e.preventDefault()
			const {
				patient_id,
				appointment_reason,
				appointment_date,
				appointment_current_date,
			} = appointment
			if (!patient_id) {
				throw {
					message: 'Debe de seleccionar un paciente.',
				}
			}
			if (!appointment_reason) {
				throw {
					message: 'Dede de agregar una razon.',
				}
			}
			if (!appointment_date)
				throw {
					message: 'Dede de agregar una fecha.',
				}
			const getTimeAppointment = new Date(appointment_date).getTime()
			if (appointment_current_date > getTimeAppointment)
				throw {
					message: 'La fecha está atras de la fecha actual.',
				}
			/* Citas anteriores del paciente */
			if (appointments.length > 0) {
				const last_appointment = appointments[appointments.length - 1]
				const { _id, appointment_state } = last_appointment
				if (appointment_state === 'Activa') {
					navigate(`/appointments/${_id}`)
					throw {
						type: 'information',
						title: 'Información',
						message: 'Este paciente ya tiene una cita activa.',
					}
				}
			}
			await ipcRenderer.send('create-appointment-main', appointment)
			await ipcRenderer.on('create-appointment-reply', async (e, args) => {
				if (!args.success) {
					console.log(args)
					throw {
						message: 'Ocurrio un error.',
					}
				}
				const { appointment, patient } = args
				const appointment_result = JSON.parse(appointment)
				const patient_result = JSON.parse(patient)
				navigate(`/private/appointments/${appointment_result._id}`)
				console.log({
					appointment_result,
					patient_result,
				})
			})
			handleOpenDialogCreateAppointment()
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Cita creada.`,
				typeNotification: 'success',
			})
		} catch (error) {
			handleOpenDialogCreateAppointment()
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleGetTiemeSchedule = date =>
		setAppointment({
			...appointment,
			appointment_date: date,
		})

	const handleOpenDialogCreateAppointment = () => setDialog(!dialog)

	const getAllAppointmentsOfTheDay = async () => {
		try {
			const { appointment_date } = appointment
			const appointment_date_split = format(new Date(appointment_date), 'd/M/yyyy').split('/')
			const result = await ipcRenderer.sendSync('get-all-appointments-of-the-day-main', {
				dateYear: appointment_date_split[2],
				dateMonth: appointment_date_split[1] - 1,
				dateDay: appointment_date_split[0],
			})
			if (!result.success) {
				throw result
			}
			const appointments_result = JSON.parse(result.appointments)
			setAppointmentsToday(appointments_result)
		} catch (error) {
			console.log(error)
		}
	}

	const linksBreadCrumbs = [
		{
			link_name: 'Citas',
			link_to: '/private/appointments',
		},
		{
			link_name: 'Crear cita',
			link_to: '/private/appointments/creat-appointment/',
		},
	]

	useEffect(
		() => {
			patient_id !== undefined && getPatient({ id: patient_id })
		},
		[ patient_id ],
	)

	useEffect(
		() => {
			getAllAppointmentsOfTheDay()
		},
		[ appointment.appointment_date ],
	)

	return {
		patient,
		patients,
		appointment,
		dialog,
		appointmentsToday,
		linksBreadCrumbs,
		handleChangeInput,
		handleFindPatient,
		handleFoundPatient,
		handleResetFindPatient,
		handleChangeInpuDate,
		handleCancelCreateAppointment,
		handleCreateAppointment,
		handleGetTiemeSchedule,
		handleOpenDialogCreateAppointment,
	}
}

export default useCreateAppointment
