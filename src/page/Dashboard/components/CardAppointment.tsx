import { Link } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import { FiExternalLink } from 'react-icons/fi'
import { nameSplit } from '../../../utils/Utils'
import { propsCardAppointment } from '../../../Interface/DashboardInterface'
import AvatarComponent from '../../../components/AvatarComponent'
import '../../../assets/styles/components/CardAppointment.scss'

const CardAppointment = ({
	_id,
	patient_name,
	appointment_state,
	format_appointment_date,
	appointment_state_current,
}: propsCardAppointment) => (
	<article className="dashboard__appointments__schedule__appointment" key={_id}>
		{appointment_state_current ? (
			<Tooltip title="Cita atrasada">
				<time className="dashboard__appointments__schedule__appointment__moment late__date">
					{format_appointment_date}
				</time>
			</Tooltip>
		) : (
			<time className="dashboard__appointments__schedule__appointment__moment">
				{format_appointment_date}
			</time>
		)}
		<article className="dashboard__appointments__schedule__appointment__patient">
			<AvatarComponent
				name={patient_name}
				className="dashboard__appointments__schedule__appointment__patient__avatar"
			/>
			<Tooltip title={patient_name}>
				<h3>{nameSplit(patient_name)}</h3>
			</Tooltip>
		</article>
		<div
			className={`dashboard__appointments__schedule__appointment__state ${appointment_state}`}>
			{appointment_state}
		</div>
		<Tooltip title="Ver cita">
			<Link
				to={`/private/appointments/${_id}`}
				className="dashboard__appointments__schedule__appointment__link">
				<IconButton className="btn__icon">
					<FiExternalLink size={18} />
				</IconButton>
			</Link>
		</Tooltip>
	</article>
)

export default CardAppointment
