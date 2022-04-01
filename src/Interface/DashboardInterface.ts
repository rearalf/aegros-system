export interface propsDataCounts {
	totalAppointments: number
	totalPatients: number
	todayAppointments: number
	totalAppointmentsCancel: number
	totalAppointmentsFinish: number
	loadingDataCount: boolean
}

export interface propsBarChart {
	dataBarChart: any
	optionsChartLine: any
}

export interface propsAppointmentsDay {
	appointments: propsCardAppointment[]
}

export interface propsAppointmentsWeek {
	appointments: any[]
	daysAppointments: any[]
}

export interface propsAppointmentMonth {
	appointments: any[]
	daysAppointments: any[]
}

export interface propsCardAppointment {
	_id: string
	patient_name: string
	appointment_date: string
	appointment_state: string
	format_appointment_date: string
	appointment_state_current: boolean
}

export interface countsInterface {
	name: string
	number: number
}
