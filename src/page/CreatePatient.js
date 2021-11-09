import React from 'react';
import {
	InputDate,
	InputEmail,
	InputNumber,
	InputSelect,
	InputText,
	InputTextArea,
} from '../components/Inputs';
import { useCreatePatient } from '@hooks/useCreatePatient';
import { FiSave, FiXCircle } from 'react-icons/fi';
import '@styles/page/CreatePatient.scss';

export const CreatePatient = () => {
	const {
		PatientData,
		onChangeDate,
		onChangeInput,
		onChangeSelect,
		handleCreatePatient,
		handleCanceled,
		gender,
		errorEmail,
	} = useCreatePatient();
	const { patientName, patientBorn, patientAge, patientAllergies, patientEmail } = PatientData;
	const maxDate = new Date(
		`${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear() - 1}`,
	);
	return (
		<div className="create__patient">
			<h1>Crear paciente</h1>
			<form className="create__patient__form">
				<div className="input__form__group">
					<InputText
						labelText="Nombre completo *"
						placeholder="María del Carmen"
						onChange={onChangeInput}
						value={patientName}
						id="patientName"
						className="name"
					/>
					<InputDate
						labelText="Fecha de nacimiento *"
						maxDate={maxDate}
						startDate={patientBorn}
						ChangeDate={onChangeDate}
						className="date"
					/>
					<InputNumber
						labelText="Edad"
						placeholder="Ejemplo 23, 5"
						onChange={onChangeInput}
						value={patientAge}
						id="patientAge"
						className="age"
					/>
					<InputEmail
						labelText="Correo *"
						onChange={onChangeInput}
						value={patientEmail}
						id="patientEmail"
						valid={errorEmail}
					/>
					<InputSelect
						id="patientGender"
						labelText="Genero *"
						onChange={onChangeSelect}
						options={gender}
					/>
					<InputTextArea
						labelText="Alergias"
						onChange={onChangeInput}
						value={patientAllergies}
						id="patientAllergies"
					/>
				</div>
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
	);
};
