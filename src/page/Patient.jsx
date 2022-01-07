import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, TextField, IconButton, Tooltip } from '@mui/material'
import { usePatient } from '@hooks/usePatient'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { AvatarComponent } from '@components/AvatarComponent'
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi'
import image__empty from '@image/no-data.svg'
import { Loading } from '@components/Loading'
import {
	FiPhone,
	FiMail,
	FiCalendar,
	FiEdit,
	FiSave,
	FiXCircle,
	FiFrown,
	FiSmile,
	FiExternalLink,
} from 'react-icons/fi'
import '@styles/page/Patient.scss'
import { format } from 'date-fns'

export const Patient = () => {
	const params = useParams()
	const { id } = params
	const {
		patient,
		loading,
		appointments,
		changeStateInputAllergies,
		inputAllergies,
		changeInputeAllergies,
		cancelChangeAllergies,
		saveInputAllergies,
		handleDeletePatient,
	} = usePatient({
		id,
	})
	const { state_input_allergies, input_allergies, state_button_allergies } = inputAllergies
	const {
		patient_name,
		patient_gender,
		patient_age,
		patient_phone_number,
		patient_email,
		patient_height,
		patient_weight,
		patient_state,
		_id,
	} = patient

	const titleTooltip = state_input_allergies ? 'Activar edición' : 'Desactivar edición'

	return (
		<AppLayout ClassName="Patient">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Pacientes',
						link_to: '/patients',
					},
					{
						link_name: patient_name === '' ? 'Paciente' : patient_name,
						link_to: `/patients/patient/${params.id}`,
					},
				]}
			/>
			{loading ? (
				<Loading />
			) : (
				<section className="patient__section">
					<section className="patient__section__personal__information">
						<div className="patient__section__personal__information__data">
							<div className="patient__section__personal__information__data__header">
								<AvatarComponent
									className="patient__section__personal__information__data__header__avatar"
									name={patient_name}
								/>
								<article className="patient__section__personal__information__data__header__data">
									<h1 className="patient__section__personal__information__data__header__data__title">
										{patient_name}
									</h1>
									<p className="patient__section__personal__information__data__header__data__sub">
										{`${patient_age} años, ${patient_gender === 'man'
											? 'Hombre'
											: 'Mujer'}`}
									</p>
								</article>
							</div>
							<div className="patient__section__personal__information__data__header__extra">
								<div className="patient__section__personal__information__data__header__extra__contacts">
									<p className="patient__section__personal__information__data__header__extra__contacts__contact">
										<FiPhone size={18} /> {patient_phone_number}
									</p>
									<p className="patient__section__personal__information__data__header__extra__contacts__contact">
										<FiMail size={18} />{' '}
										<a href={`mailto:${patient_email}`}>{patient_email}</a>
									</p>
								</div>
								<div className="patient__section__personal__information__data__header__extra__information">
									{patient_height && (
										<p className="patient__section__personal__information__data__header__extra__information__height">
											<GiBodyHeight size={18} /> {patient_height} m
										</p>
									)}
									{patient_weight && (
										<p className="patient__section__personal__information__data__header__extra__information__height">
											<GiWeightScale size={18} /> {patient_weight} lb
										</p>
									)}
								</div>
							</div>
							<div className="patient__section__personal__information__data__actions">
								<Link to={`/patients/create-patient/${_id}`}>
									<Tooltip title="Editar datos">
										<Button
											variant="contained"
											className="btn_basic btn__edit__patient">
											<FiEdit size={18} />
										</Button>
									</Tooltip>
								</Link>
								{patient_state ? (
									<Tooltip title="Deshabilitar paciente">
										<IconButton
											className="btn__icon btn__delete__patient"
											onClick={handleDeletePatient}>
											<FiFrown size={24} />
										</IconButton>
									</Tooltip>
								) : (
									<Tooltip title="Habilitar paciente">
										<IconButton
											className="btn__icon btn__delete__patient"
											onClick={handleDeletePatient}>
											<FiSmile size={22} />
										</IconButton>
									</Tooltip>
								)}
							</div>
						</div>
						<div className="patient__section__personal__information__allergies">
							<h2 className="patient__section__personal__information__allergies__title">
								Alérgias
							</h2>
							<TextField
								id="patient_allergies"
								name="patient_allergies"
								className="patient__section__personal__information__allergies__input"
								multiline
								maxRows={4}
								value={input_allergies}
								onChange={changeInputeAllergies}
								disabled={state_input_allergies}
							/>
							<div className="patient__section__personal__information__allergies__actions">
								{state_button_allergies && (
									<Tooltip title={titleTooltip}>
										<IconButton
											className="btn__icon"
											onClick={changeStateInputAllergies}>
											<FiEdit size={18} />
										</IconButton>
									</Tooltip>
								)}
								{!state_button_allergies && (
									<Button
										variant="contained"
										color="success"
										className="btn__success"
										onClick={saveInputAllergies}
										disabled={state_button_allergies}>
										<FiSave size={18} /> Guardar
									</Button>
								)}
								{!state_button_allergies && (
									<Tooltip title={'Cancelar modificación'}>
										<IconButton
											className="btn__icon cancel__icon__action"
											onClick={cancelChangeAllergies}>
											<FiXCircle size={18} />
										</IconButton>
									</Tooltip>
								)}
							</div>
						</div>
					</section>
					<section className="patient__section__apointment">
						{appointments.length > 0 && (
							<div className="patient__section__apointment__line__time" />
						)}
						<div className="patient__section__apointment__header">
							<h2>Citas</h2>
							<Link to={`/appointments/creat-appointment/${id}`}>
								<Button variant="contained" className="btn_basic">
									<FiCalendar size={18} /> Nueva cita
								</Button>
							</Link>
						</div>
						{appointments.length > 0 ? (
							<div className="patient__section__apointment__appointments">
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
												className="patient__section__apointment__appointments__article">
												<Tooltip title={`Cita ${appointment_state}`}>
													<div
														className={`patient__section__apointment__appointments__article__circle__state ${appointment_state}`}
													/>
												</Tooltip>
												<div className="patient__section__apointment__appointments__article__date">
													<h3 className="patient__section__apointment__appointments__article__date__title">
														{appointment_date__format}
													</h3>
													<p className="patient__section__apointment__appointments__article__date__p">
														Fecha de la cita
													</p>
												</div>
												<div className="patient__section__apointment__appointments__article__parting_line" />
												<div className="patient__section__apointment__appointments__article__created">
													<h3 className="patient__section__apointment__appointments__article__created__title">
														{createdAt__format}
													</h3>
													<p className="patient__section__apointment__appointments__article__created__created">
														Fecha de creación
													</p>
												</div>
												<div className="patient__section__apointment__appointments__article__parting_line" />
												<Tooltip title="Ver cita">
													<Link to="/patients">
														<IconButton className="btn__icon">
															<FiExternalLink size={18} />
														</IconButton>
													</Link>
												</Tooltip>
											</article>
										)
									},
								)}
							</div>
						) : (
							<div className="patient__section__apointment__empty">
								<img
									src={image__empty}
									alt="No hay citas"
									className="patient__section__apointment__empty__image"
								/>
								<h3 className="patient__section__apointment__empty__title">
									No tiene citas
								</h3>
							</div>
						)}
					</section>
				</section>
			)}
		</AppLayout>
	)
}
/* {appointments.map(
								({ _id, appointment_date, appointment_state, createdAt }) => {
									return (
										<article
											key={_id}
											className="patient__section__apointment__appointments__article">
											cita
										</article>
									)
								},
							)} */
