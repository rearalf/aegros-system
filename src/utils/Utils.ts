function stringToColor(string: string){
	let hash = 0,
		color = '#'
	/* eslint-disable no-bitwise */
	for (let i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}
	for (let i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.substr(-2)
	}
	/* eslint-enable no-bitwise */
	return color
}

export function stringAvatar(name: string){
	if (name === undefined) return
	if (name.length === 0) return
	const NameSplit: string | undefined = nameSplit(name)
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children:
			NameSplit === undefined
				? `NN`
				: `${NameSplit.split(' ')[0][0]}${NameSplit.split(' ')[1][0]}`,
	}
}

export function nameSplit(name: string){
	if (name === undefined) return ''
	if (name.length === 0) return ''
	const nameSplit: string | string[] = name.split(' ')
	if (nameSplit.length === 4 || nameSplit.length === 3) {
		return `${nameSplit[0]} ${nameSplit[2]}`
	}
	else {
		return `${nameSplit[0]} ${nameSplit[1]}`
	}
}

export function validateEmails(email: string){
	const email_reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email_reg.test(email)) {
		return true
	}
	else {
		return false
	}
}

export function capitlizeString(word: string){
	let wordSeparation: string | string[] = word.split(' ')
	wordSeparation = wordSeparation.map(word => {
		const firstletter = word.charAt(0).toUpperCase()
		word = firstletter.concat(word.slice(1, word.length))
		return word
	})
	wordSeparation = wordSeparation.join(' ')
	return wordSeparation
}

export function getNext12MonthNamesWithYear(){
	const MONTHS = []
	const NOW = new Date()
	const MONTHS_ARRAY = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	]
	NOW.setDate(1)
	for (let i = 0; i <= 12; i++) {
		MONTHS.push(MONTHS_ARRAY[NOW.getMonth()] + '-' + NOW.getFullYear())
		NOW.setMonth(NOW.getMonth() - 1)
	}
	return MONTHS
}

export function roundDate(){
	let minutes = new Date().getMinutes()
	if (minutes < 30 && minutes > 0) {
		minutes = 0
	}
	else {
		minutes = 30
	}
	const date = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
		new Date().getHours(),
		minutes,
	)
	return date
}

export function passwordValidation(password: string){
	const valid = {
		uppercase: false,
		lowercase: false,
		num: false,
		char: false,
		more8: false,
	}
	password.match(/[A-Z]/) !== null ? (valid.uppercase = true) : (valid.uppercase = false)
	password.match(/[a-z]/) !== null ? (valid.lowercase = true) : (valid.lowercase = false)
	password.match(/[0-9]/) !== null ? (valid.num = true) : (valid.num = false)
	password.match(/[!@#$%^&*]/) !== null ? (valid.char = true) : (valid.char = false)
	password.length >= 8 ? (valid.more8 = true) : (valid.more8 = false)

	return valid
}

export function getAge(patient_date_birth: number){
	const date_birth: any = new Date(patient_date_birth)
	const today: any = new Date()
	return Math.round((today - date_birth) / (1000 * 60 * 60 * 24 * 365))
}

export function getRole(role: string){
	return role === 'master-chief' ? 'Master Chief' : role === 'secretary' ? 'Secretaria' : 'Doctor'
}
