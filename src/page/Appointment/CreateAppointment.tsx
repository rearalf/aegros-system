import { lazy, Suspense } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import BreadCrumbsComponent from '../../components/BreadCrumbsComponent'
import DialogCreateAppointment from './components/DialogCreateAppointment'
import useCreateAppointment from '../../hooks/useCreateAppointment'
import { Button, IconButton, TextField } from '@mui/material'
import { FiLogIn, FiXCircle, FiCheckCircle } from 'react-icons/fi'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import { patientInterface } from '../../Interface/PatientsInterface'
import '../../assets/styles/page/CreateAppointment.scss'
const ScheduleOneDay = lazy(() => import('../../components/ScheduleOneDay'))

function CreateAppointment(){
	const {
		patient,
		patients,
		appointment,
		dialog,
		appointmentsToday,
		linksBreadCrumbs,
		handleChangeInput,
		handleChangeInpuDate,
		handleFindPatient,
		handleFoundPatient,
		handleResetFindPatient,
		handleCancelCreateAppointment,
		handleCreateAppointment,
		handleGetTiemeSchedule,
		handleOpenDialogCreateAppointment,
	} = useCreateAppointment()
	const { patient_name, patient_state_form, _id } = patient
	const { appointment_date, appointment_reason } = appointment

	return (
		<main className="container CreateAppointment" id="layout">
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
								autoFocus
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
									patients.map((patient: patientInterface) => (
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
									))
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
						<Suspense fallback={<h1>Cargando</h1>}>
							<ScheduleOneDay
								id_patient={_id}
								listAppointmentsToday={appointmentsToday}
								appointment_date__schedule={appointment_date}
								handleDateAppointment={handleGetTiemeSchedule}
							/>
						</Suspense>
					</div>
				)}
			</section>
			<DialogCreateAppointment
				dialog={dialog}
				patient_name={patient.patient_name}
				appointment_date={appointment_date}
				appointment_reason={appointment.appointment_reason}
				handleChangeInput={handleChangeInput}
				handleChangeInpuDate={handleChangeInpuDate}
				handleCreateAppointment={handleCreateAppointment}
				handleOpenDialogCreateAppointment={handleOpenDialogCreateAppointment}
			/>
		</main>
	)
}

export default CreateAppointment
