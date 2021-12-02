import { useContext, useEffect, useState } from 'react'
import notificationContext from '@context/notificationContext'
import { ipcRenderer } from 'electron'

export const usePatients = () => {
	const { setNotification } = useContext(notificationContext)
	const [ patients, setPatients ] = useState([])
	const [ loading, setLoading ] = useState(false)

	const getPateints = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-all-patients-main')
			const { success, patients } = result
			if (!success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const resultPatients = JSON.parse(patients)
			resultPatients.map(patient => {
				setPatients(patients => patients.concat(patient))
				setLoading(!loading)
			})
		} catch (error) {
			console.log(error)
			setLoading(!loading)
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			})
		}
	}
	useEffect(() => {
		setLoading(!loading)
		getPateints()
	}, [])

	return {
		patients,
		loading,
	}
}
