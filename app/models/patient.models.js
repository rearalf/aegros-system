const { Schema, model } = require('mongoose')

const patientSchema = new Schema(
	{
		patient_name: {
			type: String,
			required: [ true, 'El nombre del paciente es requerido.' ],
		},
		patient_email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		patient_allergies: {
			type: String,
		},
		patient_gender: {
			type: String,
			required: true,
			required: [ true, 'El sexo del paciente es requerido.' ],
		},
		patient_date_birth: {
			type: Date,
			required: true,
			required: [ true, 'La fehca de nacimiento del paciente es requerida.' ],
		},
		patient_phone_number: {
			type: String,
			validate: {
				validator: phone => {
					return /\d{4}-\d{4}/.test(phone)
				},
				message: props => `${props.value} is not a valid phone number!`,
			},
		},
		patient_weight: {
			type: Number,
		},
		patient_height: {
			type: Number,
		},
		patient_state: {
			type: Boolean,
			default: true,
		},
		appointments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Appointment',
			},
		],
	},
	{
		timestamps: true,
	},
)

module.exports = model('Patient', patientSchema)
