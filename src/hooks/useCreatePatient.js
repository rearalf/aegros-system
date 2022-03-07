import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import { nameSplit, capitlizeString, validateEmails } from '@utils/utils'
import { formatDate, subYearsDate } from '@utils/FormatDate'
import notificationContext from '@context/notificationContext'

function useCreatePatient(){
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	/* States */
	const [ loading, setLoading ] = useState(true)
	const [ patientData, setPatientData ] = useState({
		patient_name: '',
		patient_email: '',
		patient_gender: '',
		patient_allergies: '',
		patient_date_birth: formatDate({
			date: subYearsDate(new Date(), 1),
			formatDate: 'MM/dd/yyyy',
		}),
		patient_phone_number: '',
		patient_weight: '',
		patient_height: '',
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
	const onChangeInput = e => {
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
	const onChangePhone = value =>
		setPatientData({
			...patientData,
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
			navigate(`/private/patients/${patient._id}`)
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
		navigate('/private/patients')
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		})
	}

	const validShowContent = loading ? 'hide' : ''
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

	useEffect(() => setTimeout(() => setLoading(false), 1000), [])

	return {
		patientData,
		validData,
		loading,
		breadCrumbsLink,
		validShowContent,
		onChangeInput,
		onChangeDate,
		onChangePhone,
		handleOnSubmit,
		handleCanceled,
	}
}

export default useCreatePatient
