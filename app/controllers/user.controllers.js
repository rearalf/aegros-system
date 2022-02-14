const userModels = require('../models/user.models')

const getUsers = async (event, agrs) => {
	try {
		const users = await userModels.find()
		event.returnValue = {
			success: true,
			users: JSON.stringify(users),
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error_message: error.message,
			error_code: error.code,
			error: error,
		}
	}
}

const validateEmptyDatabase = async event => {
	try {
		const totalUsers = await userModels.countDocuments()
		event.returnValue = {
			success: true,
			totalUsers,
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error_message: error.message,
			error_code: error.code,
			error: error,
		}
	}
}

const signInUser = async (event, args) => {
	try {
		const { user_email, user_password } = args
		const user = await userModels.findOne({ user_email }).exec()
		const success = true
		if (!user)
			event.returnValue = {
				success,
				userFind: 0,
			}
		const match = await user.matchPassword(user_password)
		if (match) {
			event.returnValue = {
				success,
				userFind: 2,
				user: JSON.stringify(user),
			}
		}
		else {
			event.returnValue = {
				success,
				userFind: 1,
			}
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error_message: error.message,
			error_code: error.code,
			error: error,
		}
	}
}

const createUser = async (event, args) => {
	try {
		const newUser = await new userModels(args)
		const saveUser = await newUser.save()
		event.returnValue = {
			success: true,
			user: JSON.stringify(saveUser),
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
			error: error,
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
	getUsers,
	validateEmptyDatabase,
	createUser,
	signInUser,
}
