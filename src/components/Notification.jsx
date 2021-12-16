import React from 'react'
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import { useNotification } from '@hooks/useNotification'
import { CircularProgress } from '@mui/material'
import '@styles/components/Notification.scss'

export const Notification = () => {
	const {
		changeValueIsOpen,
		isOpenNotification,
		titleNotification,
		subTitleNotification,
		typeNotification,
		currentCount,
	} = useNotification()

	/* Validations of data */
	const showNotification = isOpenNotification ? 'show__notification' : ''
	const typeNotificationShow = typeNotification ? typeNotification : ''
	const showIconNotification =
		typeNotification === 'success' ? (
			<FiCheckCircle title={titleNotification} size={25} />
		) : typeNotification === 'error' ? (
			<FiAlertCircle title={titleNotification} size={25} />
		) : typeNotification === 'warning' ? (
			<FiAlertTriangle title={titleNotification} size={25} />
		) : (
			typeNotification === 'information' && <FiInfo title={titleNotification} size={25} />
		)

	return (
		<div className={`notification ${showNotification} ${typeNotificationShow}`}>
			<div className="notification__content">
				<div className="notification__bar" />
				<i className="notification__icon">{showIconNotification}</i>
				<div className="notification__content__text">
					<h2 className="notification__title">{titleNotification}</h2>
					<p className="notification__subTitle">{subTitleNotification}</p>
				</div>
				<div
					className="notification__progress__bar__button__icon"
					onClick={changeValueIsOpen}>
					<FiX title={'Cerrar'} size={25} />
					<CircularProgress variant="determinate" value={currentCount} />
				</div>
			</div>
		</div>
	)
}
