import { useState, useContext, useEffect } from 'react'
import notificationContext from '@context/notificationContext'

export const useCreateAppointment = ({ id_patient }) => {
	const [ appointment, setAppointment ] = useState({
		appointment_patient: '',
		appointment_date: new Date(),
		appointment_reason: '',
		appointment_state: true,
	})

	useEffect(
		() => {
			console.log(id_patient)
		},
		[ id_patient ],
	)
}
