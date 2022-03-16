import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { capitlizeString, nameSplit, validateEmails } from '../utils/Utils'
import { formatDate, subYearsDate } from '../utils/FormatDate'
import NotificationContex from '../context/NotificationContext'
import { CreatePatientInterface } from '../Interface/PatientsInterface'
import { linkInterface } from '../Interface/Interface'

function useUpdatePatient(){
	const navigate = useNavigate()
	const { id } = useParams()
	const { setNotification } = useContext(NotificationContex)
	/* States */
	const [ loading, setLoading ] = useState(true)
	const [ patientData, setPatientData ] = useState<CreatePatientInterface>({
		patient_name: '',
		patient_name_short: '',
		patient_email: '',
		patient_gender: '',
		patient_allergies: '',
		patient_date_birth: formatDate({
			date: subYearsDate(new Date(), 1),
			formatDate: 'MM/dd/yyyy',
		}),
		patient_phone_number: '',
		patient_weight: 0,
		patient_height: 0,
	})
	const [ validData, setValidData ] = useState({
		minDate: subYearsDate(new Date(), 100),
		maxDate: subYearsDate(new Date(), 1),
		patient_name_error: false,
		patient_date_birth_error: false,
		patient_gender_error: false,
		patient_email_error: false,
		patient_allergies_error: false,
		patient_phone_number_error: false,
		patient_weight_error: false,
		patient_height_error: false,
	})

	/* Changes for input */
	const handleChangeInput = (e: any) => {
		const { name, value } = e.target
		/* For inputs weight and height */
		if (e.target.type === 'number') validateNumbers(value, name)
		/* Change state */
		setPatientData({
			...patientData,
			[name]: value,
		})
	}

	/* Validation numbers for weight and height */
	const validateNumbers = (number: any, name: string) => {
		if (number <= 0) {
			setValidData({
				...validData,
				[`${name}_error`]: true,
			})
		}
		else {
			setValidData({
				...validData,
				[`${name}_error`]: false,
			})
		}
		if (number.length === 0) {
			setValidData({
				...validData,
				[`${name}_error`]: false,
			})
		}
	}

	/* Changes for date */
	const handleChangeDate = (value: Date) => {
		try {
			setPatientData({
				...patientData,
				patient_date_birth: formatDate({ date: value, formatDate: 'MM/dd/yyyy' }),
			})
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: 'Fecha no valida',
				typeNotification: 'error',
			})
		}
	}

	/* Changes for Phone number */
	const handleChangePhone = (value: string) =>
		setPatientData({
			...patientData,
			patient_phone_number: value,
		})

	const getPatientData = async () => {
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
			const { patient_result } = result
			const patient = JSON.parse(patient_result)
			const {
				patient_name,
				patient_email,
				patient_gender,
				patient_phone_number,
				patient_allergies,
				patient_date_birth,
				patient_weight,
				patient_height,
			} = patient
			/* Insert Data Patient */
			setPatientData({
				...patientData,
				patient_name,
				patient_email,
				patient_gender,
				patient_phone_number,
				patient_allergies: patient_allergies ? patient_allergies : '',
				patient_date_birth: formatDate({
					date: patient_date_birth,
					formatDate: 'MM/dd/yyyy',
				}),
				patient_weight: patient_weight ? patient_weight : '',
				patient_height: patient_height ? patient_height : '',
				patient_name_short: nameSplit(patient_name),
			})
			setLoading(false)
		} catch (error) {
			const { message } = error as Error
			setLoading(false)
			navigate(`/private/patients/${id}`)
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const handleOnSubmit = async (e: any) => {
		try {
			e.preventDefault()
			const {
				patient_name,
				patient_date_birth,
				patient_gender,
				patient_email,
				patient_phone_number,
				patient_weight,
				patient_height,
				patient_allergies,
			} = patientData
			/* Validation */
			if (patient_name === '') {
				handleInputError('patient_name')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Dede de agregar el nombre del paciente.',
				}
			}
			if (patient_date_birth === '') {
				handleInputError('patient_date_birth')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de seleccionar un la fecha de nacimiento.',
				}
			}
			if (patient_gender === '') {
				handleInputError('patient_gender')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de seleccionar un genero.',
				}
			}
			if (patient_email !== '') {
				/* Validate for email */
				const emailValid = validateEmails(patient_email)
				if (!emailValid) {
					handleInputError('patient_email')
					throw {
						title: 'Error',
						type: 'error',
						message: 'El correo no es valido',
					}
				}
			}
			if (patient_phone_number !== '' && !/\d{4}-\d{4}/.test(patient_phone_number)) {
				handleInputError('patient_phone_number')
				throw {
					title: 'Error',
					type: 'error',
					message: 'El número de teléfono no es valido.',
				}
			}
			if (patient_weight.toString() !== '' && patient_weight <= 0) {
				handleInputError('patient_weight')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de agregar un peso valido.',
				}
			}
			if (patient_height.toString() !== '' && patient_height <= 0) {
				handleInputError('patient_height')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de agregar una altura valida.',
				}
			}
			const patient_data = {
				patient_name: capitlizeString(patient_name),
				patient_date_birth,
				patient_gender,
				patient_email,
				patient_phone_number,
				patient_weight,
				patient_height,
				patient_allergies,
			}
			const result = await window.ipcRenderer.sendSync('update-patient-main', {
				id,
				updates: patient_data,
			})
			if (!result.success) {
				console.log(result)
				setValidData({
					...validData,
					[`${result.errorFields}_error`]: true,
				})
				throw {
					title: 'Error',
					type: 'error',
					message: result.errorsMessage,
				}
			}
			const patient = JSON.parse(result.patient)
			navigate(`/private/patients/${id}`)
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Datos de ${nameSplit(patient.patient_name)} actualizados.`,
				typeNotification: 'success',
			})
		} catch (error) {
			const { message } = error as Error
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const handleCanceled = () => {
		navigate(`/private/patients/${id}`)
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: `Se cancelo modificar los datos del paciente.`,
			typeNotification: 'information',
		})
	}

	const handleInputError = (input: any) => {
		setValidData({
			...validData,
			patient_name_error: false,
			patient_date_birth_error: false,
			patient_gender_error: false,
			patient_email_error: false,
			patient_allergies_error: false,
			patient_phone_number_error: false,
			patient_weight_error: false,
			patient_height_error: false,
			[`${input}_error`]: true,
		})
	}

	const validShowContent = loading ? 'hide' : ''
	const breadCrumbsLink: linkInterface[] = [
		{
			link_name: 'Pacientes',
			link_to: '/private/patients',
		},
		{
			link_name: loading ? 'Paciente' : `${patientData.patient_name_short}`,
			link_to: `/private/patients/${id}`,
		},
		{
			link_name: `Actualizar datos de ${loading
				? 'paciente'
				: patientData.patient_name_short}`,
			link_to: `/private/patients/update-patient/${id}`,
		},
	]

	useEffect(
		() => {
			setTimeout(() => getPatientData(), 500)
		},
		[ id ],
	)

	return {
		patientData,
		validData,
		loading,
		breadCrumbsLink,
		validShowContent,
		handleChangeInput,
		handleChangeDate,
		handleChangePhone,
		handleOnSubmit,
		handleCanceled,
	}
}

export default useUpdatePatient
