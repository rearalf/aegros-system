import { format, formatDistanceToNow, subYears } from 'date-fns'
import esLocale from 'date-fns/locale/es'

interface formatDateInterface {
	date: Date
	formatDate: string
}

export function formatDate({
	date = new Date(),
	formatDate = 'dd / MMMM / yyyy',
}: formatDateInterface){
	return format(new Date(date), formatDate, {
		locale: esLocale,
	})
}

export function formatDistanceToNowDate(date: string){
	return formatDistanceToNow(new Date(date), {
		locale: esLocale,
		addSuffix: true,
	})
}

export function subYearsDate(date: any, number: number){
	return subYears(new Date(date), number)
}
