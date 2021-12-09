const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema(
	{
		/* appointment_patient: {
			patient_name: {
				type: String,
			},
			patient_id: {
				type: String,
				required: [ true, 'Ocurrio un problema con el paciente al crear la fecha' ],
			},
		}, */
		appointment_patient: {
			type: Schema.Types.ObjectId,
			ref: 'patient',
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

module.exports = model('appointment', appointmentSchema)
