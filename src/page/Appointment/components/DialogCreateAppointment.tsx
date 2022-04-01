import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Dialog, IconButton, TextField, Tooltip } from '@mui/material'
import { FiSave, FiX, FiXCircle } from 'react-icons/fi'
import { propsDialogCreateAppointment } from '../../../Interface/AppointmentsInterface'

const DialogCreateAppointment = ({
	dialog = false,
	patient_name,
	appointment_date,
	appointment_reason,
	handleChangeInput,
	handleChangeInpuDate,
	handleCreateAppointment,
	handleOpenDialogCreateAppointment,
}: propsDialogCreateAppointment) => (
	<Dialog open={dialog} className="create__appointment__dialog">
		<div className="create__appointment__dialog__header">
			<h2 className="create__appointment__dialog__header__title">Crear Cita</h2>
			<Tooltip title="Cerrar ventana">
				<IconButton
					className="btn__icon create__appointment__dialog__header__btn"
					onClick={handleOpenDialogCreateAppointment}>
					<FiX />
				</IconButton>
			</Tooltip>
		</div>
		<form className="create__appointment__dialog__form">
			<TextField
				id="patient_name"
				name="patient_name"
				label="Nombre del paciente"
				type="text"
				className="create__appointment__dialog__form__input"
				onChange={handleChangeInput}
				value={patient_name}
				disabled={true}
				required
			/>
			<TextField
				id="appointment_reason"
				name="appointment_reason"
				label="Razon"
				className="create__appointment__content__form__input"
				onChange={handleChangeInput}
				value={appointment_reason}
				multiline
				rows={4}
				autoFocus={true}
				required
			/>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateTimePicker
					label="Fecha y hora de la cita"
					value={appointment_date}
					onChange={handleChangeInpuDate}
					disabled={true}
					renderInput={params => <TextField {...params} required />}
				/>
			</LocalizationProvider>
			<div className="create__appointment__dialog__form__buttons">
				<Button
					type="submit"
					variant="contained"
					color="success"
					className="btn__success"
					onClick={handleCreateAppointment}>
					<FiSave size={18} /> Guardar
				</Button>
				<Button
					variant="outlined"
					color="error"
					className="btn__error"
					onClick={handleOpenDialogCreateAppointment}>
					<FiXCircle size={18} /> Cancelar
				</Button>
			</div>
		</form>
	</Dialog>
)

export default DialogCreateAppointment
