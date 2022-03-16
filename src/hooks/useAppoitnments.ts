import { useContext, useEffect, useState } from 'react'
import { formatDate } from '../utils/FormatDate'
import NotificationContext from '../context/NotificationContext'

function useAppointments(){
	const { setNotification } = useContext(NotificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ appointments, setAppointments ] = useState<any[]>([])
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
		sortByState: false,
	})

	const getAllAppointment = async () => {
		try {
			const result = await window.ipcRenderer.sendSync(
				'get-all-appointment-main',
				pagesAndLimit,
			)
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const { totalAppointments, totalPages, currentPage } = result
			const appointments_result = JSON.parse(result.appointments)
			const result_format = formatAppointmet(appointments_result)
			if (pagesAndLimit.sortByState && result_format.length === 0) {
				setNotification({
					isOpenNotification: true,
					titleNotification: 'Información',
					subTitleNotification: `No hay citas ${pagesAndLimit.sortStatus}s.`,
					typeNotification: 'information',
				})
				setPagesAndLimit({
					...pagesAndLimit,
					sortStatus: 'Todas',
					loadingSort: false,
				})
			}
			else {
				setAppointments(result_format)
				setPagesAndLimit({
					...pagesAndLimit,
					totalAppointments,
					totalPages,
					currentPage,
					loadingSort: false,
				})
			}
			setLoading(false)
		} catch (error) {
			const err = error as any
			setLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: err,
				typeNotification: 'error',
			})
		}
		window.ipcRenderer.removeAllListeners('get-all-appointment-main')
	}

	const handleSearchAppointmets = async (e: any) => {
		try {
			e.preventDefault()
			if (appointmnetSearch.patient_search.length < 5)
				throw {
					message: 'Debe de agregar más información.',
					type: 'information',
					title: 'Información',
				}
			const result = await window.ipcRenderer.sendSync('get-all-appointment-main', {
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
			result_format.length === 0
				? setNotification({
						isOpenNotification: true,
						titleNotification: 'Información',
						subTitleNotification: 'No existe paciente con ese nombre.',
						typeNotification: 'information',
					})
				: setAppointments(result_format)
			handleLoading(false)
		} catch (error) {
			const { title, message, type } = error as any
			handleLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
			})
		}
		window.ipcRenderer.removeAllListeners('get-all-appointment-main')
	}

	const formatAppointmet = (appointments: []) => {
		if (appointments.length > 0) {
			const result: any[] = appointments.map(data => {
				const { appointment_date, appointment_state, createdAt, patient, _id } = data
				const { patient_name } = patient
				const format_appointment_date = formatDate({
					date: appointment_date,
					formatDate: 'dd / MMMM / yyyy - h:m bbbb',
				})
				const format_created = formatDate({
					date: createdAt,
					formatDate: 'dd / MMMM / yyyy',
				})
				return {
					_id,
					appointment_state,
					format_appointment_date,
					format_created,
					patient_name,
					/* patient_id: patient._id, */
				}
			})
			return result
		}
		return appointments
	}

	const handleChangeInput = (e: any) =>
		setAppointmentSearch({
			...appointmnetSearch,
			patient_search: e.target.value,
		})

	const handleChangeLimit = (e: any) => {
		handleLoading(true)
		handleResetAppointmentSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: false,
		})
	}

	const handleChangePage = async (e: any, pageNumber: number) => {
		handleLoading(true)
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: false,
		})
	}

	const handleChangeStatus = (e: any) => {
		handleLoading(true)
		handleResetAppointmentSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			sortStatus: e.target.value,
			currentPage: 1,
			loadingSort: true,
			sortByState: true,
		})
	}

	const handleChangeSort = (e: any) => {
		handleLoading(true)
		handleResetAppointmentSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			loadingSort: true,
		})
	}

	const handleChangeAsc = (e: any) => {
		handleResetAppointmentSearch()
		handleLoading(true)
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			loadingSort: true,
		})
	}

	const handleLoading = (value: boolean) => {
		setLoading(value)
		setPagesAndLimit({
			...pagesAndLimit,
			loadingSort: value,
		})
	}

	const handleChangeStateForm = () =>
		appointmnetSearch.show_search_form
			? handleResetSearch()
			: setAppointmentSearch({
					...appointmnetSearch,
					show_search_form: !appointmnetSearch.show_search_form,
				})

	const handleResetSearch = () => {
		handleLoading(true)
		handleResetAppointmentSearch()
		setTimeout(() => getAllAppointment(), 500)
	}

	const handleResetAppointmentSearch = () =>
		setAppointmentSearch({
			patient_search: '',
			show_search_form: false,
		})

	const validLoading = loading && pagesAndLimit.loadingSort
	const validAppointments = appointments.length === 0
	const validShowContent = validLoading ? 'hide' : ''
	const validShowTable = !validLoading && validAppointments ? 'hide__it' : ''
	const validaPagination = !validLoading
		? !validAppointments && pagesAndLimit.totalPages > 1 ? '' : 'hide__it'
		: ''
	const classFormShow = appointmnetSearch.show_search_form
		? 'appointment__params__search__form__show'
		: ''
	const validAditional = {
		toolTipTitle: appointmnetSearch.show_search_form
			? 'Cancelar busqueda'
			: 'Buscar cita por nombre del paciente',
		sortAsc: pagesAndLimit.asc ? 'Descendente' : 'Ascendente',
		validLengthName: appointmnetSearch.patient_search.length >= 5 ? '' : 'hide',
	}
	const linkBreadCrumbs = [
		{
			link_name: 'Citas',
			link_to: '/private/appointments',
		},
	]

	useEffect(
		() => {
			setTimeout(() => getAllAppointment(), 500)
			window.ipcRenderer.setMaxListeners(50)
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
		linkBreadCrumbs,
		appointmnetSearch,
		pagesAndLimit,
		classFormShow,
		validAppointments,
		validaPagination,
		validLoading,
		validShowContent,
		validAditional,
		validShowTable,
		handleChangePage,
		handleChangeInput,
		handleSearchAppointmets,
		handleChangeStateForm,
		handleResetSearch,
		handleChangeLimit,
		handleChangeStatus,
		handleChangeSort,
		handleChangeAsc,
	}
}

export default useAppointments
