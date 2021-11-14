import React from 'react'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { FiMoreVertical } from 'react-icons/fi'
import { stringAvatar } from '@utils/utils'
import '@styles/components/PatientAppointmentTab.scss'

const PatientAppointmentTab = () => {
	return (
		<article className="patient__appointment__tab">
			<Avatar
				className="patient__appointment__tab__list__patient__avatar"
				{...stringAvatar('Aquiles Brinco')}
			/>
			<div className="patient__appointment__tab__list__patient__data">
				<h3 className="patient__appointment__tab__list__patient__data__name">
					Aquiles Brinco
				</h3>
				<small className="patient__appointment__tab__list__patient__data__hour">
					10 Oct, 11:30am
				</small>
			</div>
			<Tooltip title="Ver cita">
				<IconButton className="btn__icon patient__appointment__tab__list__patient__action">
					<FiMoreVertical />
				</IconButton>
			</Tooltip>
		</article>
	)
}

export default PatientAppointmentTab
