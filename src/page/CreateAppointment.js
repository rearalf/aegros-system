import React from 'react';
import { InputDate, InputSelect, InputTextArea } from '../components/Inputs';
import { ButtonAction } from '@components/ButtonAction';
import { FiUserPlus, FiXCircle, FiSave } from 'react-icons/fi';
import { useFunctionsPage } from '../hooks/useCreateAppointment';
import '@styles/page/CreateAppointment.scss';

export const CreateAppointment = () => {
	const {
		IssueTextPlaceHolder,
		issue,
		date,
		patients,
		onChangeDate,
		onChangeSelect,
		onChangeSelectPatient,
		onChangeInput,
		sucursales,
		handleCreateAppointment,
		handleCanceled,
	} = useFunctionsPage();
	return (
		<div className="create__appointment">
			<div className="create__appontment__header">
				<h1>Nueva Cita</h1>
				<ButtonAction link="/createpatient">
					<i>
						<FiUserPlus />
					</i>
					Crear paciente
				</ButtonAction>
			</div>
			<div className="forms__create__appointment">
				<form className="form__create__appointment">
					<InputSelect
						id="patientName"
						labelText="Sucursal"
						onChange={onChangeSelectPatient}
						options={patients}
					/>
					<InputDate
						labelText="Fecha"
						id="appointmentDate"
						startDate={date}
						ChangeDate={onChangeDate}
						minDate={new Date()}
						showTime={true}
						dateFormat="dd/MM/yyyy hh:mm"
					/>
					<InputSelect
						id="branchOffice"
						labelText="Sucursal"
						onChange={onChangeSelect}
						options={sucursales}
					/>
					<InputTextArea
						labelText="Asunto"
						id="issue"
						placeholder={IssueTextPlaceHolder}
						value={issue}
						onChange={onChangeInput}
					/>
					<div className="btn__group">
						<button className="btn btn__save" onClick={handleCreateAppointment}>
							<FiSave /> Guardar
						</button>
						<button className="btn btn__cancel" onClick={handleCanceled}>
							<FiXCircle /> Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
