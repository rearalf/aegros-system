import { useEffect, useState } from 'react'
import { roundDate } from '../utils/Utils'
import { formatDate } from '../utils/FormatDate'
import { propsUseScheduleOneDay } from '../Interface/Interface'
import { appointmentInterface } from '../Interface/AppointmentsInterface'

function useScheduleOneDay({ appointment_date__schedule }: propsUseScheduleOneDay){
	const [ times, setTimes ] = useState<any[]>([])
	const currentDate = roundDate()
	const [ dialog, setDialog ] = useState<any>({
		openDialogPastAppointment: false,
		pastAppointment: {
			appointment_reason: '',
			appointment_state: '',
			appointment_date: new Date(),
			patient: {
				patient_name: '',
			},
		},
		handleDialogAction: () =>
			setDialog({
				...dialog,
				openDialogPastAppointment: false,
			}),
	})

	const getPastAppointment = (date: appointmentInterface) =>
		setDialog({
			...dialog,
			openDialogPastAppointment: !dialog.openDialogPastAppointment,
			pastAppointment: date,
		})

	const listTime = () => {
		if (appointment_date__schedule !== undefined) {
			const appointment_date_split = formatDate({
				date: new Date(appointment_date__schedule),
				formatDate: 'MM/dd/yyyy',
			}).split('/')
			let i = 1
			const time: any[] = []
			const a = setInterval(() => {
				time.push([
					new Date(
						parseInt(appointment_date_split[2]),
						parseInt(appointment_date_split[0]) - 1,
						parseInt(appointment_date_split[1]),
						i,
						0,
					),
					new Date(
						parseInt(appointment_date_split[2]),
						parseInt(appointment_date_split[0]) - 1,
						parseInt(appointment_date_split[1]),
						i,
						30,
					),
				])
				i++
				if (time.length === 23) {
					clearInterval(a)
					setTimes(time)
				}
			}, 5)
		}
	}
	useEffect(() => listTime(), [ appointment_date__schedule ])

	return {
		times,
		dialog,
		currentDate,
		getPastAppointment,
	}
}

export default useScheduleOneDay
