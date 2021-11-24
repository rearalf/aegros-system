const { Schema, model } = require('mongoose')

const patientSchema = new Schema(
	{
		patient_name: {
			type: String,
			required: true,
		},
		patient_email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
		},
		patient_allergies: {
			type: String,
		},
		patient_gender: {
			type: String,
			required: true,
		},
		patient_date_birth: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

module.exports = model('patient', patientSchema)
