import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { format, formatDistanceToNow } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import notificationContext from '@context/notificationContext'

function useAppointments(){
	const { setNotification } = useContext(notificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ appointments, setAppointments ] = useState([])
	const [ appointmnetSearch, setAppointmentSearch ] = useState({
		patient_search: '',
		show_search_form: false,
	})
	const [ pagesAndLimit, setPagesAndLimit ] = useState({
		currentPage: 1,
		limit: 10,
		totalAppointments: 0,
		totalPages: 0,
		sortBy: 'createdAt',
		sortStatus: 'Todas',
		asc: false,
		loadingSort: true,
	})

	const getAllAppointment = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-all-appointment-main', pagesAndLimit)
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const appointments_result = JSON.parse(result.appointments)
			const result_format = formatAppointmet(appointments_result)
			setAppointments(result_format)
			setPagesAndLimit({
				...pagesAndLimit,
				totalAppointments: result.totalAppointments,
				totalPages: result.totalPages,
				currentPage: result.currentPage,
				loadingSort: true,
			})
			setLoading(true)
		} catch (error) {
			setLoading(true)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
		ipcRenderer.removeAllListeners('get-all-appointment-main')
	}

	const formatAppointmet = appointments => {
		if (appointments.length > 0) {
			const result = appointments.map(data => {
				const { appointment_date, appointment_state, createdAt, patient, _id } = data
				const format_appointment_date = format(
					new Date(appointment_date),
					'dd / MMMM / yyyy - h:m bbbb',
					{
						locale: esLocale,
					},
				)
				const format_created = format(new Date(createdAt), 'dd / MMMM / yyyy', {
					locale: esLocale,
				})
				return {
					_id,
					appointment_state,
					format_appointment_date,
					format_created,
					patient_name: patient.patient_name,
					patient_id: patient._id,
				}
			})
			return result
		}
		return appointments
	}

	const handleChangeInput = e =>
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: e.target.value,
		})

	const handleChangeStateShowSearch = () => {
		setAppointmentSearch({
			...appointmnetSearch,
			show_search_form: !appointmnetSearch.show_search_form,
		})
	}

	const handleResetSearchAppointment = () => {
		getAllAppointment()
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: '',
			appointments_founds: [],
			show_search_form: !appointmnetSearch.show_search_form,
		})
	}

	const handleSearchAppointmets = async e => {
		try {
			setLoading(false)
			e.preventDefault()
			if (appointmnetSearch.patient_search.length < 5) {
				throw {
					message: 'Debe de agregar más información.',
					type: 'information',
					title: 'Información',
				}
			}
			const result = await ipcRenderer.sendSync('get-all-appointment-main', {
				limit: 10,
				currentPage: 1,
				patient_name: appointmnetSearch.patient_search,
			})
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error al buscar.',
				}
			}
			const result_format = formatAppointmet(JSON.parse(result.appointments))
			if (result_format === null) {
				setNotification({
					isOpenNotification: true,
					titleNotification: 'Información',
					subTitleNotification: 'No existe pacientes con ese nombre.',
					typeNotification: 'information',
				})
			}
			else {
				setAppointments(result_format)
			}
			setLoading(true)
		} catch (error) {
			setLoading(true)
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
		ipcRenderer.removeAllListeners('get-all-appointment-main')
	}

	const handleChangeLimit = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: false,
		})
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: '',
			appointments_founds: [],
			show_search_form: false,
		})
	}

	const handleChangePage = async (e, pageNumber) =>
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: false,
		})

	const handleChangeStatus = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			sortStatus: e.target.value,
			currentPage: 1,
			loadingSort: false,
		})
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: '',
			appointments_founds: [],
			show_search_form: false,
		})
	}

	const handleChangeSort = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			loadingSort: false,
		})
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: '',
			appointments_founds: [],
			show_search_form: false,
		})
	}

	const handleChangeAsc = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			loadingSort: false,
		})
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: '',
			appointments_founds: [],
			show_search_form: false,
		})
	}

	const linkBreadCrumbs = [
		{
			link_name: 'Citas',
			link_to: '/private/appointments',
		},
	]

	const validForm = loading && pagesAndLimit.totalAppointments !== 0
	const validLoading = loading && pagesAndLimit.loadingSort
	const classValidationFormShow = appointmnetSearch.show_search_form
		? 'appointment__params__search__form__show'
		: null
	const validaPagination =
		validLoading &&
		appointments.length &&
		pagesAndLimit.totalPages > 1 &&
		!appointmnetSearch.patient_search.length > 0

	useEffect(
		() => {
			setLoading(false)
			setTimeout(() => {
				getAllAppointment()
			}, 1000)
			ipcRenderer.setMaxListeners(50)
		},
		[
			pagesAndLimit.currentPage,
			pagesAndLimit.limit,
			pagesAndLimit.asc,
			pagesAndLimit.sortBy,
			pagesAndLimit.sortStatus,
		],
	)

	return {
		loading,
		appointments,
		appointmnetSearch,
		pagesAndLimit,
		validaPagination,
		validForm,
		validLoading,
		classValidationFormShow,
		linkBreadCrumbs,
		handleChangePage,
		handleChangeInput,
		handleSearchAppointmets,
		handleChangeStateShowSearch,
		handleResetSearchAppointment,
		handleChangeLimit,
		handleChangeStatus,
		handleChangeSort,
		handleChangeAsc,
	}
}

export default useAppointments
