import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { roundDate } from '../utils/Utils'
import { formatDate } from '../utils/FormatDate'
import NotificationContext from '../context/NotificationContext'
import { patientInterface } from '../Interface/PatientsInterface'
import {
	appointmentInterface,
	CreateAppointmentInterface,
	propUseCreateAppointment,
} from '../Interface/AppointmentsInterface'

function useCreateAppointment({ patient_id }: propUseCreateAppointment){
	const navigate = useNavigate()
	const { setNotification } = useContext(NotificationContext)
	const [ appointment, setAppointment ] = useState<CreateAppointmentInterface>({
		patient_id: '',
		appointment_date: roundDate(),
		appointment_reason: '',
		appointment_state: true,
		appointment_current_date: new Date().getTime(),
	})
	const [ patient, setPatient ] = useState<patientInterface>({
		patient_name: '',
		patient_state_form: false,
		appointments: [],
	})
	const [ appointments, setAppointments ] = useState([])
	const [ appointmentsToday, setAppointmentsToday ] = useState<appointmentInterface[]>([])
	const [ patients, setPatients ] = useState<patientInterface[]>([])
	const [ dialog, setDialog ] = useState(false)

	const handleChangeInput = (e: any) => {
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

	const handleChangeInpuDate = (value: any) => {
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
			const result = await window.ipcRenderer.sendSync('get-patient-main', {
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
			const { message } = error as any
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const handleFindPatient = async (e: any) => {
		try {
			e.preventDefault()
			const { patient_name } = patient
			if (patient_name !== undefined && patient_name.length < 5) {
				throw {
					message: 'Debe de agregar más información.',
					type: 'information',
					title: 'Información',
				}
			}
			const result = await window.ipcRenderer.sendSync(
				'find-appointment-patient-by-name-main',
				{
					patient_name,
				},
			)
			setPatients(JSON.parse(result.patients))
		} catch (error) {
			const { title, message, type } = error as any
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
			})
		}
	}

	const handleFoundPatient = (values: any) => getPatient({ id: values._id })

	const handleResetFindPatient = () => {
		setPatient({
			...patient,
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

	const handleCreateAppointment = async (e: any) => {
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
					navigate(`/private/appointments/${_id}`)
					throw {
						type: 'information',
						title: 'Información',
						message: 'Este paciente ya tiene una cita activa.',
					}
				}
			}
			await window.ipcRenderer.send('create-appointment-main', appointment)
			await window.ipcRenderer.on('create-appointment-reply', async (e, args) => {
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
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Cita creada.`,
				typeNotification: 'success',
			})
		} catch (error) {
			const { title, message, type } = error as any
			handleOpenDialogCreateAppointment()
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
			})
		}
	}

	const handleGetTiemeSchedule = (date: Date) =>
		setAppointment({
			...appointment,
			appointment_date: date,
		})

	const handleOpenDialogCreateAppointment = () => setDialog(!dialog)

	const getAllAppointmentsOfTheDay = async () => {
		try {
			const { appointment_date } = appointment
			const appointment_date_split = formatDate({
				date: new Date(appointment_date),
				formatDate: 'd/M/yyyy',
			}).split('/')
			const result = await window.ipcRenderer.sendSync(
				'get-all-appointments-of-the-day-main',
				{
					dateYear: appointment_date_split[2],
					dateMonth: parseInt(appointment_date_split[1]) - 1,
					dateDay: appointment_date_split[0],
				},
			)
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
