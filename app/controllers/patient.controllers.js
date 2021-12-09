const Patient = require('../models/patient.models')

const getAllPatients = async (event, args) => {
	try {
		const { limit, currentPage, patient_name, sortBy, asc } = args
		if (patient_name) {
			const patients = await Patient.find({
				patient_name: {
					$regex: '.*' + patient_name + '*.',
				},
			})
				.lean()
				.limit(limit * 1)
				.skip((currentPage - 1) * limit)
				.exec()
			const totalPatients = await Patient.countDocuments().catch(error => {
				throw error
			})
			event.returnValue = {
				success: true,
				patients: JSON.stringify(patients),
				totalPatients,
				totalPage: Math.ceil(totalPatients / limit),
				currentPage: currentPage,
			}
		}
		else {
			const patients = await Patient.find()
				.lean()
				.limit(limit * 1)
				.skip((currentPage - 1) * limit)
				.sort({
					[sortBy]: asc ? 1 : -1,
				})
				.exec()
			const totalPatients = await Patient.countDocuments().catch(error => {
				throw error
			})
			event.returnValue = {
				success: true,
				patients: JSON.stringify(patients),
				totalPatients,
				totalPage: Math.ceil(totalPatients / limit),
				currentPage: currentPage,
			}
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
		const savePatient = await newPatient.save()
		console.log(savePatient)
		event.returnValue = {
			success: true,
			patien: JSON.stringify(savePatient),
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

const findPatientByName = async (event, args) => {
	try {
		const { patient_name } = args
		const patients = await Patient.find({
			patient_name: {
				$regex: '.*' + patient_name + '*.',
			},
		}).exec()
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

module.exports = {
	getAllPatients,
	createPatient,
	getPatient,
	modifyAllergy,
	findPatientByName,
}
