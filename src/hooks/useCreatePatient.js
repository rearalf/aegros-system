import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format, subYears } from 'date-fns'
import { capitlizeString, validateEmails } from '@utils/utils'

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
	const [ validationData, setValidationData ] = useState({
		minDate: subYears(new Date(), 100),
		maxDate: subYears(new Date(), 1),
		error_name: false,
		error_email: false,
		error_gender: false,
		error_allgergies: false,
		error_date_birth: false,
		error_phone_number: false,
		error_weight: false,
		error_height: false,
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
			if (name === 'patient_weight') errorMessageInputs('error_weight', true)
			if (name === 'patient_height') errorMessageInputs('error_height', true)
			return false
		}
		else {
			if (name === 'patient_weight') errorMessageInputs('error_weight', false)
			if (name === 'patient_height') errorMessageInputs('error_height', false)
		}
		return true
	}

	/* Changes for date */
	const onChangeDate = value => {
		try {
			setPatientData({
				...PatientData,
				patient_date_birth: format(value, 'MM/dd/yyyy'),
			})
			errorMessageInputs('error_date_birth', false)
		} catch (error) {
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: 'Fecha no valida',
				typeNotification: 'error',
			})
			errorMessageInputs('error_date_birth', true)
		}
	}

	/* Changes for Phone number */
	const onChangePhone = value => {
		value.length === 0
			? errorMessageInputs('error_phone_number', true)
			: errorMessageInputs('error_phone_number', false)
		setPatientData({
			...PatientData,
			patient_phone_number: value,
		})
	}

	/* input validation for error message */
	const errorMessageInputs = (name, state) =>
		setValidationData({
			...validationData,
			[name]: state,
		})

	const handleCreatePatient = async e => {
		try {
			e.preventDefault()
			/* Validation */
			if (PatientData.patient_name === '')
				throw {
					name: 'error_name',
					message: 'Dede de agregar el nombre del paciente.',
				}
			if (PatientData.patient_email === '')
				throw {
					name: 'error_email',
					message: 'Debe de agregar un correo.',
				}
			/* Validate for email */
			const emailValid = validateEmails(PatientData.patient_email)
			if (!emailValid) {
				throw {
					name: 'error_email',
					message: 'Email no valido',
				}
			}
			if (PatientData.patient_gender === '')
				throw {
					name: 'error_gender',
					message: 'Debe de seleccionar un genero.',
				}
			if (PatientData.patient_phone_number === '')
				throw {
					name: 'error_phone_number',
					message: 'Debe de agregar un número de teléfono.',
				}
			if (PatientData.patient_date_birth === '' || validationData.error_date_birth === true)
				throw {
					name: 'error_date_birth',
					message: 'Debe de seleccionar un la fecha de nacimiento.',
				}
			if (PatientData.patient_weight !== '' && PatientData.patient_weight < 0) {
				throw {
					name: 'error_weight',
					message: 'Debe de agregar un peso valido.',
				}
			}
			if (PatientData.patient_height !== '' && PatientData.patient_height < 0) {
				throw {
					name: 'error_height',
					message: 'Debe de agregar una altura valida.',
				}
			}

			const patient_data = {
				...PatientData,
				patient_name: capitlizeString(PatientData.patient_name),
			}
			const result = await ipcRenderer.sendSync('create-patient-main', patient_data)
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error',
				}
			}
			const patient = JSON.parse(result.patien)
			navigate('/patients')
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Operación exitosa.',
				subTitleNotification: `Paciente ${patient.patient_name} creado.`,
				typeNotification: 'success',
			})
		} catch (error) {
			console.log(error)
			/* Function for show error in inputs */
			errorMessageInputs(error.name, true)
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
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
		onChangeInput,
		onChangeDate,
		onChangePhone,
		PatientData,
		handleCreatePatient,
		handleCanceled,
		validationData,
		loading,
	}
}
