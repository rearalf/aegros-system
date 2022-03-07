import React from 'react'
import { Link } from 'react-router-dom'
import useAppointment from '@hooks/useAppointment'
import { Loading, PatientInformation, BreadCrumbsComponent } from '@components'
import { Button, IconButton, TextField, Tooltip } from '@mui/material'
import {
	FiExternalLink,
	FiActivity,
	FiSave,
	FiXCircle,
	FiCalendar,
	FiMail,
	FiPhone,
	FiAlertTriangle,
} from 'react-icons/fi'
import '@styles/page/Appointment.scss'

const Appointment = () => {
	const {
		loading,
		validShowContent,
		appointment,
		patient,
		breadCrumbs,
		validShowContacts,
		validStateAppointment,
		validAlert,
		handleChangeObservation,
		handleCancelAppointment,
		handleFinishedAppointment,
	} = useAppointment()
	const {
		format_appointment_update_date,
		format_appointment_end_date,
		format_appointment_cancel_date,
		appointment_state,
	} = appointment
	const { patient_email, patient_phone_number, appointments } = patient
	return (
		<main className="container Appointment" id="layout">
			<BreadCrumbsComponent links={breadCrumbs} />
			{loading ? <Loading /> : null}
			<React.Fragment>
				<section className="appointment__header">
					<h1>Cita</h1>
					{validStateAppointment && (
						<div className={`appointment__header__button_group ${validShowContent}`}>
							<Link
								to={`/private/appointments/update-appointment/${appointment._id}`}>
								<Button variant="contained" className="btn_basic">
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
				{validAlert && (
					<article className={`appointment__alert__date ${validShowContent}`}>
						<h2 className="appointment__alert__date__title">
							<FiAlertTriangle />La cita caduco
							{appointment.distance_to_now_appointment_date}
						</h2>
					</article>
				)}
				<section className={`appointment__information ${validShowContent}`}>
					<section className="appointment__information__patient">
						<div className="appointment__information__patient__profile">
							<Tooltip title="Ver perfil del paciente">
								<Link to={`/private/patients/${patient._id}`}>
									<FiActivity size={18} />
								</Link>
							</Tooltip>
						</div>
						<PatientInformation {...patient} />
						{validShowContacts && (
							<article className="appointment__information__patient__contacts">
								<h3 className="appointment__information__patient__contacts__title">
									Información del paciente
								</h3>
								<div className="appointment__information__patient__contacts__content">
									{patient_email && (
										<Tooltip title="Enviar un email al paciente">
											<a
												href={`mailto:${patient_email}`}
												className="appointment__information__patient__contacts__content__contact">
												<FiMail size={18} />
												{patient_email}
											</a>
										</Tooltip>
									)}
									{patient_phone_number && (
										<Tooltip title="Llamar al paciente">
											<a
												href={`tel:${patient_phone_number}`}
												className="appointment__information__patient__contacts__content__contact">
												<FiPhone size={18} />
												{patient_phone_number}
											</a>
										</Tooltip>
									)}
								</div>
							</article>
						)}
						<article className="appointment__information__patient__appointment">
							<h3 className="appointment__information__patient__appointment__title">
								Información de la cita
							</h3>
							<div className="appointment__information__patient__appointment__data">
								<p className="appointment__information__patient__appointment__data__text">
									<strong>Fecha de creacion: </strong>
									{appointment.format_created}
								</p>
								{format_appointment_update_date && (
									<p className="appointment__information__patient__appointment__data__text">
										<strong>Cambio de día de la cita: </strong>
										{format_appointment_update_date}
									</p>
								)}
								<p className="appointment__information__patient__appointment__data__text">
									<strong>Fecha de la cita: </strong>
									{appointment.format_appointment_date}
								</p>
								<p className="appointment__information__patient__appointment__data__text">
									<strong>Estado de la cita: </strong>
									<span className={appointment_state}>{appointment_state}</span>
								</p>
								{format_appointment_end_date && (
									<p className="appointment__information__patient__appointment__data__text">
										<strong>La cita finalizó el día: </strong>
										{format_appointment_end_date}
									</p>
								)}
								{format_appointment_cancel_date && (
									<p className="appointment__information__patient__appointment__data__text">
										<strong>La cita fue cancelada el día: </strong>
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
							value={appointment.appointment_observation}
							onChange={handleChangeObservation}
							disabled={!validStateAppointment}
						/>
					</section>
					<section className="appointment__information__reason">
						<h2 className="appointment__information__reason__title">
							Razón de la cita
						</h2>
						<p className="appointment__information__reason__text">
							{appointment.appointment_reason}
						</p>
					</section>
					<section className="appointment__information__allergies">
						<h2 className="appointment__information__allergies__title">Alergias</h2>
						<p className="appointment__information__allergies__text">
							{patient.patient_allergies}
						</p>
					</section>
					<section className="appointment__information__appointments">
						<h2 className="appointment__information__appointments__title">Citas</h2>
						<div className="appointment__information__appointments__list">
							<div className="appointment__information__appointments__list__line" />
							{appointments.map(data => (
								<article
									key={data._id}
									className="appointment__information__appointments__list__appointment">
									<Tooltip title={`Cita ${data.appointment_state}`}>
										<div
											className={`appointment__information__appointments__list__appointment__state ${data.appointment_state}`}
										/>
									</Tooltip>
									<div className="appointment__information__appointments__list__appointment__date">
										<h3 className="appointment__information__appointments__list__appointment__title">
											{data.appointment_date__format}
										</h3>
										<p className="appointment__information__appointments__list__appointment__p">
											Fecha de la cita
										</p>
									</div>
									<div className="appointment__information__appointments__list__appointment__parting__line" />
									<div className="appointment__information__appointments__list__appointment__created">
										<h3 className="appointment__information__appointments__list__appointment__created__title">
											{data.createdAt__format}
										</h3>
										<p className="appointment__information__appointments__list__appointment__created__created">
											Fecha de creación
										</p>
									</div>
									<div className="appointment__information__appointments__list__appointment__parting__line" />
									{appointment._id === data._id ? (
										<h3>Cita actual</h3>
									) : (
										<Tooltip title="Ver cita">
											<Link to={`/private/appointments/${data._id}`}>
												<IconButton className="btn__icon">
													<FiExternalLink size={18} />
												</IconButton>
											</Link>
										</Tooltip>
									)}
								</article>
							))}
						</div>
					</section>
				</section>
			</React.Fragment>
		</main>
	)
}

export default Appointment
