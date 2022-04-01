import { EmptyData } from '../../../components'
import { propsAppointmentsDay } from '../../../Interface/DashboardInterface'
import CardAppointment from './CardAppointment'

const AppointmentsDay = ({ appointments = [] }: propsAppointmentsDay) => {
	return appointments.length ? (
		<div className="dashboard__appointments__schedule dashboard__appointments__schedule__day">
			{appointments.map(appointment => (
				<CardAppointment {...appointment} key={appointment._id} />
			))}
		</div>
	) : (
		<EmptyData title="No hay citas para hoy." />
	)
}

export default AppointmentsDay
