import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { AppLayout } from '@components/AppLayout'
import { Loading } from '@components/Loading'
import useUpdateAppointment from '@hooks/useUpdateAppointment'
import { AvatarComponent } from '@components/AvatarComponent'
import { FiMail, FiPhone, FiSave, FiXCircle } from 'react-icons/fi'
import { Button, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
/* import ScheduleOneDay from '@components/ScheduleOneDay' */
const ScheduleOneDay = React.lazy(() => import('@components/ScheduleOneDay'))
import '@styles/page/UpdateAppointment.scss'

const UpdateAppointment = () => {
	const { id_appointment } = useParams()
	const {
		loading,
		loadingSchedule,
		appointment,
		patient,
		appointmentsToday,
		handleChangeInpuDate,
		handleUpdateAppointmentDate,
		handleCancelUpdate,
	} = useUpdateAppointment(id_appointment)
	const {
		patient_name,
		patient_age,
		patient_gender,
		patient_email,
		patient_phone_number,
	} = patient
	const { appointment_date } = appointment

	return (
		<AppLayout ClassName="UpdateAppointment">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Citas',
						link_to: '/appointments',
					},
					{
						link_name: patient_name ? `Cita de ${patient_name}` : '',
						link_to: `/appointments/${id_appointment}`,
					},
					{
						link_name: 'Modificar fecha de cita',
						link_to: '/appointments',
					},
				]}
			/>
			<header className="update__appointment__header">
				<h1 className="update__appointment__header__title">Modificar fecha de la cita</h1>
			</header>
			{loading ? (
				<Loading />
			) : (
				<div className="update__appointment__section">
					<div className="update__appointment__section__patient">
						<div className="update__appointment__section__patient__peronal">
							<AvatarComponent
								name={patient_name}
								className="update__appointment__section__patient__peronal__avatar"
							/>
							<article className="update__appointment__section__patient__peronal__information">
								<h2 className="update__appointment__section__patient__peronal__information__name">
									{patient_name}
								</h2>
								<p className="update__appointment__section__patient__peronal__information__additional">
									{`${patient_age} años, ${patient_gender === 'man'
										? 'Hombre'
										: 'Mujer'}`}
								</p>
							</article>
						</div>
						<div className="update__appointment__section__patient__data">
							<p className="patient__section__personal__information__data__header__extra__contacts__contact">
								<FiPhone size={18} />
								<a href={`tel:${patient_phone_number}`}>{patient_phone_number}</a>
							</p>
							<p className="patient__section__personal__information__data__header__extra__contacts__contact">
								<FiMail size={18} />
								<a href={`mailto:${patient_email}`}>{patient_email}</a>
							</p>
						</div>
					</div>
					<section className="update__appointment__section__schedule">
						<header className="update__appointment__section__schedule__header">
							<h2>Seleccione el día y hora</h2>
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
						</header>
						<Suspense fallback={<Loading />}>
							<ScheduleOneDay
								appointment_date__schedule={appointment_date}
								handleDateAppointment={handleChangeInpuDate}
								listAppointmentsToday={appointmentsToday}
								id_appointment={id_appointment}
								loadingSchedule={loadingSchedule}
							/>
						</Suspense>
					</section>
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
			)}
		</AppLayout>
	)
}

export default UpdateAppointment
