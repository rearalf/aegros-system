import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nameSplit, capitlizeString, validateEmails } from '../utils/Utils'
import { formatDate, subYearsDate } from '../utils/FormatDate'
import { CreatePatientInterface, patientValidDataDefault } from '../Interface/PatientsInterface'
import NotificationContext from '../context/NotificationContext'

function useCreatePatient(){
	const navigate = useNavigate()
	const { setNotification } = useContext(NotificationContext)
	/* States */
	const [ patientData, setPatientData ] = useState<CreatePatientInterface>({
		patient_name: '',
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
	const [ validData, setValidData ] = useState(patientValidDataDefault)

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
			} = patientData
			/* Validation */
			if (patient_name === '')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Dede de agregar el nombre del paciente.',
				}
			if (patient_date_birth === '')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de seleccionar un la fecha de nacimiento.',
				}
			if (patient_gender === '')
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de seleccionar un genero.',
				}
			if (patient_email !== '') {
				/* Validate for email */
				const emailValid = validateEmails(patientData.patient_email)
				if (!emailValid) {
					throw {
						title: 'Error',
						type: 'error',
						message: 'El correo no es valido',
					}
				}
			}
			if (patient_phone_number !== '' && /\d{4}-\d{4}/.test(patient_phone_number))
				throw {
					title: 'Error',
					type: 'error',
					message: 'El número de teléfono no es valido.',
				}
			if (patient_weight.toString() !== '' && patient_weight <= 0) {
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de agregar un peso valido.',
				}
			}
			if (patient_height.toString() !== '' && patient_height <= 0) {
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
			}
			const result = await window.ipcRenderer.sendSync('create-patient-main', patient_data)
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
			navigate(`/private/patients/${patient._id}`)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Paciente ${nameSplit(patient.patient_name)} creado.`,
				typeNotification: 'success',
			})
		} catch (error) {
			const { message, title, type } = error as any
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
			})
		}
	}

	const handleCanceled = () => {
		navigate('/private/patients')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		})
	}

	const breadCrumbsLink = [
		{
			link_name: 'Pacientes',
			link_to: '/private/patients',
		},
		{
			link_name: 'Crear paciente',
			link_to: '/private/patients/create-patient',
		},
	]

	return {
		patientData,
		validData,
		breadCrumbsLink,
		handleChangeInput,
		handleChangeDate,
		handleChangePhone,
		handleOnSubmit,
		handleCanceled,
	}
}

export default useCreatePatient
