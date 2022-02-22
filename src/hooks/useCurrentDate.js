import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'

function useCurrentDate(){
	const [ dateTime, setDateTime ] = useState({
		hours: format(new Date(), 'h', {
			locale: esLocale,
		}),
		minutes: format(new Date(), 'm', {
			locale: esLocale,
		}),
		date: format(new Date(), 'MMMM dd yyyy', {
			locale: esLocale,
		}),
		timeSystem: format(new Date(), 'aaaa', {
			locale: esLocale,
		}),
	})
	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime({
				...dateTime,
				hours: format(new Date(), 'h', {
					locale: esLocale,
				}),
				minutes: format(new Date(), 'mm', {
					locale: esLocale,
				}),
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	return {
		date: dateTime.date,
		hours: dateTime.hours,
		minutes: dateTime.minutes,
		timeSystem: dateTime.timeSystem,
	}
}

export default useCurrentDate
