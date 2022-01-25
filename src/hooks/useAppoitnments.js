import { useContext, useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import notificationContext from '@context/notificationContext'

function useAppointments(){
	const { setNotification } = useContext(notificationContext)
	const [ loading, setLoading ] = useState(true)
	const [ appointments, setAppointments ] = useState([])
	const getAllAppointment = async () => {
		try {
			const result = await ipcRenderer.sendSync('get-all-appointment-main')
			if (!result.success) {
				console.log(result)
				throw 'Ocurrio un error'
			}
			const appointments_result = JSON.parse(result.appointments)
			setAppointments(appointments_result)
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
	useEffect(() => {
		setLoading(false)
		setTimeout(() => {
			getAllAppointment()
		}, 1000)
		ipcRenderer.removeAllListeners('get-all-appointment-main')
		ipcRenderer.setMaxListeners(20)
	}, [])

	return {
		loading,
		appointments,
	}
}

export default useAppointments
