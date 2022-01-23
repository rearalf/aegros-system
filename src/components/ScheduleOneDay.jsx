import React, { Suspense } from 'react'
import format from 'date-fns/format'
import { FiMessageSquare, FiUser } from 'react-icons/fi'
import { IconButton, Tooltip } from '@mui/material'
const DialogPastAppointment = React.lazy(() => import('./DialogPastAppointment'))
import useScheduleOneDay from '@hooks/useScheduleOneDay'
import '@styles/components/ScheduleOneDay.scss'

const ScheduleOneDay = ({
	appointment_date__schedule = '',
	handleDateAppointment,
	listAppointmentsToday = [],
	id_appointment = '',
	id_patient = '',
}) => {
	const { times, dialog, getPastAppointment, currentDate } = useScheduleOneDay({
		appointment_date__schedule,
	})
	return (
		<div className="schedule__one__day">
			{!times.length ? null : (
				<React.Fragment>
					<div className="schedule__one__day__time">
						{times.map(time => (
							<div className="schedule__one__day__time__moment" key={time[0]}>
								{time.length > 0 ? (
									time.map((t, i) => {
										const dateFormatHour = format(t, ' h:m bbbb')

										const selectedDateFormatHour = format(t, 'h')
										const selectedDateFormatb = format(t, 'bbbb')
										const selectedDateFormatHour2 = format(
											new Date(appointment_date__schedule),
											'h',
										)
										const selectedDateFormatb2 = format(
											new Date(appointment_date__schedule),
											'bbbb',
										)
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
									})
								) : null}
							</div>
						))}
					</div>
					<div className="schedule__one__day__moment">
						{times.map(time => (
							<div key={time} className="schedule__one__day__moment__time">
								{time.map(t => {
									const dateFormat = format(t, 'dd / MMM / yyyy - h:m bbbb')
									const getTimeSchedule = new Date(t).getTime()
									const currentDateGetTime = currentDate.getTime()
									const currentAppointmentDate = new Date(
										appointment_date__schedule,
									).getTime()
									let value = getTimeSchedule === currentAppointmentDate
									const appointmentNow = listAppointmentsToday.filter(
										appointment => {
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
													appointmentNow.map(data => {
														const { _id, patient } = data
														if (
															_id === id_appointment ||
															patient._id === id_patient
														) {
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
				</React.Fragment>
			)}
			<Suspense fallback={<div>Loading...</div>}>
				<DialogPastAppointment dialog={dialog} />
			</Suspense>
		</div>
	)
}

export default ScheduleOneDay
