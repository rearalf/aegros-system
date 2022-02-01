import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'
import format from 'date-fns/format'
import esLocale from 'date-fns/locale/es'

function useDashboard(){
	const { setNotification } = useContext(notificationContext)
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
			} = result
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

	const handleChangeVariantSelect = value => setVariantSelect(value)

	useEffect(() => {
		setTimeout(() => {
			getCountDataDashboard()
		}, 500)
		ipcRenderer.setMaxListeners(50)
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
		dataCount,
		variantSelect,
		appointments,
		daysAppointments,
		loading,
		handleChangeVariantSelect,
	}
}

export default useDashboard
