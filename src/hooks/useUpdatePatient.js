import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { format, subYears } from 'date-fns'
import { capitlizeString, nameSplit, validateEmails } from '@utils/utils'

function useUpdatePatient({ id }){
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

	const getPatientData = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-patient-main', { id })
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
				...PatientData,
				patient_name,
				patient_email,
				patient_gender,
				patient_phone_number,
				patient_allergies: patient_allergies ? patient_allergies : '',
				patient_date_birth: format(new Date(patient_date_birth), 'MM/dd/yyyy'),
				patient_weight: patient_weight ? patient_weight : '',
				patient_height: patient_height ? patient_height : '',
				patient_name_static: nameSplit(patient_name),
			})
			setLoading(false)
		} catch (error) {
			navigate(-1)
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

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
			if (patient_phone_number !== '' && !/\d{4}-\d{4}/.test(patient_phone_number))
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
			const result = await ipcRenderer.sendSync('update-patient-main', {
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
			console.log(error)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error.message,
				typeNotification: 'error',
			})
		}
	}

	const handleCanceled = () => {
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: `Se cancelo modificar los datos del paciente.`,
			typeNotification: 'information',
		})
		navigate(-1)
	}

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => {
				getPatientData()
			}, 1000)
		},
		[ id ],
	)

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

export default useUpdatePatient
