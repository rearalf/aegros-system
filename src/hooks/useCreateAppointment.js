import { useState, useContext, useEffect } from 'react'
import { addMinutes, format, subMinutes } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'

export const useCreateAppointment = ({ patient_id }) => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ appointment, setAppointment ] = useState({
		patient_id: '',
		appointment_date: new Date(),
		appointment_reason: '',
		appointment_state: true,
	})
	const [ patient, setPatient ] = useState({
		patient_name: '',
		patient_state_form: false,
	})
	const [ appointments, setAppointments ] = useState([])
	const [ patients, setPatients ] = useState([])

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
				subTitleNotification: error.message ? error.message : 'Ocurrio un error',
				typeNotification: error.message ? 'information' : 'error',
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
			console.log(patient_result)
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
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		})
	}

	const handleCreateAppointment = async e => {
		try {
			e.preventDefault()
			if (!appointment.patient_id) {
				throw {
					message: 'Debe de seleccionar un paciente.',
				}
			}
			if (!appointment.appointment_reason) {
				throw {
					message: 'Dede de agregar una razon.',
				}
			}
			if (!appointment.appointment_date)
				throw {
					message: 'Dede de agregar una fecha.',
				}
			const current_date = new Date(subMinutes(new Date(), 5)).getTime()
			const new_date = new Date(appointment.appointment_date).getTime()
			const last_appointment = appointments[appointments.length - 1]
			const last_fifteen = new Date(
				addMinutes(new Date(last_appointment.appointment_date), 15),
			).getTime()
			if (last_appointment.appointment_state === 'Activa') {
				throw {
					message: 'Este paciente ya tiene una cita activa.',
				}
			}
			if (current_date > new_date)
				throw {
					message: 'La fecha está atras de la fecha actual.',
				}
			if (last_fifteen >= new_date)
				throw {
					message: 'La cita está demasiado cerca de la ultima cita.',
				}
			await ipcRenderer.send('create-appointment-main', appointment)
			await ipcRenderer.on('create-appointment-reply', async (event, args) => {
				if (!args.success) {
					console.log(args)
					throw {
						message: 'Ocurrio un error.',
					}
				}
				const { appointment, patient } = args
				const appointment_result = JSON.parse(appointment)
				const patient_result = JSON.parse(patient)
				console.log({
					appointment_result,
					patient_result,
				})
			})
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Cita creada.`,
				typeNotification: 'success',
			})
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

	useEffect(
		() => {
			patient_id !== undefined && getPatient({ id: patient_id })
		},
		[ patient_id ],
	)

	return {
		patient,
		patients,
		appointment,
		handleChangeInput,
		handleFindPatient,
		handleFoundPatient,
		handleResetFindPatient,
		handleChangeInpuDate,
		handleCancelCreateAppointment,
		handleCreateAppointment,
	}
}
