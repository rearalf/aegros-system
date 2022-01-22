import React from 'react'
import { Dialog, IconButton, TextField, Tooltip } from '@mui/material'
import { FiX } from 'react-icons/fi'

const DialogPastAppointment = ({ dialog }) => {
	const { handleDialogAction, pastAppointment } = dialog
	const { patient } = pastAppointment
	const handleOpenDialogPastAppointment = () => handleDialogAction()
	return (
		<Dialog open={dialog.openDialogPastAppointment} className="past__appointment__dialog">
			<div className="past__appointment__dialog__header">
				<h2 className="past__appointment__dialog__header__title">Cita</h2>
				<Tooltip title="Cerrar ventana">
					<IconButton
						className="btn__icon past__appointment__dialog__header__btn"
						onClick={handleOpenDialogPastAppointment}>
						<FiX />
					</IconButton>
				</Tooltip>
			</div>
			<div className="past__appointment__dialog__information">
				<h3 className="past__appointment__dialog__information__patient">
					Paciente:
					<span className="past__appointment__dialog__information__patient__name">
						{patient && patient.patient_name}
					</span>
				</h3>
				<TextField
					id="past_appointment_reason"
					name="past_appointment_reason"
					label="Razon"
					className="past__appointment__dialog__information__reason"
					value={pastAppointment.appointment_reason}
					multiline
					rows={4}
					disabled
				/>
				<p className="past__appointment__dialog__information__state">
					Estado:
					<span className={pastAppointment.appointment_state}>
						{pastAppointment.appointment_state}
					</span>
				</p>
			</div>
		</Dialog>
	)
}

export default DialogPastAppointment
