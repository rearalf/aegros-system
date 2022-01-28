import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { format, formatDistanceToNow } from 'date-fns'
import notificationContext from '@context/notificationContext'
import esLocale from 'date-fns/locale/es'

export const usePatients = () => {
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
		patients_search: [],
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
			setLoading(true)
			setPagesAndLimit({
				...pagesAndLimit,
				totalPage,
				currentPage,
				totalPatients,
				loadingSort: true,
			})
		} catch (error) {
			setLoading(true)
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

				const formatDate = format(new Date(patient_date_birth), 'dd - MMM - yyyy', {
					locale: esLocale,
				})
				const resultAge = formatDistanceToNow(new Date(patient_date_birth))
				const patient_age_format = resultAge.split(' ')
				let validateAge = false
				if (
					new Date(patient_date_birth).getMonth() === 0 ||
					new Date(patient_date_birth).getMonth() === 1 ||
					new Date(patient_date_birth).getMonth() === 2
				) {
					validateAge = true
				}
				const patient_age = validateAge ? patient_age_format[1] - 1 : patient_age_format[1]
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
		return null
	}

	const onChangeInputSearch = e => {
		const { value } = e.target
		setPatientSearch({
			...patientSearch,
			patient_name: value,
		})
	}

	const onChangeStateShowSearch = () =>
		setPatientSearch({
			...patientSearch,
			show_patient_form: !patientSearch.show_patient_form,
		})

	const handleResetPatients = () => {
		getPateints()
		setPatientSearch({
			...patientSearch,
			patients_search: [],
			patient_name: '',
			show_patient_form: !patientSearch.show_patient_form,
		})
	}

	const handleSearchPatients = async e => {
		try {
			setLoading(false)
			e.preventDefault()
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
			format_patients === null
				? setNotification({
						isOpenNotification: true,
						titleNotification: 'Información',
						subTitleNotification: 'No existe pacientes con ese nombre.',
						typeNotification: 'information',
					})
				: setPatients(format_patients)
			setLoading(true)
		} catch (error) {
			setLoading(true)
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleChangeLimit = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: false,
		})
		setPatientSearch({
			...patientSearch,
			patients_search: [],
			patient_name: '',
			show_patient_form: false,
		})
	}

	const handleChangeSortBy = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			loadingSort: false,
		})
		setPatientSearch({
			...patientSearch,
			patients_search: [],
			patient_name: '',
			show_patient_form: false,
		})
	}

	const handleChangePage = async (event, pageNumber) =>
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: false,
		})

	const handleChangeAsc = e => {
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			loadingSort: false,
		})
		setPatientSearch({
			...patientSearch,
			patients_search: [],
			patient_name: '',
			show_patient_form: false,
		})
	}

	useEffect(
		() => {
			setLoading(false)
			setTimeout(() => {
				getPateints()
			}, 1000)
			ipcRenderer.setMaxListeners(35)
		},
		[ pagesAndLimit.currentPage, pagesAndLimit.limit, pagesAndLimit.asc, pagesAndLimit.sortBy ],
	)

	return {
		patients,
		loading,
		patientSearch,
		pagesAndLimit,
		onChangeInputSearch,
		handleSearchPatients,
		onChangeStateShowSearch,
		handleResetPatients,
		handleChangePage,
		handleChangeLimit,
		handleChangeAsc,
		handleChangeSortBy,
	}
}
