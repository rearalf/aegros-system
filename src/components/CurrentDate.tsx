import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import useCurrentDate from '../hooks/useCurrentDate'

const CurrentDate = () => {
	const { date, hours, minutes, timeSystem } = useCurrentDate()
	return (
		<div className="navbar__center">
			<h3 className="navbar__center__date">
				<FiCalendar size={20} />
				{date}
			</h3>
			<h3 className="navbar__center__time">
				<FiClock /> {hours}:{minutes} {timeSystem}
			</h3>
		</div>
	)
}

export default CurrentDate
