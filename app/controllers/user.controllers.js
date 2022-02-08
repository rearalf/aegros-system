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
}
