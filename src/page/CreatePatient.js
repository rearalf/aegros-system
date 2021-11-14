import React from 'react'
import { useCreatePatient } from '@hooks/useCreatePatient'
import { FiSave, FiXCircle } from 'react-icons/fi'
import '@styles/page/CreatePatient.scss'

export const CreatePatient = () => {
	const {
		PatientData,
		onChangeInput,
		handleCreatePatient,
		handleCanceled,
		errorEmail,
	} = useCreatePatient()
	const { patientName, patientAge, patientAllergies, patientEmail } = PatientData
	return (
		<div className="create__patient">
			<h1>Crear paciente</h1>
			<form className="create__patient__form">
				<div className="input__form__group" />
				<div className="btn__group">
					<button className="btn btn__save" onClick={handleCreatePatient}>
						<FiSave /> Guardar
					</button>
					<button className="btn btn__cancel" onClick={handleCanceled}>
						<FiXCircle /> Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}
