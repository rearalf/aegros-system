const appointmentModels = require('../models/appointment.models')
const patientModels = require('../models/patient.models')

const getAppointmentsDashboard = async (event, args) => {
	try {
		const { dateYear, dateMonth, dateDay, params } = args
		const fullDate = new Date(dateYear, dateMonth, dateDay)
		if (params === 'Day') {
			const appointments = await appointmentModels
				.find({
					appointment_date: {
						$gte: new Date(dateYear, dateMonth, dateDay, 1),
						$lte: new Date(dateYear, dateMonth, dateDay, 23),
					},
				})
				.populate('patient')
			return {
				success: true,
				appointments: JSON.stringify(appointments),
			}
		}
		else if (params === 'Week') {
			const first = fullDate.getDate() - fullDate.getDay()
			const firstDay = new Date(fullDate.setDate(first))
			const lastDay = new Date(dateYear, dateMonth, first + 6, 23)
			const appointments = await appointmentModels
				.find({
					appointment_date: {
						$gte: firstDay,
						$lte: lastDay,
					},
				})
				.populate('patient')
				.sort({ appointment_date: 1 })
			return {
				success: true,
				appointments: JSON.stringify(appointments),
			}
		}
		else if (params === 'Month') {
			const appointments = await appointmentModels
				.find({
					$expr: {
						$and: [
							{ $eq: [ { $year: '$appointment_date' }, { $year: fullDate } ] },
							{ $eq: [ { $month: '$appointment_date' }, { $month: fullDate } ] },
						],
					},
				})
				.populate('patient')
			return {
				success: true,
				appointments: JSON.stringify(appointments),
			}
		}
	} catch (error) {
		console.log(error)
		return {
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		}
	}
}

const getCountDataDashboard = async (event, args) => {
	try {
		const fullDate = new Date()
		const totalAppointments = await appointmentModels.countDocuments().catch(error => {
			throw error
		})
		const totalPatients = await patientModels.countDocuments().catch(error => {
			throw error
		})
		const totalAppointmentsCancel = await appointmentModels.countDocuments({
			appointment_state: 'Cancelada',
		})
		const totalAppointmentsFinish = await appointmentModels.countDocuments({
			appointment_state: 'Finalizada',
		})
		const todayAppointments = await appointmentModels
			.countDocuments({
				appointment_date: {
					$gte: new Date(
						fullDate.getFullYear(),
						fullDate.getMonth(),
						fullDate.getDate(),
						1,
					),
					$lte: new Date(
						fullDate.getFullYear(),
						fullDate.getMonth(),
						fullDate.getDate(),
						23,
					),
				},
				appointment_state: 'Activa',
			})
			.catch(error => {
				throw error
			})
		event.returnValue = {
			success: true,
			totalAppointments,
			totalPatients,
			todayAppointments,
			totalAppointmentsCancel,
			totalAppointmentsFinish,
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		}
	}
}

module.exports = {
	getAppointmentsDashboard,
	getCountDataDashboard,
}
