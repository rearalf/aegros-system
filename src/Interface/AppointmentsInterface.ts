import { patientInterface } from './PatientsInterface'

export interface appointmentInterface {
	_id?: string
	appointment_observation?: string
	appointment_state: string
	appointment_reason?: string
	appointment_date: Date
	format_created: string
	format_appointment_update_date?: string
	format_appointment_end_date?: string
	format_appointment_cancel_date?: string
	format_appointment_date?: string
	distance_to_now_appointment_date: string
	state_date?: boolean
	appointment_date_format?: string
	createdAt__format?: string
	createdAt?: Date
	patient_id?: string
	patient?: patientInterface
}

export interface appointmentsInterface {
	_id: string
	patient_name: string
	format_appointment_date: string
	format_created: string
	appointment_state: string
}

export interface propsAppointmentsParams {
	loading: string
	validShow: string
	pagesAndLimit: {
		currentPage: number
		limit: number
		totalAppointments: number
		totalPages: number
		sortBy: string
		sortStatus: string
		asc: boolean
		loadingSort: boolean
		sortByState: boolean
	}
	classFormShow: string
	validAditional: {
		toolTipTitle: string
		sortAsc: string
		validLengthName: string
	}
	appointmnetSearch: {
		patient_search: string
		show_search_form: boolean
	}
	handleChangeAsc: (e: any) => void
	handleChangeSort: (e: any) => void
	handleResetSearch: () => void
	handleChangeInput: (e: any) => void
	handleChangeLimit: (e: any) => void
	handleChangeStatus: (e: any) => void
	handleChangeStateForm: (e: any) => void
	handleSearchAppointmets: (e: any) => void
}

export interface propsAppointmentsTable {
	appointments: any[]
	loading: string
	validShowTable: string
}

export const appointmentDefault = {
	appointment_observation: '',
	format_created: '',
	format_appointment_update_date: '',
	format_appointment_end_date: '',
	format_appointment_cancel_date: '',
	format_appointment_date: '',
	distance_to_now_appointment_date: '',
	appointment_date: new Date(),
	state_date: true,
	appointment_state: '',
}

export interface CreateAppointmentInterface {
	patient_id: string
	appointment_date: Date
	appointment_reason: string
	appointment_state: boolean
	appointment_current_date: number
}

export interface propsDialogCreateAppointment {
	dialog: boolean
	patient_name: string
	appointment_date: Date
	appointment_reason: string
	handleChangeInput: (e: any) => void
	handleCreateAppointment: (e: any) => void
	handleOpenDialogCreateAppointment: (e: any) => void
	handleChangeInpuDate: (e: any) => void
}

export interface createAppointmentPatientInterface {
	_id: string
	patient_name: string
	patient_state_form: boolean
	appointments: []
}
