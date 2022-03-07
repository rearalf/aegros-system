import React from 'react'
import { AvatarComponent } from '@components'
import { Tooltip } from '@mui/material'
import '@styles/components/PatientInformation.scss'

const PatientInformation = ({
	patient_name = '',
	patient_short_name = '',
	patient_age = 0,
	patient_gender = 'man',
	patient_date_birth_format = '',
}) => {
	const Age = () => {
		return (
			<Tooltip title={patient_date_birth_format}>
				<span className="patient__information__data__sub__date">{patient_age} años</span>
			</Tooltip>
		)
	}
	return (
		<div className="patient__information">
			<AvatarComponent className="patient__information__avatar" name={patient_name} />
			<article className="patient__information__data">
				<Tooltip title={patient_name}>
					<h1 className="patient__information__data__title">{patient_short_name}</h1>
				</Tooltip>
				<p className="patient__information__data__sub">
					<Age />
					{`, ${patient_gender === 'man' ? 'Hombre' : 'Mujer'}`}
				</p>
			</article>
		</div>
	)
}

export default PatientInformation
