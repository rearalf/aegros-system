import { useContext, useEffect, useState } from 'react'
import NotificationContext from '../context/NotificationContext'

function useUsers(){
	const { setNotification } = useContext(NotificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ users, setUsers ] = useState([])
	const [ pagesAndLimit, setPagesAndLimit ] = useState({
		currentPage: 1,
		limit: 10,
		totalUser: 0,
		totalPages: 1,
		sortBy: 'user_name',
		asc: true,
		loadingSort: true,
	})
	const [ userSearch, setUserSearch ] = useState({
		user_name: '',
		show_users_form: false,
	})

	const getUsers = async () => {
		try {
			const result = await window.ipcRenderer.sendSync('get-users-main', pagesAndLimit)
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const { users, totalPages, totalUser, currentPage } = result
			setUsers(JSON.parse(users))
			setPagesAndLimit({
				...pagesAndLimit,
				totalPages,
				currentPage,
				totalUser,
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

	const handleSearchUser = async (e: any) => {
		try {
			e.preventDefault()
			handleLoading(true)
			if (!userSearch.user_name)
				throw {
					message: 'No deje el campo vacío.',
					type: 'information',
					title: 'Información',
				}
			if (userSearch.user_name.length < 5)
				throw {
					message: 'Debe de agregar más información.',
					type: 'information',
					title: 'Información',
				}
			const result = await window.ipcRenderer.sendSync('get-users-main', {
				limit: pagesAndLimit.limit,
				currentPage: pagesAndLimit.currentPage,
				user_name: userSearch.user_name,
			})
			if (!result.success) {
				console.log(result)
				throw {
					message: 'Ocurrio un error al buscar.',
				}
			}
			const user_result = JSON.parse(result.users)
			user_result.length === 0
				? setNotification({
						isOpenNotification: true,
						titleNotification: 'Información',
						subTitleNotification: 'No existe usuarios con ese nombre.',
						typeNotification: 'information',
					})
				: setUsers(user_result)
			handleLoading(false)
		} catch (error) {
			const { title, message, type } = error as any
			handleLoading(false)
			setPagesAndLimit({
				...pagesAndLimit,
				loadingSort: !pagesAndLimit.loadingSort,
			})
			setNotification({
				isOpenNotification: true,
				titleNotification: title ? title : 'Error',
				subTitleNotification: message,
				typeNotification: type ? type : 'error',
			})
		}
	}

	const handleChangeStateForm = () =>
		setUserSearch({
			...userSearch,
			show_users_form: !userSearch.show_users_form,
		})

	const handeChangeInput = (e: any) =>
		setUserSearch({
			...userSearch,
			user_name: e.target.value,
		})

	const handleResetSearch = () => {
		handleLoading(true)
		handleResetUserSearch()
		setTimeout(() => getUsers(), 500)
	}

	const handleLoading = (value: boolean) => {
		setLoading(value)
		setPagesAndLimit({
			...pagesAndLimit,
			loadingSort: value,
		})
	}

	const handleResetUserSearch = () => {
		setUserSearch({
			user_name: '',
			show_users_form: false,
		})
	}

	const handleChangePage = (e: any, pageNumber: number) => {
		handleLoading(true)
		setPagesAndLimit({
			...pagesAndLimit,
			currentPage: pageNumber,
			loadingSort: true,
		})
	}

	const handleChangeLimit = (e: any) => {
		handleLoading(true)
		handleResetUserSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			limit: e.target.value,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const handleChangeSortBy = (e: any) => {
		handleLoading(true)
		handleResetUserSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			sortBy: e.target.value,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const handleChangeAsc = (e: any) => {
		handleLoading(true)
		handleResetUserSearch()
		setPagesAndLimit({
			...pagesAndLimit,
			asc: e.target.checked,
			currentPage: 1,
			loadingSort: true,
		})
	}

	const validLoading = loading && pagesAndLimit.loadingSort
	const validUsers = users.length === 0
	const validShowContent = validLoading ? 'hide' : ''
	const validShowTable = !validLoading && users.length === 0 ? 'hide__it' : ''
	const validaPagination = !validLoading
		? !validUsers && pagesAndLimit.totalPages > 1 ? '' : 'hide__it'
		: ''
	const classFormShow = userSearch.show_users_form ? 'users__params__search__form__show' : ''
	const validUserPerfil = JSON.parse(`${sessionStorage.getItem('user')}`)._id
	const validAditional = {
		toolTipTitle: userSearch.show_users_form ? 'Cancelar busqueda' : 'Buscar por nombre',
		sortAsc: pagesAndLimit.asc ? 'Descendente' : 'Ascendente',
		validLengthName: userSearch.user_name.length >= 5 ? '' : 'hide',
	}
	const breadCrumbsLinks = [
		{
			link_name: 'Usuarios',
			link_to: '/private/users',
		},
	]

	useEffect(
		() => {
			setTimeout(() => getUsers(), 500)
		},
		[ pagesAndLimit.currentPage, pagesAndLimit.limit, pagesAndLimit.asc, pagesAndLimit.sortBy ],
	)

	return {
		users,
		pagesAndLimit,
		userSearch,
		breadCrumbsLinks,
		validUsers,
		validLoading,
		validShowContent,
		validShowTable,
		validaPagination,
		classFormShow,
		validUserPerfil,
		validAditional,
		handleChangePage,
		handleChangeStateForm,
		handeChangeInput,
		handleSearchUser,
		handleResetSearch,
		handleChangeLimit,
		handleChangeSortBy,
		handleChangeAsc,
	}
}

export default useUsers
