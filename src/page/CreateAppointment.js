import React from 'react'
import { FiUserPlus, FiXCircle, FiSave } from 'react-icons/fi'
import { useFunctionsPage } from '../hooks/useCreateAppointment'
import '@styles/page/CreateAppointment.scss'

export const CreateAppointment = () => {
	const {
		IssueTextPlaceHolder,
		issue,
		date,
		onChangeDate,
		onChangeInput,
		handleCreateAppointment,
		handleCanceled,
	} = useFunctionsPage()
	return (
		<div className="create__appointment">
			<div className="create__appontment__header">
				<h1>Nueva Cita</h1>
			</div>
			<div className="forms__create__appointment">
				<form className="form__create__appointment">
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
	)
}
