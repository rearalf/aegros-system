import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import format from 'date-fns/format'
import esLocale from 'date-fns/locale/es'

function useDashboard(){
	const { setNotification } = useContext(notificationContext)
	const [ dataUser, setDataUser ] = useState()
	const [ dataCount, setDataCount ] = useState({
		totalAppointments: 0,
		totalPatients: 0,
		todayAppointments: 0,
		totalAppointmentsCancel: 0,
		totalAppointmentsFinish: 0,
		loadingDataCount: true,
	})
	const [ variantSelect, setVariantSelect ] = useState('Day')
	const [ daysAppointments, setDaysAppointments ] = useState([])
	const [ appointments, setAppointments ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ dataBarChart, setDataBarChart ] = useState({
		labels: [],
		datasets: [
			{
				label: 'Citas por mes',
				data: [],
				borderColor: 'rgb(12, 98, 218)',
				backgroundColor: 'rgba(12, 98, 218,.5)',
				borderWidth: 1,
				barPercentage: 1,
				hoverBackgroundColor: 'rgb(12 98 218)',
			},
		],
	})
	const optionsChartLine = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: false,
			},
		},
		scale: {
			ticks: {
				precision: 0,
			},
		},
	}

	const getCountDataDashboard = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-count-data-dashboard-main')
			if (!result.success) {
				console.log(error)
				throw 'Ocurrio un error con los datos'
			}
			const {
				totalAppointments,
				totalPatients,
				todayAppointments,
				totalAppointmentsCancel,
				totalAppointmentsFinish,
				appointmentsByMonth,
			} = result
			formatAppointmentsByMonth(appointmentsByMonth)
			setDataCount({
				...dataCount,
				totalAppointments,
				totalPatients,
				todayAppointments,
				totalAppointmentsCancel,
				totalAppointmentsFinish,
				loadingDataCount: false,
			})
		} catch (error) {
			setDataCount({
				...dataCount,
				loadingDataCount: false,
			})
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const getAppointments = async value => {
		try {
			const result = await ipcRenderer
				.invoke('get-appointments-dashboard-main', {
					dateYear: new Date().getFullYear(),
					dateMonth: new Date().getMonth(),
					dateDay: new Date().getDate(),
					params: value === undefined ? variantSelect : value,
				})
				.then(result => result)
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un problema.'
			}
			const result_appointments = formatAppointments(JSON.parse(result.appointments))
			setAppointments(result_appointments)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const formatAppointments = appointments => {
		if (appointments.length) {
			if (variantSelect === 'Day') {
				return appointments.map(data => {
					const { appointment_date, appointment_state, _id, patient } = data
					const { patient_name } = patient
					const format_appointment_date = format(new Date(appointment_date), 'h:m bbbb', {
						locale: esLocale,
					})
					return {
						format_appointment_date,
						appointment_state,
						appointment_date,
						_id,
						patient_name,
					}
				})
			}
			if (variantSelect === 'Week') {
				let dayAppointments = []
				let result = []
				appointments.forEach(data => {
					const { appointment_date, appointment_state, _id, patient } = data
					const { patient_name } = patient
					const format_appointment_date = format(new Date(appointment_date), 'h:m bbbb', {
						locale: esLocale,
					})
					const format_day_appointment_date = format(
						new Date(appointment_date),
						'EEEE dd',
						{
							locale: esLocale,
						},
					)
					let indexValue = dayAppointments.indexOf(format_day_appointment_date)
					if (indexValue === -1) {
						dayAppointments.push(format_day_appointment_date)
					}
					result.push({
						format_day_appointment_date,
						format_appointment_date,
						patient_name,
						appointment_state,
						appointment_date,
						_id,
					})
				})
				setDaysAppointments(dayAppointments)
				return result
			}
			if (variantSelect === 'Month') {
				let dayAppointments = []
				let result = []
				appointments.forEach(data => {
					const { appointment_date, appointment_state, _id, patient } = data
					const { patient_name } = patient
					const format_appointment_date = format(new Date(appointment_date), 'h:m bbbb', {
						locale: esLocale,
					})
					const format_day_appointment_date = format(
						new Date(appointment_date),
						'EEEE dd',
						{
							locale: esLocale,
						},
					)
					let indexValue = dayAppointments.indexOf(format_day_appointment_date)
					if (indexValue === -1) {
						dayAppointments.push(format_day_appointment_date)
					}
					result.push({
						format_day_appointment_date,
						format_appointment_date,
						patient_name,
						appointment_date,
						appointment_state,
						_id,
					})
				})
				setDaysAppointments(dayAppointments)
				return result
			}
		}
		return []
	}

	const formatAppointmentsByMonth = value => {
		const { data } = value
		if (data !== {}) {
			const numbers = Object.values(data)
			const names = Object.getOwnPropertyNames(data)
			const counts = []
			names.map((name, i) => {
				let object = {}
				object.name = name
				object.number = numbers[i]
				counts.push(object)
			})
			const namesSort = counts.map(count => count.name)
			const numberSort = counts.map(count => count.number)
			setDataBarChart({
				...dataBarChart,
				labels: namesSort,
				datasets: [
					{
						label: 'Citas por mes',
						data: numberSort,
						borderColor: 'rgb(12, 98, 218)',
						backgroundColor: 'rgba(12, 98, 218,.5)',
						borderWidth: 1,
						barPercentage: 1,
						hoverBackgroundColor: 'rgb(12 98 218)',
					},
				],
			})
		}
		return null
	}

	const handleChangeVariantSelect = value => setVariantSelect(value)

	useEffect(() => {
		setTimeout(() => {
			getCountDataDashboard()
		}, 500)
		ipcRenderer.setMaxListeners(50)
		if (sessionStorage.getItem('user') === null) navigate('/')
		setDataUser(
			sessionStorage.getItem('user')
				? JSON.parse(sessionStorage.getItem('user')).user_name
				: '',
		)
	}, [])

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => {
				getAppointments()
			}, 1000)
		},
		[ variantSelect ],
	)

	return {
		dataUser,
		dataCount,
		variantSelect,
		appointments,
		daysAppointments,
		dataBarChart,
		optionsChartLine,
		loading,
		handleChangeVariantSelect,
	}
}

export default useDashboard
