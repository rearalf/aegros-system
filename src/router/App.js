import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { NotificationContext } from '../context/notificationContext'
import { Login } from '@page/Login'
import { Dashboard } from '@page/Dashboard'
import { Appointment } from '@page/Appointment'
import { AppointmentData } from '@page/AppointmentData'
import { CreatePatient } from '@page/CreatePatient'
import { Patients } from '@page/Patients'
import { Patient } from '@page/Patient'

const App = () => {
	return (
		<HashRouter>
			<NotificationContext>
				<Routes>
					<Route path="/" exact element={<Login />} />
					<Route path="/dashboard" exact element={<Dashboard />} />
					<Route path="/patients" exact element={<Patients />} />
					<Route path="/patients/create-patient" exact element={<CreatePatient />} />
					<Route path="/patients/patient/:id" exact element={<Patient />} />
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
