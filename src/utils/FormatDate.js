import { format, formatDistanceToNow, subYears } from 'date-fns'
import esLocale from 'date-fns/locale/es'

export function formatDate({ date = new Date(), formatDate = 'dd / MMMM / yyyy' }){
	return format(new Date(date), formatDate, {
		locale: esLocale,
	})
}

export function formatDistanceToNowDate(date){
	return formatDistanceToNow(new Date(date), {
		locale: esLocale,
		addSuffix: true,
	})
}

export function subYearsDate(date, number){
	return subYears(new Date(date), number)
}
