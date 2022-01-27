import { useContext, useEffect, useState } from 'react'
import notificationContext from '@context/notificationContext'
import { ipcRenderer } from 'electron'

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
			setPatients([])
			resultPatients.map(patient => {
				setPatients(patients => patients.concat(patient))
			})
			setPagesAndLimit({
				...pagesAndLimit,
				totalPage,
				currentPage,
				totalPatients,
				loadingSort: true,
			})
			setLoading(true)
		} catch (error) {
			console.log(error)
			setLoading(true)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}

	const onChangeInputSearch = e => {
		const { value } = e.target
		setPatientSearch({
			...patientSearch,
			patient_name: value,
		})
	}
	const deleteInputSearch = () =>
		setPatientSearch({
			...patientSearch,
			patient_name: '',
		})

	const onChangeStateShowSearch = () => {
		setPatientSearch({
			...patientSearch,
			show_patient_form: !patientSearch.show_patient_form,
		})
	}

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
			const resultPatients = JSON.parse(result.patients)
			if (resultPatients.length > 0) {
				setPatients([])
				resultPatients.map(patient => {
					setPatients(patients => patients.concat(patient))
				})
				setPatientSearch({
					...patientSearch,
					patients_search: resultPatients,
				})
			}
			else {
				throw {
					message: 'No hay pacientes con ese nombre.',
					type: 'information',
					title: 'Información',
				}
			}
		} catch (error) {
			/* Notification */
			setNotification({
				isOpenNotification: true,
				titleNotification: error.title ? error.title : 'Error',
				subTitleNotification: error.message,
				typeNotification: error.type ? error.type : 'error',
			})
		}
	}

	const handleChangeLimit = e =>
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: false,
		})

	const handleChangeSortBy = e =>
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			loadingSort: false,
		})

	const handleChangePage = async (event, pageNumber) =>
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: false,
		})

	const handleChangeAsc = e =>
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			loadingSort: false,
		})

	useEffect(() => {
		setLoading(!loading)
		setTimeout(() => {
			getPateints()
		}, 1000)
	}, [])
	useEffect(
		() => {
			setTimeout(() => {
				getPateints()
			}, 1000)
		},
		[ pagesAndLimit.currentPage, pagesAndLimit.limit, pagesAndLimit.asc, pagesAndLimit.sortBy ],
	)

	return {
		patients,
		loading,
		patientSearch,
		onChangeInputSearch,
		deleteInputSearch,
		handleSearchPatients,
		onChangeStateShowSearch,
		handleResetPatients,
		pagesAndLimit,
		handleChangePage,
		handleChangeLimit,
		handleChangeAsc,
		handleChangeSortBy,
	}
}
