import {
	appointmentPatientInterface,
	propsListAppointments,
} from '../../../Interface/PatientsInterface'
import ArticleAppointment from '../../../components/ArticleAppointment'

const ListAppointments = ({ appointments = [], state_appointment }: propsListAppointments) => {
	return (
		<div className="patient__section__apointment__appointments">
			{appointments.map((appointment: appointmentPatientInterface) => {
				if (state_appointment === 'all')
					return <ArticleAppointment key={appointment._id} appointment={appointment} />
				if (state_appointment === appointment.appointment_state) {
					console.log(appointments.length)
					return <ArticleAppointment key={appointment._id} appointment={appointment} />
				}
			})}
		</div>
	)
}

export default ListAppointments
