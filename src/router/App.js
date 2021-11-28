import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { NotificationContext } from '../context/notificationContext'
import { Login } from '@page/Login'
import { Dashboard } from '@page/Dashboard'
import { Appointment } from '@page/Appointment'
import { AppointmentData } from '@page/AppointmentData'
import { CreatePatient } from '@page/CreatePatient'
import { Patients } from '@page/Patients'

const App = () => {
	return (
		<HashRouter>
			<NotificationContext>
				<Routes>
					<Route path="/" exact element={<Login />} />
					<Route path="/dashboard" exact element={<Dashboard />} />
					<Route path="/patient/create-patient" exact element={<CreatePatient />} />
					<Route path="/patient" exact element={<Patients />} />
					<Route path="/appointment" exact element={<Appointment />} />
					<Route
						path="/appointment/:pattient/:appointment"
						element={<AppointmentData />}
					/>
				</Routes>
			</NotificationContext>
		</HashRouter>
	)
}

export default App
