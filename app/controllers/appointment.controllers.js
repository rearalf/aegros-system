const Appointment = require('../models/appointment.models')

const getAllappointments = async event => {
	try {
		const appointmets = await Appointment.find().lean()
		event.returnValue = {
			success: true,
			appointmets,
		}
	} catch (err) {
		console.log(err)
		event.returnValue = {
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		}
	}
}

const createAppointment = async (event, args) => {
	try {
		const newAppointment = await new Appointment(args)
		const saveAppointment = await newAppointment.save()
		console.log(saveAppointment)
		event.returnValue = {
			success: true,
			newAppointment,
		}
	} catch (err) {
		console.log(err)
		event.returnValue = {
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		}
	}
}

module.exports = {
	getAllappointments,
	createAppointment,
}
