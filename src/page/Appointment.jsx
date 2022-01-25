import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { AvatarComponent } from '@components/AvatarComponent'
import { Loading } from '@components/Loading'
import useAppointment from '../hooks/useAppointment'
import { format } from 'date-fns'
import { Button, IconButton, TextField, Tooltip } from '@mui/material'
import {
	FiExternalLink,
	FiActivity,
	FiSave,
	FiXCircle,
	FiCalendar,
	FiAlertTriangle,
} from 'react-icons/fi'
import '@styles/page/Appointment.scss'

export const Appointment = () => {
	const { appointment__id } = useParams()
	const {
		loading,
		appointment,
		patient,
		handleChangeObservation,
		handleOpenDialog,
		handleCancelAppointment,
		handleFinishedAppointment,
	} = useAppointment(appointment__id)
	const {
		format_appointment_date,
		format_created,
		format_appointment_update_date,
		format_appointment_end_date,
		format_appointment_cancel_date,
		distance_to_now_appointment_date,
		appointment_reason,
		appointment_observation,
		appointment_state,
		state_date,
		_id,
	} = appointment
	const {
		patient_name,
		patient_age,
		patient_email,
		patient_allergies,
		patient_gender,
		patient_phone_number,
		appointments,
	} = patient
	return (
		<AppLayout ClassName="Appointment">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Citas',
						link_to: '/appointments',
					},
					{
						link_name: patient_name ? `Cita de ${patient_name}` : '',
						link_to: `/appointments/${appointment__id}`,
					},
				]}
			/>
			{loading ? (
				<Loading />
			) : (
				<React.Fragment>
					<section className="appointment__header">
						<h1>Cita</h1>
						{appointment_state === 'Activa' && (
							<div className="appointment__header__button_group">
								<Link to={`/appointments/update-appointment/${_id}`}>
									<Button
										variant="contained"
										className="btn_basic"
										onClick={handleOpenDialog}>
										<FiCalendar />Modificar fecha de cita
									</Button>
								</Link>
								<Button
									variant="contained"
									className="btn__success"
									onClick={handleFinishedAppointment}>
									<FiSave />
									Terminar cita
								</Button>
								<Button
									variant="outlined"
									color="error"
									className="btn__error"
									onClick={handleCancelAppointment}>
									<FiXCircle />Cancelar cita
								</Button>
							</div>
						)}
					</section>
					{appointment_state === 'Activa' &&
					!state_date && (
						<article className="appointment__alert__date">
							<h2 className="appointment__alert__date__title">
								<FiAlertTriangle />La cita caduco {distance_to_now_appointment_date}
							</h2>
						</article>
					)}
					<section className="appointment__information">
						<section className="appointment__information__patient">
							<div className="appointment__information__patient__header">
								<AvatarComponent
									name={patient_name}
									className="appointment__information__patient__header__avatar"
								/>
								<article className="appointment__information__patient__header__information">
									<h2 className="appointment__information__patient__header__information__title">
										{patient_name}
									</h2>
									<p className="appointment__information__patient__header__information__subtitle">
										{`${patient_age} años, ${patient_gender === 'man'
											? 'Hombre'
											: 'Mujer'}`}
									</p>
								</article>
								<div className="appointment__information__patient__header__profile">
									<Tooltip title="Ver perfil del paciente">
										<Link to={`/patients/patient/${patient._id}`}>
											<FiActivity />
										</Link>
									</Tooltip>
								</div>
							</div>
							<article className="appointment__information__patient__appointment">
								<h3 className="appointment__information__patient__appointment__title">
									Información del paciente
								</h3>
								<div className="appointment__information__patient__appointment__data">
									<p className="appointment__information__patient__appointment__data__text">
										<b>Teléfono: </b>
										<Tooltip title="Llamar al paciente">
											<a href={`tel:${patient_phone_number}`}>
												{patient_phone_number}
											</a>
										</Tooltip>
									</p>
									<p className="appointment__information__patient__appointment__data__text">
										<b>Email: </b>
										<Tooltip title="Enviar un email al paciente">
											<a href={`mailto:${patient_email}`}>{patient_email}</a>
										</Tooltip>
									</p>
								</div>
							</article>
							<article className="appointment__information__patient__appointment">
								<h3 className="appointment__information__patient__appointment__title">
									Información de la cita
								</h3>
								<div className="appointment__information__patient__appointment__data">
									<p className="appointment__information__patient__appointment__data__text">
										<b>Fecha de creacion: </b>
										{format_created}
									</p>
									{format_appointment_update_date && (
										<p className="appointment__information__patient__appointment__data__text">
											<b>Cambio de día de la cita: </b>
											{format_appointment_update_date}
										</p>
									)}
									<p className="appointment__information__patient__appointment__data__text">
										<b>Fecha de la cita: </b>
										{format_appointment_date}
									</p>
									<p className="appointment__information__patient__appointment__data__text">
										<b>Estado de la cita: </b>
										<span className={appointment_state}>
											{appointment_state}
										</span>
									</p>
									{format_appointment_end_date && (
										<p className="appointment__information__patient__appointment__data__text">
											<b>La cita finalizó el día: </b>
											{format_appointment_end_date}
										</p>
									)}
									{format_appointment_cancel_date && (
										<p className="appointment__information__patient__appointment__data__text">
											<b>La cita fue cancelada el día: </b>
											{format_appointment_cancel_date}
										</p>
									)}
								</div>
							</article>
						</section>
						<section className="appointment__information__observation">
							<h2 className="appointment__information__observation__title">
								Observaciones
							</h2>
							<TextField
								id="appointment_observation"
								name="appointment_observation"
								className="appointment__information__observation__input"
								multiline
								maxRows={5}
								value={appointment_observation}
								onChange={handleChangeObservation}
								disabled={appointment_state !== 'Activa'}
							/>
						</section>
						<section className="appointment__information__reason">
							<h2 className="appointment__information__reason__title">
								Razón de la cita
							</h2>
							<p className="appointment__information__reason__text">
								{appointment_reason}
							</p>
						</section>
						<section className="appointment__information__allergies">
							<h2 className="appointment__information__allergies__title">Alergias</h2>
							<p className="appointment__information__allergies__text">
								{patient_allergies}
							</p>
						</section>
						<section className="appointment__information__appointments">
							<h2 className="appointment__information__appointments__title">Citas</h2>
							<div className="appointment__information__appointments__list">
								<div className="appointment__information__appointments__list__line" />
								{appointments.map(
									({ _id, appointment_date, appointment_state, createdAt }) => {
										const appointment_date__format = format(
											new Date(appointment_date),
											'dd / MMM / yyyy - h:m bbbb',
										)
										const createdAt__format = format(
											new Date(createdAt),
											'dd / MMM / yyyy - h:m bbbb',
										)
										return (
											<article
												key={_id}
												className="appointment__information__appointments__list__appointment">
												<Tooltip title={`Cita ${appointment_state}`}>
													<div
														className={`appointment__information__appointments__list__appointment__state ${appointment_state}`}
													/>
												</Tooltip>
												<div className="appointment__information__appointments__list__appointment__date">
													<h3 className="appointment__information__appointments__list__appointment__title">
														{appointment_date__format}
													</h3>
													<p className="appointment__information__appointments__list__appointment__p">
														Fecha de la cita
													</p>
												</div>
												<div className="appointment__information__appointments__list__appointment__parting__line" />
												<div className="appointment__information__appointments__list__appointment__created">
													<h3 className="appointment__information__appointments__list__appointment__created__title">
														{createdAt__format}
													</h3>
													<p className="appointment__information__appointments__list__appointment__created__created">
														Fecha de creación
													</p>
												</div>
												<div className="appointment__information__appointments__list__appointment__parting__line" />
												{appointment__id === _id ? (
													<h3>Cita actual</h3>
												) : (
													<Tooltip title="Ver cita">
														<Link to={`/appointments/${_id}`}>
															<IconButton className="btn__icon">
																<FiExternalLink size={18} />
															</IconButton>
														</Link>
													</Tooltip>
												)}
											</article>
										)
									},
								)}
							</div>
						</section>
					</section>
				</React.Fragment>
			)}
		</AppLayout>
	)
}
