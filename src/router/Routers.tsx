import { HashRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from '../layout/PublicLayout'
import PrivateLayout from '../layout/PrivateLayout'
import Login from '../page/Login'
import NewUser from '../page/NewUser'
import Dashboard from '../page/Dashboard'
import System from '../page/System'
import PatientTemplate from '../page/Patient'
import Patients from '../page/Patient/Patients'
import Patient from '../page/Patient/Patient'
import UpdatePatient from '../page/Patient/UpdatePatient'
import CreatePatient from '../page/Patient/CreatePatient'
import AppointmentTemplate from '../page/Appointment'
import Appointments from '../page/Appointment/Appointments'
import Appointment from '../page/Appointment/Appointment'
import CreateAppointment from '../page/Appointment/CreateAppointment'
import UpdateAppointment from '../page/Appointment/UpdateAppointment'
import UserTemplate from '../page/User'
import Users from '../page/User/Users'
import Profile from '../page/User/Profile'
import CreateUser from '../page/User/CreateUser'
import UpdateUser from '../page/User/UpdateUser'
import ChangePassword from '../page/User/ChangePassword'

function Routers(){
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					<Route path="/" element={<Login />} />
					<Route path="/new-user" element={<NewUser />} />
				</Route>
				<Route path="private" element={<PrivateLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="system" element={<System />} />
					<Route path="patients" element={<PatientTemplate />}>
						<Route index element={<Patients />} />
						<Route path=":id" element={<Patient />} />
						<Route path="update-patient/:id" element={<UpdatePatient />} />
						<Route path="create-patient" element={<CreatePatient />} />
					</Route>
					<Route path="appointments" element={<AppointmentTemplate />}>
						<Route index element={<Appointments />} />
						<Route path=":id" element={<Appointment />} />
						<Route path="creat-appointment" element={<CreateAppointment />} />
						<Route
							path="creat-appointment/:patient_id"
							element={<CreateAppointment />}
						/>
						<Route path="update-appointment/:id" element={<UpdateAppointment />} />
					</Route>
					<Route path="users" element={<UserTemplate />}>
						<Route index element={<Users />} />
						<Route path=":id" element={<Profile />} />
						<Route path="create-user" element={<CreateUser />} />
					</Route>
					<Route path="profile" element={<Profile />} />
					<Route path="profile/update-user/:id" element={<UpdateUser />} />
					<Route path="profile/change-password/:id" element={<ChangePassword />} />
					<Route path="*" element={<Dashboard />} />
				</Route>
			</Routes>
		</HashRouter>
	)
}

export default Routers
