import React from 'react'
import { useParams } from 'react-router'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { useCreateAppointment } from '@hooks/useCreateAppointment'
import { Button, IconButton, TextField } from '@mui/material'
import { FiLogIn, FiSave, FiXCircle } from 'react-icons/fi'
import '@styles/page/CreateAppointment.scss'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

export const CreateAppointment = () => {
	const { patient_id } = useParams()
	const {
		patient,
		patients,
		appointment,
		handleChangeInput,
		handleChangeInpuDate,
		handleFindPatient,
		handleFoundPatient,
		handleResetFindPatient,
		handleCancelCreateAppointment,
		handleCreateAppointment,
	} = useCreateAppointment({
		patient_id,
	})
	const { patient_name, patient_state_form } = patient
	const { appointment_date, appointment_reason } = appointment
	return (
		<AppLayout ClassName="CreateAppointment">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Citas',
						link_to: '/appointments',
					},
					{
						link_name: 'Crear cita',
						link_to: '/appointments/creat-appointment/',
					},
				]}
			/>
			<header className="create__appointment__header">
				<h1 className="create__appointment__header__title">Crear Cita</h1>
			</header>
			<section className="create__appointment__content">
				<div className="create__appointment__content__patient">
					<form
						className="create__appointment__content__patient__form"
						onSubmit={handleFindPatient}>
						<h2>Paciente</h2>
						<div className="create__appointment__content__patient__form__group">
							<TextField
								id="patient_name"
								name="patient_name"
								label="Nombre del paciente"
								type="text"
								className="create__appointment__content__patient__form__group__input"
								onChange={handleChangeInput}
								value={patient_name}
								disabled={patient_state_form}
								required
							/>
							<div className="create__appointment__content__patient__form__group__buttons">
								<Button
									variant="contained"
									className="btn_basic"
									type="submit"
									disabled={patient_state_form}>
									Buscar Paciente
								</Button>
								<Button
									variant="outlined"
									color="error"
									className="btn__error"
									disabled={!patient_state_form}
									onClick={handleResetFindPatient}>
									Cancelar Paciente
								</Button>
							</div>
						</div>
					</form>
					{!patient._id && (
						<div className="create__appointment__content__patient__find">
							<h2>Pacientes encontrados</h2>
							<div className="create__appointment__content__patient__find__patients">
								{patients.length > 0 &&
									patients.map(patient => {
										return (
											<article
												key={patient._id}
												className="create__appointment__content__patient__find__patients__perfil">
												<button onClick={() => handleFoundPatient(patient)}>
													<h3>{patient.patient_name}</h3>
												</button>
												<IconButton
													className="btn__icon"
													onClick={() => handleFoundPatient(patient)}>
													<FiLogIn size={18} />
												</IconButton>
											</article>
										)
									})}
							</div>
						</div>
					)}
				</div>
				<form
					className="create__appointment__content__form"
					onSubmit={handleCreateAppointment}>
					<h2>Cita</h2>
					<div className="create__appointment__content__form__inputs">
						<TextField
							id="appointment_reason"
							name="appointment_reason"
							label="Razon"
							className="create__appointment__content__form__input"
							onChange={handleChangeInput}
							value={appointment_reason}
							multiline
							rows={4}
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								label="Hora de la cita"
								renderInput={props => <TextField {...props} />}
								value={appointment_date}
								onChange={handleChangeInpuDate}
							/>
							{/* minDate={new Date()} */}
						</LocalizationProvider>
					</div>
					<div className="btn__group">
						<Button
							type="submit"
							variant="contained"
							color="success"
							className="btn__success">
							<FiSave size={18} /> Guardar
						</Button>
						<Button
							variant="outlined"
							color="error"
							className="btn__error"
							onClick={handleCancelCreateAppointment}>
							<FiXCircle size={18} /> Cancelar
						</Button>
					</div>
				</form>
			</section>
		</AppLayout>
	)
}
