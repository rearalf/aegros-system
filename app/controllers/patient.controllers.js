const Patient = require('../models/patientModels')

const getAllPatients = async (event, args) => {
	try {
		const patient = await Patient.find()
		return patient
	} catch (err) {
		console.log(err)
	}
}

const createPatient = async (event, args) => {
	try {
		const newPatient = await new Patient(args)
		const SavePatient = await newPatient.save()
		console.log(SavePatient)
		event.returnValue = JSON.stringify({
			success: true,
			patien: newPatient,
		})
	} catch (err) {
		console.log(err)
		event.returnValue = JSON.stringify({
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		})
	}
}

module.exports = {
	getAllPatients,
	createPatient,
}