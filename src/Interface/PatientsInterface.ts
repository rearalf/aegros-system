import { subYearsDate } from '../utils/FormatDate'

export const patientDefault = {
	_id: '',
	patient_name: '',
	patient_name_short: '',
	patient_email: '',
	patient_phone_number: '',
	patient_state: '',
	patient_date_birth_format: '',
	patient_age: 0,
	patient_height: 0,
	patient_weight: 0,
	patient_allergies: '',
	patient_date_birth: '',
	appointments: [],
}

export const patientValidDataDefault = {
	minDate: subYearsDate(new Date(), 100),
	maxDate: subYearsDate(new Date(), 1),
	patient_name_error: false,
	patient_date_birth_error: false,
	patient_gender_error: false,
	patient_email_error: false,
	patient_allergies_error: false,
	patient_phone_number_error: false,
	patient_weight_error: false,
	patient_height_error: false,
}

export interface patientInterface {
	_id?: string
	patient_name?: string
	patient_name_short?: string
	patient_email?: string
	patient_phone_number?: string
	patient_state?: string
	patient_age?: number
	patient_date_birth_format?: string
	patient_height?: number
	patient_weight?: number
	patient_allergies?: string
	patient_gender?: string
	patient_date_birth?: string
	patient_state_form?: boolean
	appointments: appointmentPatientInterface[]
}

export interface propsPatientsParams {
	patientSearch: {
		patient_name: string
		show_patient_form: boolean
	}
	pagesAndLimit: {
		currentPage: number
		limit: number
		totalPatients: number
		totalPages: number
		sortBy: string
		asc: boolean
		loadingSort: boolean
	}
	loading: string
	validShow: string
	classFormShow: string
	validAditional: {
		toolTipTitle: string
		sortAsc: string
		validLengthName: string
	}
	handleResetSearch: () => void
	handleChangeStateForm: () => void
	handleChangeInput: (e: any) => void
	handleSearchPatients: (e: any) => void
	handleChangeLimit: (e: any) => void
	handleChangeAsc: (e: any) => void
	handleChangeSortBy: (e: any) => void
}

export interface propsPatientsTable {
	patients: any[]
	loading: string
	validShowTable: string
}

export interface propsFormPatient {
	patientData: CreatePatientInterface
	validData: {
		minDate: any
		maxDate: any
		patient_name_error: boolean
		patient_date_birth_error: boolean
		patient_gender_error: boolean
		patient_email_error: boolean
		patient_allergies_error: boolean
		patient_phone_number_error: boolean
		patient_weight_error: boolean
		patient_height_error: boolean
	}
	validShowContent?: string
	handleChangeInput: (e: any) => void
	handleChangeDate: (value: any) => void
	handleChangePhone: (value: any) => void
	handleOnSubmit: (e: any) => void
	handleCanceled: (e: any) => void
}

export interface CreatePatientInterface {
	patient_name: string
	patient_email: string
	patient_gender: string
	patient_allergies: string
	patient_date_birth: string
	patient_phone_number: string
	patient_weight: number
	patient_height: number
	patient_name_short?: string
}
export interface appointmentPatientInterface {
	_id: string
	createdAt: Date
	appointment_date: Date
	appointment_state: string
	createdAt_format: string
	createdAt_format_hour: string
	appointment_date_format: string
	appointment_date_format_hour: string
}

export interface propsListAppointments {
	appointments: appointmentPatientInterface[]
	state_appointment: string
}

export interface propsArticleAppointment {
	appointment: appointmentPatientInterface
	appointment_current_id?: string
}
