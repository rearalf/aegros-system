import React from 'react'
import { useParams } from 'react-router'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { useCreateAppointment } from '@hooks/useCreateAppointment'
import { Button, IconButton, TextField, Dialog, Tooltip } from '@mui/material'
import { FiLogIn, FiSave, FiXCircle, FiX, FiCheckCircle, FiActivity } from 'react-icons/fi'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import format from 'date-fns/format'
import '@styles/page/CreateAppointment.scss'

export const CreateAppointment = () => {
	const { patient_id } = useParams()
	const {
		patient,
		patients,
		appointment,
		times,
		dialog,
		appointmentsToday,
		handleChangeInput,
		handleChangeInpuDate,
		handleFindPatient,
		handleFoundPatient,
		handleResetFindPatient,
		handleCancelCreateAppointment,
		handleCreateAppointment,
		handleGetTiemeSchedule,
		handleOpenDialogCreateAppointment,
		handleOpenDialogPastAppointment,
		getPastAppointment,
	} = useCreateAppointment({
		patient_id,
	})
	const { patient_name, patient_state_form } = patient
	const { appointment_date, appointment_reason, appointment_current_date } = appointment

	const linksBreadCrumbs = [
		{
			link_name: 'Citas',
			link_to: '/appointments',
		},
		{
			link_name: 'Crear cita',
			link_to: '/appointments/creat-appointment/',
		},
	]

	const DialogPastAppointment = () => (
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
						{dialog.pastAppointment.patient.patient_name}
					</span>
				</h3>
				<TextField
					id="past_appointment_reason"
					name="past_appointment_reason"
					label="Razon"
					className="past__appointment__dialog__information__reason"
					value={dialog.pastAppointment.appointment_reason}
					multiline
					rows={4}
					disabled
				/>
				<p className="past__appointment__dialog__information__state">
					Estado:
					<span className={dialog.pastAppointment.appointment_state}>
						{dialog.pastAppointment.appointment_state}
					</span>
				</p>
			</div>
		</Dialog>
	)
	const DialogCreateAppointment = () => (
		<Dialog open={dialog.openDialogCreateAppointment} className="create__appointment__dialog">
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
	return (
		<AppLayout ClassName="CreateAppointment">
			<BreadCrumbsComponent links={linksBreadCrumbs} />
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
								{patients.length > 0 ? (
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
									})
								) : (
									<h3>No hay citas</h3>
								)}
							</div>
						</div>
					)}
				</div>
				{patient_state_form && (
					<div className="create__appointment__content__schedule">
						<h2 className="create__appointment__content__schedule__title">
							Seleccione fecha y hora
						</h2>
						<div className="create__appointment__content__schedule__header">
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Fecha de la cita"
									value={appointment_date}
									onChange={handleChangeInpuDate}
									minDate={new Date()}
									toolbarPlaceholder="Mes/Día/Año"
									renderInput={params => (
										<TextField {...params} helperText="mm/dd/yyyy" required />
									)}
								/>
							</LocalizationProvider>
							<div className="create__appointment__content__schedule__header__buttons">
								<Button
									type="submit"
									variant="contained"
									color="success"
									className="btn_basic"
									onClick={handleOpenDialogCreateAppointment}>
									<FiCheckCircle size={18} /> Crear cita
								</Button>
								<Button
									variant="outlined"
									color="error"
									className="btn__error"
									onClick={handleCancelCreateAppointment}>
									<FiXCircle size={18} /> Cancelar
								</Button>
							</div>
						</div>
						<div className="create__appointment__content__schedule__content">
							<div className="create__appointment__content__schedule__content__time">
								{times.map((time, s) => {
									return (
										<div
											className="create__appointment__content__schedule__content__time__moment"
											key={s}>
											{time.map((t, i) => {
												const dateFormat = format(
													t,
													'dd / MMM / yyyy - h:m bbbb',
												)
												const dateFormatHour = format(t, ' h:m bbbb')
												const selectedDateFormatHour = format(t, 'h')
												const selectedDateFormatb = format(t, 'bbbb')
												const selectedDateFormatHour2 = format(
													appointment_date,
													'h',
												)
												const selectedDateFormatb2 = format(
													appointment_date,
													'bbbb',
												)
												let value = ''
												if (
													selectedDateFormatHour ===
														selectedDateFormatHour2 &&
													selectedDateFormatb === selectedDateFormatb2
												) {
													value = 'Active'
												}
												return (
													i === 0 && (
														<h3
															className={`create__appointment__content__schedule__content__time__moment__hour ${value}`}
															key={dateFormat}>
															{dateFormatHour}
														</h3>
													)
												)
											})}
										</div>
									)
								})}
							</div>
							<div className="create__appointment__content__schedule__content__day">
								{times.map((time, a) => {
									return (
										<div
											className="create__appointment__content__schedule__content__day__moments"
											key={a}>
											{time.map((t, q) => {
												const dateFormat = format(
													t,
													'dd / MMM / yyyy - h:m bbbb',
												)
												const getTimeSchedule = new Date(t).getTime()
												const currentDate = new Date(
													appointment_current_date,
												).getTime()
												const value =
													getTimeSchedule ===
													new Date(appointment_date).getTime()
												const appointmentNow = appointmentsToday.filter(
													appointment => {
														const { appointment_date } = appointment
														const getTime_appointment_date = new Date(
															appointment_date,
														).getTime()
														if (
															getTimeSchedule ===
															getTime_appointment_date
														) {
															return appointment
														}
														return null
													},
												)
												//{dateFormat}
												if (currentDate <= getTimeSchedule) {
													return (
														<div
															className={`create__appointment__content__schedule__content__day__moments__moment ${value &&
																'Active'}`}
															key={dateFormat}
															onClick={() =>
																handleGetTiemeSchedule(t)}>
															{appointmentNow.length > 0 ? (
																appointmentNow.map(date => {
																	return (
																		<Tooltip
																			key={date._id}
																			title="Ver más">
																			<IconButton
																				onClick={() =>
																					getPastAppointment(
																						date,
																					)}
																				className="btn__icon create__appointment__content__schedule__content__day__moments__moment__icon">
																				<FiActivity />
																			</IconButton>
																		</Tooltip>
																	)
																})
															) : (
																<p>Disponible</p>
															)}
														</div>
													)
												}
												else {
													return (
														<div
															className={`create__appointment__content__schedule__content__day__moments__moment ${value &&
																'Active'}`}
															key={dateFormat}
														/>
													)
												}
											})}
										</div>
									)
								})}
							</div>
						</div>
					</div>
				)}
			</section>
			{DialogCreateAppointment()}
			{DialogPastAppointment()}
		</AppLayout>
	)
}
