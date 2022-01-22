import { useEffect, useState } from 'react'
import format from 'date-fns/format'

function useScheduleOneDay({ appointment_date__schedule }){
	const [ times, setTimes ] = useState([])
	const [ dialog, setDialog ] = useState({
		openDialogPastAppointment: false,
		pastAppointment: '',
		handleDialogAction: () =>
			setDialog({
				...dialog,
				openDialogPastAppointment: false,
			}),
	})
	const getPastAppointment = date =>
		setDialog({
			...dialog,
			openDialogPastAppointment: !dialog.openDialogPastAppointment,
			pastAppointment: date,
		})
	const listTime = () => {
		if (appointment_date__schedule != '') {
			const appointment_dateSplit = format(
				new Date(appointment_date__schedule),
				'MM/dd/yyyy',
			).split('/')
			let i = 1
			const time = []
			const a = setInterval(() => {
				time.push([
					new Date(
						appointment_dateSplit[2],
						appointment_dateSplit[0] - 1,
						appointment_dateSplit[1],
						i,
						0,
					),
					new Date(
						appointment_dateSplit[2],
						appointment_dateSplit[0] - 1,
						appointment_dateSplit[1],
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
	useEffect(
		() => {
			listTime()
		},
		[ appointment_date__schedule ],
	)

	return {
		times,
		dialog,
		getPastAppointment,
	}
}

export default useScheduleOneDay
