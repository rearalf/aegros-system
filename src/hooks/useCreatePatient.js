import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format, subYears } from 'date-fns'
import { capitlizeString, validateEmails } from '@utils/utils'
import { nameSplit } from '@utils/utils'

export const useCreatePatient = () => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	/* States */
	const [ loading, setLoading ] = useState(false)
	const [ PatientData, setPatientData ] = useState({
		patient_name: '',
		patient_email: '',
		patient_gender: '',
		patient_allergies: '',
		patient_date_birth: format(subYears(new Date(), 1), 'MM/dd/yyyy'),
		patient_phone_number: '',
		patient_weight: '',
		patient_height: '',
	})
	const [ validData, setValidData ] = useState({
		minDate: subYears(new Date(), 100),
		maxDate: subYears(new Date(), 1),
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
	const onChangeInput = e => {
		const { name, value } = e.target
		/* For inputs weight and height */
		if (e.target.type === 'number') validateNumbers(value, name)
		/* Change state */
		setPatientData({
			...PatientData,
			[name]: value,
		})
	}

	/* Validation numbers for weight and height */
	const validateNumbers = (number, name) => {
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
	const onChangeDate = value => {
		try {
			setPatientData({
				...PatientData,
				patient_date_birth: format(value, 'MM/dd/yyyy'),
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
	const onChangePhone = value =>
		setPatientData({
			...PatientData,
			patient_phone_number: value,
		})

	const handleOnSubmit = async e => {
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
			} = PatientData
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
				const emailValid = validateEmails(PatientData.patient_email)
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
			if (patient_weight !== '' && patient_weight < 0) {
				throw {
					title: 'Error',
					type: 'error',
					message: 'Debe de agregar un peso valido.',
				}
			}
			if (patient_height !== '' && patient_height < 0) {
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
			const result = await ipcRenderer.sendSync('create-patient-main', patient_data)
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
			navigate(`/patients/patient/${patient._id}`)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Paciente ${nameSplit(patient.patient_name)} creado.`,
				typeNotification: 'success',
			})
		} catch (error) {
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleCanceled = () => {
		navigate(-1)
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		})
	}

	return {
		PatientData,
		validData,
		loading,
		onChangeInput,
		onChangeDate,
		onChangePhone,
		handleOnSubmit,
		handleCanceled,
	}
}
