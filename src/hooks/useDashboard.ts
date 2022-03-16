import { useContext, useEffect, useState } from 'react'
import { getNext12MonthNamesWithYear } from '../utils/Utils'
import { formatDate } from '../utils/FormatDate'
import NotificationContext from '../context/NotificationContext'

function useDashboard(){
	const { setNotification } = useContext(NotificationContext)
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
	const [ daysAppointments, setDaysAppointments ] = useState<any[]>([])
	const [ appointments, setAppointments ] = useState<any[]>([])
	const [ loading, setLoading ] = useState(true)
	const [ dataBarChart, setDataBarChart ] = useState({
		labels: getNext12MonthNamesWithYear(),
		datasets: [
			{
				label: 'Citas por mes',
				data: getNext12MonthNamesWithYear(),
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
			const result = await window.ipcRenderer.sendSync('get-count-data-dashboard-main')
			if (!result.success) {
				console.log(result.error)
				throw { message: 'Ocurrio un error con los datos' }
			}
			const {
				totalAppointments,
				totalPatients,
				todayAppointments,
				totalAppointmentsCancel,
				totalAppointmentsFinish,
				appointmentsByMonth,
			} = result
			formatAppointmentsByMonth(appointmentsByMonth.data)
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
			const { message } = error as Error
			setDataCount({
				...dataCount,
				loadingDataCount: false,
			})
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const getAppointments = async (value?: string) => {
		try {
			const result = await window.ipcRenderer
				.invoke('get-appointments-dashboard-main', {
					dateYear: new Date().getFullYear(),
					dateMonth: new Date().getMonth(),
					dateDay: new Date().getDate(),
					params: value === undefined ? variantSelect : value,
				})
				.then(result => result)
			if (!result.success) {
				console.log(result)
				throw { message: 'Ocurrio un problema.' }
			}
			formatAppointments(JSON.parse(result.appointments))
			setLoading(false)
		} catch (error) {
			const { message } = error as Error
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: message,
				typeNotification: 'error',
			})
		}
	}

	const formatAppointments = (appointments: []) => {
		if (appointments.length) {
			if (variantSelect === 'Day') {
				const result: any[] = appointments.map(data => {
					const { appointment_date, appointment_state, _id, patient } = data
					const { patient_name } = patient
					const format_appointment_date = formatDate({
						date: appointment_date,
						formatDate: 'h:m bbbb',
					})
					return {
						format_appointment_date,
						appointment_state,
						appointment_date,
						patient_name,
						_id,
					}
				})
				setAppointments(result)
			}
			if (variantSelect === 'Week') {
				const dayAppointments: any[] = []
				const result: any[] = []
				appointments.forEach(data => {
					const { appointment_date, appointment_state, _id, patient } = data
					const { patient_name } = patient
					const format_appointment_date = formatDate({
						date: appointment_date,
						formatDate: 'h:m bbbb',
					})
					const format_day_appointment_date = formatDate({
						date: appointment_date,
						formatDate: 'h:m bbbb',
					})
					let indexValue = dayAppointments.indexOf(format_day_appointment_date)
					if (indexValue === -1) {
						dayAppointments.push(format_day_appointment_date)
					}
					result.push({
						format_day_appointment_date,
						format_appointment_date,
						appointment_state,
						appointment_date,
						patient_name,
						_id,
					})
				})
				setDaysAppointments(dayAppointments)
				setAppointments(result)
			}
			if (variantSelect === 'Month') {
				let dayAppointments: any[] = []
				let result: any[] = []
				appointments.forEach(data => {
					const { appointment_date, appointment_state, _id, patient } = data
					const { patient_name } = patient
					const format_appointment_date = formatDate({
						date: appointment_date,
						formatDate: 'EEEE dd',
					})
					const format_day_appointment_date = formatDate({
						date: appointment_date,
						formatDate: 'h:m bbbb',
					})
					let indexValue = dayAppointments.indexOf(format_day_appointment_date)
					if (indexValue === -1) {
						dayAppointments.push(format_day_appointment_date)
					}
					result.push({
						format_day_appointment_date,
						format_appointment_date,
						appointment_state,
						appointment_date,
						patient_name,
						_id,
					})
				})
				setAppointments(result)
				setDaysAppointments(dayAppointments)
			}
		}
	}

	interface objectInterface {
		name: string
		number: number
	}
	const formatAppointmentsByMonth = (data: {}) => {
		const numbers: number[] = Object.values(data)
		const names = Object.getOwnPropertyNames(data)
		const counts: objectInterface[] = []
		names.map((name, i) => {
			let object = {
				name,
				number: numbers[i],
			}
			counts.push(object)
		})
		const namesSort = counts.map(count => count.name)
		const numberSort = counts.map(count => count.number.toString())
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

	const handleChangeVariantSelect = (value: string) => setVariantSelect(value)

	useEffect(() => {
		setDataUser(
			sessionStorage.getItem('user')
				? JSON.parse(`${sessionStorage.getItem('user')}`).user_name
				: '',
		)
		setTimeout(() => getCountDataDashboard(), 500)
		window.ipcRenderer.setMaxListeners(75)
	}, [])

	useEffect(
		() => {
			setLoading(true)
			setTimeout(() => getAppointments(), 1000)
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
