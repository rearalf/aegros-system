const userModels = require('../models/user.models')

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
	createUser,
}
