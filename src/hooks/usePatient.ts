import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getAge, nameSplit } from '../utils/Utils'
import { formatDate } from '../utils/FormatDate'
import { patientDefault, patientInterface } from '../Interface/PatientsInterface'
import { linkInterface } from '../Interface/Interface'
import NotificationContext from '../context/NotificationContext'
import DialogContext from '../context/DialogContext'

function usePatient(){
	const navigate = useNavigate()
	const { id } = useParams()
	/* Context */
	const { dialog, setDialog } = useContext(DialogContext)
	const { setNotification } = useContext(NotificationContext)
	/* State */
	const [ patient, setPatient ] = useState<patientInterface>(patientDefault)
	const [ appointments, setAppointments ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ inputStates, setInputState ] = useState({
		state__appointment: 0,
	})
	const [ inputAllergies, setInputAllergies ] = useState({
		state_input_allergies: true,
		state_button_allergies: true,
		input_allergies: '',
	})

	const getPatient = async () => {
		try {
			const result = await window.ipcRenderer.sendSync('get-patient-main', { id })
			/* result validation */
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un problema.',
				}
			}
			/* Separating data */
			const patient_result = JSON.parse(result.patient_result)
			const { patient_date_birth, patient_name, patient_allergies } = patient_result
			/* Calculate age */
			patient_result.patient_age = getAge(patient_date_birth)
			/* Shorten name */
			patient_result.patient_short_name = nameSplit(patient_name)
			patient_result.patient_date_birth_format = formatDate({
				date: patient_date_birth,
				formatDate: 'dd / MMMM / yyyy',
			})
			setPatient(patient_result)
			setInputAllergies({
				...inputAllergies,
				input_allergies: patient_allergies,
			})
			const appointments_reverse = patient_result.appointments.reverse()
			setAppointments(appointments => appointments.concat(appointments_reverse))
			setLoading(false)
		} catch (error) {
			const { message } = error as any
			navigate(-1)
			setLoading(false)
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const changeStateInputAllergies = () =>
		setInputAllergies({
			...inputAllergies,
			state_input_allergies: !inputAllergies.state_input_allergies,
		})

	const changeInputeAllergies = (e: any) => {
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
			input_allergies: patient.patient_allergies ? patient.patient_allergies : '',
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
			const result = await window.ipcRenderer.sendSync('modify-patient-allergy-main', {
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

	const handleChangeInputState = (e: any) => {
		const { name, value } = e.target
		setInputState({
			...inputStates,
			[name]: value,
		})
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
			const result = await window.ipcRenderer.sendSync('delete-patient-main', {
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

	const breadCrumbs: linkInterface[] = [
		{
			link_name: 'Pacientes',
			link_to: '/private/patients',
		},
		{
			link_name: loading ? 'Paciente' : `${patient.patient_name}`,
			link_to: `/private/patients/${id}`,
		},
	]
	const titleState = patient.patient_state ? 'Deshabilitar paciente' : 'Habilitar paciente'
	const validShowContent = loading ? 'hide' : ''
	const titleTooltip = inputAllergies.state_input_allergies
		? 'Activar edición'
		: 'Desactivar edición'

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => getPatient(), 500)
		},
		[ id ],
	)

	useEffect(() => {}, [ inputStates.state__appointment ])

	return {
		patient,
		loading,
		appointments,
		inputAllergies,
		inputStates,
		breadCrumbs,
		titleTooltip,
		titleState,
		validShowContent,
		changeStateInputAllergies,
		changeInputeAllergies,
		cancelChangeAllergies,
		saveInputAllergies,
		handleChangeInputState,
		handleDeletePatient,
	}
}

export default usePatient
