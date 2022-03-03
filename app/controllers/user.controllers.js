const userModels = require('../models/user.models')

const getUsers = async (event, args) => {
	try {
		const { limit, currentPage, user_name, sortBy, asc } = args
		if (user_name) {
			const users = await userModels
				.find({
					user_name: {
						$regex: '.*' + user_name + '*.',
					},
				})
				.lean()
				.limit(limit)
				.skip((currentPage - 1) * limit)
				.sort({
					[sortBy]: asc ? 1 : -1,
				})
			const totalUser = await userModels.countDocuments().catch(error => {
				throw error
			})
			event.returnValue = {
				success: true,
				users: JSON.stringify(users),
				totalUser,
				totalPages: Math.ceil(totalUser / limit),
				currentPage,
			}
		}
		const users = await userModels
			.find()
			.lean()
			.limit(limit * 1)
			.skip((currentPage - 1) * limit)
			.sort({
				[sortBy]: asc ? 1 : -1,
			})
		const totalUser = await userModels.countDocuments().catch(error => {
			throw error
		})
		event.returnValue = {
			success: true,
			users: JSON.stringify(users),
			totalUser,
			totalPages: Math.ceil(totalUser / limit),
			currentPage,
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
		if (!user) {
			event.returnValue = {
				success,
				userFind: 0,
			}
		}
		else {
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

const getUser = async (event, args) => {
	try {
		const { id } = args
		const user = await userModels.findById(id).lean()
		event.returnValue = {
			success: true,
			user: JSON.stringify(user),
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

const updateUser = async (event, args) => {
	try {
		const { id, data } = args
		const user = await userModels
			.findByIdAndUpdate(id, data, {
				returnOriginal: false,
			})
			.exec()
		event.returnValue = {
			success: true,
			user: JSON.stringify(user),
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

const changePassword = async (event, args) => {
	try {
		const { id, current_password, new_password } = args
		const user = await userModels.findById(id)
		if (user) {
			const validCurrentPassword = await user.matchPassword(current_password)
			if (validCurrentPassword) {
				const user_password = await user.hashPassword(new_password)
				const updateUser = await userModels
					.findByIdAndUpdate(
						id,
						{
							user_password,
						},
						{ returnOriginal: false },
					)
					.exec()
				event.returnValue = {
					success: true,
					userFind: 2,
					user: JSON.stringify(updateUser),
				}
			}
			event.returnValue = {
				success: true,
				userFind: 1,
			}
		}
		event.returnValue = {
			success: true,
			userFind: 0,
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
	getUser,
	validateEmptyDatabase,
	createUser,
	signInUser,
	updateUser,
	changePassword,
}
