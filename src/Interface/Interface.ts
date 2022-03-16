import { appointmentInterface } from './AppointmentsInterface'

export interface linkInterface {
	link_name: string
	link_to: string
}

export interface linksInterface {
	links: linkInterface[]
}

export interface propsContacts {
	contact: string
	type: string
}

export interface propsPagination {
	loading: string
	totalPages: number
	currentPage: number
	validaPagination: string
	handleChangePage: (e: any, pageNumber: number) => void
}

export interface propsScheduleOneDay {
	id_patient?: string
	id_appointment?: string
	listAppointmentsToday?: appointmentInterface[]
	appointment_date__schedule: Date
	handleDateAppointment: (date: Date) => void
}

export interface propsUseScheduleOneDay {
	appointment_date__schedule: Date
}

export interface propsDialogPastAppointment {
	dialog: {
		openDialogPastAppointment: boolean
		pastAppointment: pastAppointmentInterface
		handleDialogAction: () => void
	}
}

export interface pastAppointmentInterface {
	appointment_reason: string
	appointment_state: string
	patient: {
		patient_name: string
	}
}
