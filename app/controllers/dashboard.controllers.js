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
		const FIRST_MONTH = 1
		const LAST_MONTH = 12
		const TODAY = new Date()
		const LAST_DAY = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0, 23)
		const YEAR_BEFORE = new Date(TODAY.getFullYear() - 1, TODAY.getMonth(), 1, 1)
		const MONTHS_ARRAY = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		]
		const appointmentsByMonth = await appointmentModels
			.aggregate([
				{
					$match: {
						createdAt: {
							$gte: YEAR_BEFORE,
							$lte: LAST_DAY,
						},
					},
				},
				{
					$group: {
						_id: {
							year: { $year: '$createdAt' },
							month: { $month: '$createdAt' },
						},
						count: {
							$sum: 1,
						},
					},
				},
				{
					$sort: { '_id.year': 1 },
				},
				{
					$project: {
						_id: 0,
						count: 1,
						month_year: {
							$concat: [
								{
									$arrayElemAt: [
										MONTHS_ARRAY,
										{ $subtract: [ { $toInt: '$_id.month' }, 1 ] },
									],
								},
								'-',
								{ $toString: '$_id.year' },
							],
						},
					},
				},
				{
					$group: {
						_id: null,
						data: { $push: { k: '$month_year', v: '$count' } },
					},
				},
				{
					$addFields: {
						start_year: { $substrCP: [ YEAR_BEFORE, 0, 4 ] },
						end_year: { $substrCP: [ TODAY, 0, 4 ] },
						months1: {
							$range: [
								{ $toInt: { $substrCP: [ YEAR_BEFORE, 5, 2 ] } },
								{ $add: [ LAST_MONTH, 1 ] },
							],
						},
						months2: {
							$range: [
								FIRST_MONTH,
								{ $add: [ { $toInt: { $substrCP: [ TODAY, 5, 2 ] } }, 1 ] },
							],
						},
					},
				},
				{
					$addFields: {
						template_data: {
							$concatArrays: [
								{
									$map: {
										input: '$months1',
										as: 'm1',
										in: {
											count: 0,
											month_year: {
												$concat: [
													{
														$arrayElemAt: [
															MONTHS_ARRAY,
															{ $subtract: [ '$$m1', 1 ] },
														],
													},
													'-',
													'$start_year',
												],
											},
										},
									},
								},
								{
									$map: {
										input: '$months2',
										as: 'm2',
										in: {
											count: 0,
											month_year: {
												$concat: [
													{
														$arrayElemAt: [
															MONTHS_ARRAY,
															{ $subtract: [ '$$m2', 1 ] },
														],
													},
													'-',
													'$end_year',
												],
											},
										},
									},
								},
							],
						},
					},
				},
				{
					$addFields: {
						data: {
							$map: {
								input: '$template_data',
								as: 't',
								in: {
									k: '$$t.month_year',
									v: {
										$reduce: {
											input: '$data',
											initialValue: 0,
											in: {
												$cond: [
													{ $eq: [ '$$t.month_year', '$$this.k' ] },
													{ $add: [ '$$this.v', '$$value' ] },
													{ $add: [ 0, '$$value' ] },
												],
											},
										},
									},
								},
							},
						},
					},
				},
				{
					$project: {
						data: { $arrayToObject: '$data' },
						_id: 0,
					},
				},
			])
			.catch(error => {
				console.log(error)
			})
		event.returnValue = {
			success: true,
			totalAppointments,
			totalPatients,
			todayAppointments,
			totalAppointmentsCancel,
			totalAppointmentsFinish,
			appointmentsByMonth: appointmentsByMonth[0],
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
