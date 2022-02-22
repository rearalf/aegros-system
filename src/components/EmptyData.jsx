import React from 'react'
import image__empty from '@image/no-data.svg'
import '@styles/components/EmptyData.scss'

const EmptyData = ({ title = 'No hay datos' }) => {
	return (
		<div className="empty__data">
			<img
				src={image__empty}
				alt={title}
				className="empty__data__image"
			/>
			<h3 className="empty__data__title">{title}</h3>
		</div>
	)
}

export default EmptyData
