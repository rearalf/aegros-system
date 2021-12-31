import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { NotificationContext } from '@context/notificationContext'
import { DialogContext } from '@context/dialogContext'
import { Login } from '@page/Login'
import { Dashboard } from '@page/Dashboard'
import { Appointments } from '@page/Appointments'
import { CreateAppointment } from '@page/CreateAppointment'
import { CreatePatient } from '@page/CreatePatient'
import { Patients } from '@page/Patients'
import { Patient } from '@page/Patient'
import { Notification } from '@components/Notification'
import { DialogComponent } from '@components/DialogComponent'

const App = () => {
	return (
		<HashRouter>
			<NotificationContext>
				<DialogContext>
					<Routes>
						<Route path="/" exact element={<Login />} />
						<Route path="/dashboard" exact element={<Dashboard />} />
						<Route path="/patients" exact element={<Patients />} />
						<Route path="patients/create-patient" element={<CreatePatient />}>
							<Route path=":id_patient" element={null} />
						</Route>
						<Route path="/patients/patient/:id" exact element={<Patient />} />
						<Route path="/appointments" exact element={<Appointments />} />
						<Route
							path="/appointments/creat-appointment/"
							element={<CreateAppointment />}>
							<Route path=":patient_id" element={null} />
						</Route>
						<Route path="*" element={<Dashboard />} />
					</Routes>
					<Notification />
					<DialogComponent />
				</DialogContext>
			</NotificationContext>
		</HashRouter>
	)
}

export default App
