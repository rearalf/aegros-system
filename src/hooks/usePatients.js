import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { format } from 'date-fns'
import { getAge } from '@utils/utils'
import notificationContext from '@context/notificationContext'
import esLocale from 'date-fns/locale/es'

function usePatients(){
	const { setNotification } = useContext(notificationContext)
	const [ patients, setPatients ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ pagesAndLimit, setPagesAndLimit ] = useState({
		currentPage: 1,
		limit: 10,
		totalPatients: 0,
		totalPage: 0,
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
			const result = await ipcRenderer.sendSync('get-all-patients-main', pagesAndLimit)
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
				totalPage,
				currentPage,
				totalPatients,
				loadingSort: false,
			})
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

	const formatPatients = patients => {
		if (patients.length > 0) {
			const result = patients.map(data => {
				const {
					_id,
					patient_name,
					patient_date_birth,
					patient_email,
					patient_phone_number,
					patient_state,
				} = data
				const formatDate = format(new Date(patient_date_birth), 'dd - MMMM - yyyy', {
					locale: esLocale,
				})
				const patient_age = getAge(patient_date_birth)
				return {
					_id,
					patient_name,
					patient_email,
					patient_phone_number,
					patient_state,
					patient_age,
					formatDate,
				}
			})
			return result
		}
		return patients
	}

	const handleSearchPatients = async e => {
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
			const result = await ipcRenderer.sendSync('find-patients-by-name-main', {
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
						subTitleNotification: 'No existe pacientes con ese nombre.',
						typeNotification: 'information',
					})
				: setPatients(format_patients)
			handleLoading(false)
		} catch (error) {
			handleLoading(false)
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleChangeInput = e => {
		const { value } = e.target
		setPatientSearch({
			...patientSearch,
			patient_name: value,
		})
	}

	const handleLoading = value => {
		setLoading(value)
		setPagesAndLimit({
			...pagesAndLimit,
			loadingSort: value,
		})
	}

	const handleResetSearch = () => {
		handleLoading(true)
		handleResetUserSearch()
		setTimeout(() => getPateints(), 500)
	}

	const handleChangeStateForm = () =>
		patientSearch.show_patient_form
			? handleResetSearch()
			: setPatientSearch({
					...patientSearch,
					show_patient_form: !patientSearch.show_patient_form,
				})

	const handleResetUserSearch = () =>
		setPatientSearch({
			...patientSearch,
			patient_name: '',
			show_patient_form: false,
		})

	const handleChangeLimit = e => {
		handleLoading(true)
		handleResetUserSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const handleChangeSortBy = e => {
		handleLoading(true)
		handleResetUserSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			loadingSort: false,
		})
	}

	const handleChangePage = async (e, pageNumber) => {
		handleLoading(true)
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: true,
		})
	}

	const handleChangeAsc = e => {
		handleLoading(true)
		handleResetUserSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			loadingSort: true,
		})
	}

	const validLoading = loading && pagesAndLimit.loadingSort
	const validPatients = patients.length === 0
	const validShowContent = validLoading ? 'hide' : ''
	const validShowTable = !validLoading && validPatients ? 'hide__it' : ''
	const validaPagination = !validLoading
		? !validPatients && pagesAndLimit.totalPage > 1 ? '' : 'hide__it'
		: ''
	const classFormShow = patientSearch.show_patient_form ? 'patients__search__form__show' : null
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
			ipcRenderer.setMaxListeners(35)
		},
		[ pagesAndLimit.currentPage, pagesAndLimit.limit, pagesAndLimit.asc, pagesAndLimit.sortBy ],
	)

	return {
		patients,
		loading,
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
