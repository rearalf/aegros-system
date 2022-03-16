import { Fragment, lazy, Suspense } from 'react'
import { formatDate } from '../utils/FormatDate'
import { FiMessageSquare, FiUser } from 'react-icons/fi'
import { IconButton, Tooltip } from '@mui/material'
import { propsScheduleOneDay } from '../Interface/Interface'
import { appointmentInterface } from '../Interface/AppointmentsInterface'
import useScheduleOneDay from '../hooks/useScheduleOneDay'
import '../assets/styles/components/ScheduleOneDay.scss'
const DialogPastAppointment = lazy(() => import('./DialogPastAppointment'))

const ScheduleOneDay = ({
	id_patient = '',
	id_appointment = '',
	listAppointmentsToday = [],
	appointment_date__schedule,
	handleDateAppointment,
}: propsScheduleOneDay) => {
	const { times, dialog, getPastAppointment, currentDate } = useScheduleOneDay({
		appointment_date__schedule,
	})
	return (
		<div className="schedule__one__day">
			<Fragment>
				<div className="schedule__one__day__time">
					{times.map(time => (
						<div className="schedule__one__day__time__moment" key={time[0]}>
							{time.map((t: Date, i: number) => {
								const dateFormatHour = formatDate({
									date: t,
									formatDate: 'h:m bbbb',
								})
								const selectedDateFormatHour = formatDate({
									date: t,
									formatDate: 'h',
								})
								const selectedDateFormatb = formatDate({
									date: t,
									formatDate: 'bbbb',
								})
								const selectedDateFormatHour2 = formatDate({
									date: new Date(appointment_date__schedule),
									formatDate: 'h',
								})
								const selectedDateFormatb2 = formatDate({
									date: new Date(appointment_date__schedule),
									formatDate: 'bbbb',
								})
								let value = ''
								if (
									selectedDateFormatHour === selectedDateFormatHour2 &&
									selectedDateFormatb === selectedDateFormatb2
								)
									value = 'Active'
								return (
									i === 0 && (
										<h3
											className={`schedule__one__day__time__moment__hour ${value}`}
											key={dateFormatHour}>
											{dateFormatHour}
										</h3>
									)
								)
							})}
						</div>
					))}
				</div>
				<div className="schedule__one__day__moment">
					{times.map(time => (
						<div key={time} className="schedule__one__day__moment__time">
							{time.map((t: Date) => {
								const dateFormat = formatDate({
									date: t,
									formatDate: 'dd / MMM / yyyy - h:m bbbb',
								})
								const getTimeSchedule = new Date(t).getTime()
								const currentDateGetTime = currentDate.getTime()
								const currentAppointmentDate = new Date(
									appointment_date__schedule,
								).getTime()
								let value = getTimeSchedule === currentAppointmentDate
								const appointmentNow = listAppointmentsToday.filter(
									(appointment: appointmentInterface) => {
										const { appointment_date } = appointment
										const getTime_appointment_date = new Date(
											appointment_date,
										).getTime()
										if (getTimeSchedule === getTime_appointment_date) {
											return appointment
										}
										return null
									},
								)
								if (currentDateGetTime <= getTimeSchedule) {
									return (
										<div
											className={`schedule__one__day__moment__time__moment ${value &&
												'Active'}`}
											key={dateFormat}
											onClick={() => handleDateAppointment(t)}>
											{appointmentNow.length ? (
												appointmentNow.map((data: appointmentInterface) => {
													const { _id, patient } = data
													const validPatient =
														patient !== undefined &&
														patient._id === id_patient
													if (_id === id_appointment || validPatient) {
														return (
															<Tooltip
																key={_id}
																title="Esta es su cita">
																<IconButton className="btn__icon schedule__one__day__moment__time__moment__icon">
																	<FiUser />
																</IconButton>
															</Tooltip>
														)
													}
													return (
														<Tooltip key={_id} title="Ver más">
															<IconButton
																className="btn__icon schedule__one__day__moment__time__moment__icon"
																onClick={() =>
																	getPastAppointment(data)}>
																<FiMessageSquare />
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
											className={`schedule__one__day__moment__time__moment ${value &&
												'Active'}`}
											key={dateFormat}
										/>
									)
								}
							})}
						</div>
					))}
				</div>
			</Fragment>
			<Suspense fallback={<div>Loading...</div>}>
				<DialogPastAppointment dialog={dialog} />
			</Suspense>
		</div>
	)
}

export default ScheduleOneDay
