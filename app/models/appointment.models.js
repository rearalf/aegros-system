const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: 'Patient',
		},
		appointment_date: {
			type: Date,
			required: true,
			required: [ true, 'La fecha de la cita es requerida.' ],
		},
		appointment_reason: {
			type: String,
		},
		appointment_observation: {
			type: String,
		},
		appointment_state: {
			type: String,
			enum: [ 'Activa', 'Inactiva', 'Cancelada' ],
			default: 'Activa',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = model('Appointment', appointmentSchema)
