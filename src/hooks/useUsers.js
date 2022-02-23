import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'

function useUsers(){
	const { setNotification } = useContext(notificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ users, setUsers ] = useState([])
	const [ pagesAndLimit, setPagesAndLimit ] = useState({
		currentPage: 1,
		limit: 10,
		totalUser: 0,
		totalPage: 0,
		sortBy: 'user_name',
		asc: true,
		loadingSort: true,
	})

	const getUsers = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-users-main', pagesAndLimit)
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const { users, totalPage, totalUser, currentPage } = result
			setUsers(JSON.parse(users))
			setPagesAndLimit({
				...pagesAndLimit,
				totalPage,
				currentPage,
				totalUser,
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

	const validLoading = loading && pagesAndLimit.loadingSort
	const validUsers = users.length === 0
	const validShowContent = validLoading ? 'hide' : ''
	const validShowTable = !validLoading && users.length === 0 ? 'hide__it' : ''

	useEffect(
		() => {
			setTimeout(() => {
				getUsers()
			}, 1000)
			return () => {
				console.log('first')
			}
		},
		[ pagesAndLimit.currentPage, pagesAndLimit.limit, pagesAndLimit.asc, pagesAndLimit.sortBy ],
	)

	return {
		users,
		pagesAndLimit,
		validUsers,
		validLoading,
		validShowContent,
		validShowTable,
	}
}

export default useUsers
