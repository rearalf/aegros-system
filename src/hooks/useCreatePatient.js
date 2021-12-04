import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format, subYears } from 'date-fns'
import { validateEmails } from '../utils/utils'

export const useCreatePatient = () => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	/* States */
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
		if (e.target.type === 'number') {
			validateNumbers(value, name)
			setPatientData({
				...PatientData,
				[name]: value,
			})
			return
		}
		/* For validation inputs */
		const names = name.split('_')
		if (value.length === 0) {
			errorMessageInputs(`error_${names[1]}`, true)
		}
		else {
			errorMessageInputs(`error_${names[1]}`, false)
		}
		/* Validate for email */
		if (name === 'patient_email') {
			const emailValid = validateEmails(value)
			if (!emailValid) {
				setNotification({
					isOpenNotification: true,
					titleNotification: 'Error',
					subTitleNotification: 'Email no valido',
					typeNotification: 'error',
				})
				errorMessageInputs('error_email', true)
			}
		}
		/* Change state */
		setPatientData({
			...PatientData,
			[name]: value,
		})
		return
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
			if (PatientData.patient_date_birth === '')
				throw {
					name: 'error_date_birth',
					message: 'Debe de seleccionar un la fecha de nacimiento.',
				}

			const result = await ipcRenderer.sendSync('create-patient-main', PatientData)
			const { success, patien } = result
			if (!success) {
				throw {
					message: 'Ocurrio un error',
				}
			}
			console.log(patien)
			navigate('/patients')

			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Success',
				subTitleNotification: 'La operación fue un éxito.',
				typeNotification: 'success',
			})

			setValidationData({
				validationData,
				error_name: false,
				error_email: false,
				error_gender: false,
				error_allgergies: false,
				error_date_birth: false,
				error_phone_number: false,
				error_weight: false,
				error_height: false,
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
	}
}
