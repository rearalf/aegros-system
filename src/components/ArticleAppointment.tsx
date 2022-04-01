import { memo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { propsArticleAppointment } from '../Interface/PatientsInterface'
import '../assets/styles/components/ArticleAppointment.scss'

const ArticleAppointment = ({
	appointment,
	appointment_current_id = '',
}: propsArticleAppointment) => (
	<article key={appointment._id} className="article__appointment">
		<Tooltip title={`Cita ${appointment.appointment_state}`}>
			<div
				className={`article__appointment__circle__state ${appointment.appointment_state}`}
			/>
		</Tooltip>
		<div className="article__appointment__created">
			<Tooltip title={appointment.createdAt_format_hour}>
				<h3 className="article__appointment__created__title">
					{appointment.createdAt_format}
				</h3>
			</Tooltip>
			<p className="article__appointment__created__p">Fecha de creación</p>
		</div>
		<div className="article__appointment__parting_line" />
		<div className="article__appointment__date">
			<Tooltip title={appointment.appointment_date_format_hour}>
				<h3 className="article__appointment__date__title">
					{appointment.appointment_date_format}
				</h3>
			</Tooltip>
			<p className="article__appointment__date__p">Fecha de la cita</p>
		</div>
		<div className="article__appointment__parting_line" />
		{appointment_current_id === appointment._id ? (
			<h3>Cita actual</h3>
		) : (
			<Tooltip title="Ver cita">
				<Link to={`/private/appointments/${appointment._id}`}>
					<IconButton className="btn__icon">
						<FiExternalLink size={18} />
					</IconButton>
				</Link>
			</Tooltip>
		)}
	</article>
)

export default memo(ArticleAppointment)
