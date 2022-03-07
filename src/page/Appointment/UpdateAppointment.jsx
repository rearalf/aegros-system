import React, { Suspense } from 'react'
import { Loading, PatientInformation, BreadCrumbsComponent } from '@components'
import { FiMail, FiPhone, FiSave, FiXCircle } from 'react-icons/fi'
import { Button, TextField, Tooltip } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import useUpdateAppointment from '@hooks/useUpdateAppointment'
const ScheduleOneDay = React.lazy(() => import('@components/ScheduleOneDay'))
import '@styles/page/UpdateAppointment.scss'

const UpdateAppointment = () => {
	const {
		validShowContent,
		loading,
		loadingSchedule,
		appointment,
		patient,
		appointmentsToday,
		linksBreadCrumbs,
		handleChangeInpuDate,
		handleUpdateAppointmentDate,
		handleCancelUpdate,
	} = useUpdateAppointment()
	return (
		<main className="container update__appointment" id="layout">
			<BreadCrumbsComponent links={linksBreadCrumbs} />
			<header className="update__appointment__header">
				<h1 className="update__appointment__header__title">Modificar fecha de la cita</h1>
			</header>
			{loading ? <Loading /> : null}
			<div className={`update__appointment__section ${validShowContent}`}>
				<div className="update__appointment__section__content">
					<div className="update__appointment__section__content__patient">
						<PatientInformation {...patient} />
						<div className="update__appointment__section__content__patient__data">
							{patient.patient_email && (
								<Tooltip title="Enviar un email al paciente">
									<a
										href={`mailto:${patient.patient_email}`}
										className="additional__contact">
										<FiMail size={18} />
										{patient.patient_email}
									</a>
								</Tooltip>
							)}
							{patient.patient_phone_number && (
								<Tooltip title="Llamar al paciente">
									<a
										href={`tel:${patient.patient_phone_number}`}
										className="additional__contact">
										<FiPhone size={18} />
										{patient.patient_phone_number}
									</a>
								</Tooltip>
							)}
						</div>
					</div>
					<div className="button__group">
						<Button
							type="submit"
							variant="contained"
							color="success"
							className="btn__success"
							onClick={handleUpdateAppointmentDate}>
							<FiSave size={18} /> Guardar
						</Button>
						<Button
							variant="outlined"
							color="error"
							className="btn__error"
							onClick={handleCancelUpdate}>
							<FiXCircle size={18} /> Cancelar
						</Button>
					</div>
				</div>
				<section className="update__appointment__section__schedule">
					<header className="update__appointment__section__schedule__header">
						<h2>Seleccione el día y hora</h2>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="Fecha de la cita"
								value={appointment.appointment_date}
								onChange={handleChangeInpuDate}
								minDate={new Date()}
								toolbarPlaceholder="Mes/Día/Año"
								renderInput={params => (
									<TextField {...params} helperText="mm/dd/yyyy" required />
								)}
							/>
						</LocalizationProvider>
					</header>
					<Suspense fallback={<Loading />}>
						<ScheduleOneDay
							appointment_date__schedule={appointment.appointment_date}
							handleDateAppointment={handleChangeInpuDate}
							listAppointmentsToday={appointmentsToday}
							id_appointment={appointment._id}
							loadingSchedule={loadingSchedule}
						/>
					</Suspense>
				</section>
			</div>
		</main>
	)
}

export default UpdateAppointment
