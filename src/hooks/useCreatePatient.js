import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import { subYears } from 'date-fns'
import format from 'date-fns/format'

export const useCreatePatient = () => {
	const navigate = useNavigate()
	const { setNotification } = useContext(notificationContext)
	const [ PatientData, setPatientData ] = useState({
		patient_name: 'asdf',
		patient_email: 'asdf@asdf.com',
		patient_gender: 'man',
		patient_allergies: '',
		patient_date_birth: subYears(new Date(), 1),
	})

	const [ validationDate, setValidationDate ] = useState({
		minDate: subYears(new Date(), 100),
		maxDate: subYears(new Date(), 1),
	})

	const onChangeInput = e => {
		const { name, value } = e.target
		setPatientData({
			...PatientData,
			[name]: value,
		})
	}

	const onChangeDate = value =>
		setPatientData({
			...PatientData,
			patient_date_birth: value,
		})

	const handleCreatePatient = async e => {
		try {
			e.preventDefault()
			if (PatientData.patient_name === '') throw 'Dede de agregar el nombre del paciente.'
			if (PatientData.patient_email === '') throw 'Debe de agregar un correo.'
			if (PatientData.patient_gender === '') throw 'Debe de seleccionar un genero.'
			if (PatientData.patient_date_birth === '')
				throw 'Debe de seleccionar un la fecha de nacimiento.'
			const result = await ipcRenderer.sendSync('create-patient-main', PatientData)
			const { success, patien } = JSON.parse(result)
			if (!success) {
				throw 'Ocurrio un error'
			}
			console.log(patien)
			navigate('/Dashboard')
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Success',
				subTitleNotification: 'La operación fue un éxito.',
				typeNotification: 'success',
			})
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const handleCanceled = () => {
		navigate('/Dashboard')
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
		PatientData,
		handleCreatePatient,
		handleCanceled,
		validationDate,
	}
}
