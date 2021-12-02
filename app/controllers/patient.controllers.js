const { Mongoose } = require('mongoose')
const Patient = require('../models/patientModels')

const getAllPatients = async (event, args) => {
	try {
		const patients = await Patient.find().lean()
		event.returnValue = {
			success: true,
			patients: JSON.stringify(patients),
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

const createPatient = async (event, args) => {
	try {
		const newPatient = await new Patient(args)
		const SavePatient = await newPatient.save()
		console.log(SavePatient)
		event.returnValue = {
			success: true,
			patien: newPatient,
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

const getPatient = async (event, args) => {
	try {
		const patient = await Patient.findById(args.id).lean().exec()
		console.log(patient)
		event.returnValue = {
			success: true,
			patient,
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

const modifyAllergy = async (event, args) => {
	try {
		const { id, patient_allergies } = args
		const patient = await Patient.findByIdAndUpdate(id, {
			patient_allergies,
		})
		event.returnValue = {
			success: true,
			patient,
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
	getAllPatients,
	createPatient,
	getPatient,
	modifyAllergy,
}
