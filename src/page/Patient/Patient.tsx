import { Link } from 'react-router-dom'
import { GiBodyHeight, GiWeightScale } from 'react-icons/gi'
import { Button, TextField, IconButton, Tooltip, MenuItem } from '@mui/material'
import usePatient from '../../hooks/usePatient'
import ListAppointments from './components/ListAppointments'
import {
	BreadCrumbsComponent,
	Loading,
	PatientInformation,
	Contacts,
	EmptyData,
} from '../../components'
import { FiCalendar, FiEdit, FiSave, FiXCircle, FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import '../../assets/styles/page/Patient.scss'

const Patient = () => {
	const {
		patient,
		loading,
		appointments,
		inputAllergies,
		inputStates,
		breadCrumbs,
		titleState,
		titleTooltip,
		validShowContent,
		changeStateInputAllergies,
		changeInputeAllergies,
		cancelChangeAllergies,
		saveInputAllergies,
		handleChangeInputState,
		handleDeletePatient,
	} = usePatient()
	const { state_input_allergies, input_allergies, state_button_allergies } = inputAllergies
	const {
		patient_phone_number,
		patient_email,
		patient_height,
		patient_weight,
		patient_state,
		_id,
	} = patient
	return (
		<main className="container patient" id="layout">
			<BreadCrumbsComponent links={breadCrumbs} />
			{loading ? <Loading /> : null}
			<section className={`patient__section ${validShowContent}`}>
				<section className="patient__section__information">
					<div className="patient__section__information__header">
						<PatientInformation {...patient} />
						<div className="patient__section__information__header__additional">
							<div className="patient__section__information__header__additional__contacts">
								{patient_email && (
									<Contacts contact={patient_email} type="mailto" />
								)}
								{patient_phone_number && (
									<Contacts contact={patient_phone_number} type="tel" />
								)}
							</div>
							<div className="patient__section__information__header__additional__health">
								{patient_height && (
									<p className="additional__health">
										<GiBodyHeight size={18} /> {patient_height} m
									</p>
								)}
								{patient_weight && (
									<p className="additional__health">
										<GiWeightScale size={18} /> {patient_weight} lb
									</p>
								)}
							</div>
						</div>
						<div className="patient__section__personal__information__data__actions">
							<Tooltip title="Editar datos">
								<Link
									to={`/private/patients/update-patient/${_id}`}
									className="btn__icon btn__edit__patient">
									<FiEdit size={18} />
								</Link>
							</Tooltip>
							<Tooltip title={titleState}>
								<IconButton
									className="btn__icon btn__delete__patient"
									onClick={handleDeletePatient}>
									{patient_state ? (
										<FiThumbsDown size={18} />
									) : (
										<FiThumbsUp size={18} />
									)}
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
					{appointments.length > 0 && (
						<div className="patient__section__apointment__line__time" />
					)}
					<div className="patient__section__apointment__header">
						<h2>Citas</h2>
						<Link to={`/private/appointments/creat-appointment/${_id}`}>
							<Button variant="contained" className="btn_basic">
								<FiCalendar size={18} /> Nueva cita
							</Button>
						</Link>
					</div>
					{appointments.length > 0 && (
						<div className="patient__section__apointment__state">
							<TextField
								id="state_appointment"
								name="state_appointment"
								label="Statdos de citas"
								className="patient__section__apointment__state__input"
								value={inputStates}
								onChange={handleChangeInputState}
								select>
								<MenuItem value={'all'}>Todos</MenuItem>
								<MenuItem value={'Activa'}>Activas</MenuItem>
								<MenuItem value={'Finalizada'}>Finalizadas</MenuItem>
								<MenuItem value={'Cancelada'}>Canceladas</MenuItem>
							</TextField>
						</div>
					)}
					{appointments.length > 0 ? (
						<ListAppointments
							appointments={appointments}
							state_appointment={inputStates}
						/>
					) : (
						<EmptyData title="No tiene citas." />
					)}
				</section>
			</section>
		</main>
	)
}

export default Patient
