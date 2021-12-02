import React from 'react'
import { useParams } from 'react-router'
import { Button, TextField, IconButton, Tooltip } from '@mui/material'
import { usePatient } from '@hooks/usePatient'
import { AppLayout } from '@components/AppLayout'
import { AvatarComponent } from '@components/AvatarComponent'
import { FiPhone, FiMail, FiCalendar, FiEdit, FiSave, FiXCircle, FiTrash } from 'react-icons/fi'
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi'
import '@styles/page/Patient.scss'

export const Patient = () => {
	const params = useParams()
	const {
		patient,
		loading,
		changeStateInputAllergies,
		inputAllergies,
		changeInputeAllergies,
		cancelChangeAllergies,
		saveInputAllergies,
	} = usePatient({
		id: params.id,
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
	} = patient

	const titleTooltip = state_input_allergies ? 'Activar edición' : 'Desactivar edición'
	return (
		<AppLayout ClassName="Patient">
			{loading ? (
				<h1>Cargando</h1>
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
								<Tooltip title="Editar datos">
									<Button
										variant="contained"
										className="btn_basic btn__edit__patient">
										<FiEdit size={18} />
									</Button>
								</Tooltip>
								<Tooltip title="Eliminar paciente">
									<IconButton className="btn__icon btn__delete__patient">
										<FiTrash size={18} />
									</IconButton>
								</Tooltip>
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
						<div className="patient__section__apointment__header">
							<h2>Citas</h2>
							<Button variant="contained" className="btn_basic">
								<FiCalendar size={18} /> Crear cita
							</Button>
						</div>
					</section>
				</section>
			)}
		</AppLayout>
	)
}
