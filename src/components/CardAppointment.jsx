import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import { FiExternalLink } from 'react-icons/fi'
import { AvatarComponent } from '@components/AvatarComponent'
import '@styles/components/CardAppointment.scss'

const CardAppointment = ({
	format_appointment_date,
	patient_name,
	appointment_date,
	appointment_state,
	_id,
}) => {
	const validationDate =
		appointment_state === 'Activa' &&
		new Date().getTime() >= new Date(appointment_date).getTime()
	return (
		<div className="dashboard__appointments__schedule__appointment" key={_id}>
			{validationDate ? (
				<Tooltip title="Cita atrasada">
					<time
						className={`dashboard__appointments__schedule__appointment__moment ${validationDate
							? 'late__date'
							: null}`}>
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
				<h3>{patient_name}</h3>
			</article>
			<div
				className={`dashboard__appointments__schedule__appointment__state ${appointment_state}`}>
				{appointment_state}
			</div>
			<Tooltip title="Ver cita">
				<Link
					to={`/appointments/${_id}`}
					className="dashboard__appointments__schedule__appointment__link">
					<IconButton className="btn__icon">
						<FiExternalLink size={18} />
					</IconButton>
				</Link>
			</Tooltip>
		</div>
	)
}

export default CardAppointment
