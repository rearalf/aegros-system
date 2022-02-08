const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
	{
		user_name: {
			type: String,
			required: true,
		},
		user_email: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		user_phone: {
			type: String,
			validate: {
				validator: phone => {
					return /\d{4}-\d{4}/.test(phone)
				},
				message: props => `${props.value} is not a valid phone number!`,
			},
		},
		user_password: { type: String, required: true },
		user_role: {
			type: String,
			enum: [ 'secretary', 'doctor', 'master-chief' ],
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

module.exports = model('User', userSchema)

/* https://stackoverflow.com/questions/14588032/mongoose-password-hashing */
