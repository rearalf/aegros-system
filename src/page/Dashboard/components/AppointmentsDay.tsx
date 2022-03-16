import { CardAppointment, EmptyData } from '../../../components'

interface props {
	appointments: any[]
}

const AppointmentsDay = ({ appointments = [] }: props) => {
	return appointments.length ? (
		<div className="dashboard__appointments__schedule dashboard__appointments__schedule__day">
			{appointments.map(data => <CardAppointment {...data} key={data._id} />)}
		</div>
	) : (
		<EmptyData title="No hay citas para hoy." />
	)
}

export default AppointmentsDay
