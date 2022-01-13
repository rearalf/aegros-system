const Appointment = require('../models/appointment.models')
const Patient = require('../models/patient.models')
require('events').EventEmitter.defaultMaxListeners = Infinity

const getAllappointments = async event => {
	try {
		const appointments = await Appointment.find().lean().populate('patient')
		event.returnValue = {
			success: true,
			appointments: JSON.stringify(appointments),
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

const getAppointment = async (event, args) => {
	try {
		const { id } = args
		const appointment = await Appointment.findById(id)
		const patient = await Patient.findById(appointment.patient).populate('appointments')
		event.returnValue = {
			success: true,
			appointment: JSON.stringify(appointment),
			patient: JSON.stringify(patient),
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error_message: error.message,
			error_code: error.code,
			error: error,
		}
	}
}

const findPatientByName = async (event, args) => {
	try {
		const { patient_name } = args
		const patients = await Patient.find({
			patient_state: true,
			patient_name: {
				$regex: '.*' + patient_name + '*.',
			},
		})
			.limit(5)
			.lean()
			.exec()
		event.returnValue = {
			success: true,
			patients: JSON.stringify(patients),
		}
	} catch (error) {
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
		const { patient_id, appointment_date, appointment_reason } = args
		const patient = await Patient.findById(patient_id)
		if (!patient) {
			throw {
				message: 'No existe el paciente',
			}
		}
		const newAppointment = await new Appointment({
			appointment_date,
			appointment_reason,
			patient: patient._id,
		})
		const saveAppointment = await newAppointment.save()
		patient.appointments = patient.appointments.concat(saveAppointment._id)
		const savePatient = await patient.save()
		event.reply('create-appointment-reply', {
			success: true,
			appointment: JSON.stringify(saveAppointment),
			patient: JSON.stringify(savePatient),
		})
	} catch (err) {
		console.log(err)
		event.reply('create-appointment-reply', {
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		})
	}
}

module.exports = {
	getAllappointments,
	createAppointment,
	findPatientByName,
	getAppointment,
}
