import { useContext, useEffect, useState } from 'react'
import { getAge } from '../utils/Utils'
import { formatDate } from '../utils/FormatDate'
import NotificationContext from '../context/NotificationContext'

function usePatients(){
	const { setNotification } = useContext(NotificationContext)
	const [ patients, setPatients ] = useState<any[]>([])
	const [ loading, setLoading ] = useState(true)
	const [ pagesAndLimit, setPagesAndLimit ] = useState({
		currentPage: 1,
		limit: 10,
		totalPatients: 0,
		totalPages: 0,
		sortBy: 'patient_name',
		asc: true,
		loadingSort: true,
	})
	const [ patientSearch, setPatientSearch ] = useState({
		patient_name: '',
		show_patient_form: false,
	})

	const getPateints = async () => {
		try {
			const result = await window.ipcRenderer.sendSync('get-all-patients-main', pagesAndLimit)
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const { patients, totalPage, totalPatients, currentPage } = result
			const resultPatients = JSON.parse(patients)
			const format_patients = formatPatients(resultPatients)
			setPatients(format_patients)
			setPagesAndLimit({
				...pagesAndLimit,
				totalPages: totalPage,
				currentPage,
				totalPatients,
				loadingSort: false,
			})
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
	}

	const formatPatients = (patients: []) => {
		if (patients.length > 0) {
			const result: any[] = patients.map(data => {
				const {
					_id,
					patient_name,
					patient_date_birth,
					patient_email,
					patient_phone_number,
					patient_state,
				} = data
				const patient_date_birth_format = formatDate({
					date: patient_date_birth,
					formatDate: 'dd - MMMM - yyyy',
				})
				const patient_age = getAge(patient_date_birth)
				return {
					_id,
					patient_name,
					patient_email,
					patient_phone_number,
					patient_state,
					patient_age,
					patient_date_birth_format,
				}
			})
			return result
		}
		return patients
	}

	const handleSearchPatients = async (e: any) => {
		try {
			e.preventDefault()
			handleLoading(true)
			const { patient_name } = patientSearch
			if (patient_name.length < 5) {
				throw {
					message: 'Debe de agregar más información.',
					type: 'information',
					title: 'Información',
				}
			}
			const result = await window.ipcRenderer.sendSync('find-patients-by-name-main', {
				limit: pagesAndLimit.limit,
				currentPage: pagesAndLimit.currentPage,
				patient_name,
			})
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error al buscar.',
				}
			}
			const format_patients = formatPatients(JSON.parse(result.patients))
			format_patients.length === 0
				? setNotification({
						isOpenNotification: true,
						titleNotification: 'Información',
						subTitleNotification: 'No existe paciente con ese nombre.',
						typeNotification: 'information',
					})
				: setPatients(format_patients)
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
	}

	const handleChangeInput = (e: any) => {
		const { value } = e.target
		setPatientSearch({
			...patientSearch,
			patient_name: value,
		})
	}

	const handleLoading = (value: boolean) => {
		setLoading(value)
		setPagesAndLimit({
			...pagesAndLimit,
			loadingSort: value,
		})
	}

	const handleResetSearch = () => {
		handleLoading(true)
		handleResetPatientSearch()
		setTimeout(() => getPateints(), 500)
	}

	const handleChangeStateForm = () =>
		patientSearch.show_patient_form
			? handleResetSearch()
			: setPatientSearch({
					...patientSearch,
					show_patient_form: !patientSearch.show_patient_form,
				})

	const handleResetPatientSearch = () =>
		setPatientSearch({
			...patientSearch,
			patient_name: '',
			show_patient_form: false,
		})

	const handleChangeLimit = (e: any) => {
		handleLoading(true)
		handleResetPatientSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const handleChangeSortBy = (e: any) => {
		handleLoading(true)
		handleResetPatientSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const handleChangeAsc = (e: any) => {
		handleLoading(true)
		handleResetPatientSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const handleChangePage = async (e: any, pageNumber: number) => {
		handleLoading(true)
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: true,
		})
	}

	const validLoading = loading && pagesAndLimit.loadingSort
	const validPatients = patients.length === 0
	const validShowContent = validLoading ? 'hide' : ''
	const validShowTable = !validLoading && validPatients ? 'hide__it' : ''
	const validaPagination = !validLoading
		? !validPatients && pagesAndLimit.totalPages > 1 ? '' : 'hide__it'
		: ''
	const classFormShow = patientSearch.show_patient_form ? 'patients__search__form__show' : ''
	const validAditional = {
		toolTipTitle: patientSearch.show_patient_form ? 'Cancelar busqueda' : 'Buscar por nombre',
		sortAsc: pagesAndLimit.asc ? 'Descendente' : 'Ascendente',
		validLengthName: patientSearch.patient_name.length >= 5 ? '' : 'hide',
	}
	const breadCrumbsLinks = [
		{
			link_name: 'Pacientes',
			link_to: '/private/patients',
		},
	]

	useEffect(
		() => {
			setTimeout(() => getPateints(), 500)
			window.ipcRenderer.setMaxListeners(35)
		},
		[ pagesAndLimit.currentPage, pagesAndLimit.limit, pagesAndLimit.asc, pagesAndLimit.sortBy ],
	)

	return {
		patients,
		patientSearch,
		pagesAndLimit,
		validLoading,
		validaPagination,
		classFormShow,
		breadCrumbsLinks,
		validShowContent,
		validShowTable,
		validPatients,
		validAditional,
		handleResetSearch,
		handleChangeStateForm,
		handleChangeInput,
		handleSearchPatients,
		handleChangePage,
		handleChangeLimit,
		handleChangeAsc,
		handleChangeSortBy,
	}
}

export default usePatients
