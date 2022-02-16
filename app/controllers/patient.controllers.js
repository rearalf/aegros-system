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
		const patients = await Patient.find({ patient_state: true })
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
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error: error,
		}
	}
}

const createPatient = async (event, args) => {
	try {
		const newPatient = await new Patient(args)
		const savePatient = await newPatient.save()
		event.returnValue = {
			success: true,
			patient: JSON.stringify(savePatient),
		}
	} catch (error) {
		console.log(error)
		if (error.errors !== undefined) {
			const err = getErrorValue(error.errors)
			event.returnValue = {
				success: false,
				errorsMessage: err.errorsMessage,
				errorFields: err.errorFields,
			}
		}
		if (error.code !== undefined) {
			const err = getErrorCode(error)
			event.returnValue = {
				success: false,
				errorsMessage: err.errorsMessage,
				errorFields: err.errorFields,
			}
		}
		event.returnValue = {
			success: false,
			error,
		}
	}
}

const getPatient = async (event, args) => {
	try {
		const { id } = args
		const patient = await Patient.findById({ _id: id }).lean().populate('appointments')
		event.returnValue = {
			success: true,
			patient_result: JSON.stringify(patient),
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error,
		}
	}
}

const modifyAllergy = async (event, args) => {
	try {
		const { id, patient_allergies } = args
		await Patient.findByIdAndUpdate(id, {
			patient_allergies,
		}).exec()
		event.returnValue = {
			success: true,
		}
	} catch (error) {
		console.log(error)
		if (error.code !== undefined) {
			const err = getErrorCode(error)
			event.returnValue = {
				success: false,
				errorsMessage: err.errorsMessage,
				errorFields: err.errorFields,
			}
		}
		event.returnValue = {
			success: false,
			error,
		}
	}
}

const updatePatient = async (event, args) => {
	try {
		const { id, updates } = args
		const patient = await Patient.findByIdAndUpdate(id, updates, {
			returnOriginal: false,
		}).exec()
		event.returnValue = {
			success: true,
			patient: JSON.stringify(patient),
		}
	} catch (error) {
		console.log(error)
		if (error.errors !== undefined) {
			const err = getErrorValue(error.errors)
			event.returnValue = {
				success: false,
				errorsMessage: err.errorsMessage,
				errorFields: err.errorFields,
			}
		}
		if (error.code !== undefined) {
			const err = getErrorCode(error)
			event.returnValue = {
				success: false,
				errorsMessage: err.errorsMessage,
				errorFields: err.errorFields,
			}
		}
		event.returnValue = {
			success: false,
			error,
		}
	}
}

const deletePatient = async (event, args) => {
	try {
		const { id, patient_state } = args
		const patient = await Patient.findByIdAndUpdate(
			id,
			{
				patient_state,
			},
			{
				returnOriginal: false,
			},
		)
		event.returnValue = {
			success: true,
			patient: JSON.stringify(patient),
		}
	} catch (error) {
		console.log(error)
		if (error.code !== undefined) {
			const err = getErrorCode(error)
			event.returnValue = {
				success: false,
				errorsMessage: err.errorsMessage,
				errorFields: err.errorFields,
			}
		}
		event.returnValue = {
			success: false,
			error,
		}
	}
}

const getErrorValue = error => {
	let message = Object.values(error).map(el => el.message)
	let fields = Object.getOwnPropertyNames(error).map(el => el)
	return {
		errorsMessage: message[0],
		errorFields: fields[0],
	}
}

const getErrorCode = error => {
	const code = error.code
	let errorsMessage = ''
	let errorFields = ''
	if (code === 11000) {
		const keyValue = error.keyValue
		const value = Object.values(keyValue)[0]
		let fields = Object.getOwnPropertyNames(error).map(el => el)
		errorsMessage = `El correo ${value} ya existe.`
		errorFields = fields
	}
	else {
		errorsMessage = 'Ocurrio un error.'
	}
	return { errorsMessage, errorFields }
}

module.exports = {
	getAllPatients,
	createPatient,
	getPatient,
	modifyAllergy,
	updatePatient,
	deletePatient,
}
