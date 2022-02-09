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
			error_message: err.message,
			error_code: err.code,
			error: err,
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
			error_message: err.message,
			error_code: err.code,
			error: err,
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
			error_message: err.message,
			error_code: err.code,
			error: err,
		}
	}
}

const createUser = async (event, args) => {
	try {
		const newUser = await new userModels(args)
		const saveUser = await newUser.save()
		event.returnValue = {
			success: true,
			saveUser: JSON.stringify(saveUser),
		}
	} catch (error) {
		console.log(error)
		event.returnValue = {
			success: false,
			error_message: err.message,
			error_code: err.code,
			error: err,
		}
	}
}

module.exports = {
	getUsers,
	validateEmptyDatabase,
	createUser,
	signInUser,
}
