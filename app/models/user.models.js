const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
	{
		user_name: {
			type: String,
			required: [ true, 'El nombre es requerido.' ],
		},
		user_email: {
			type: String,
			trim: true,
			lowercase: true,
			required: [ true, 'El correo es requerido.' ],
			unique: true,
		},
		user_phone: {
			type: String,
		},
		user_password: { type: String, required: [ true, 'La contraseña es requerida.' ] },
		user_role: {
			type: String,
			enum: {
				values: [ 'secretary', 'doctor', 'master-chief' ],
				message: 'Seleccione un rol valido.',
			},
			required: 'El rol es requerido.',
		},
		user_state: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
)

userSchema.pre('save', async function(next){
	if (!this.isModified('user_password')) return next()
	try {
		const salt = await bcrypt.genSalt(10)
		this.user_password = await bcrypt.hash(this.user_password, salt)
		return next()
	} catch (error) {
		return next(error)
	}
})

userSchema.methods.matchPassword = async function(password){
	return await bcrypt.compare(password, this.user_password)
}

module.exports = model('User', userSchema)
