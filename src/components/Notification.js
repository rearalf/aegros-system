import React from 'react'
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import { useNotification } from '@hooks/useNotification'
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
	return (
		<div
			className={`notification ${isOpenNotification
				? 'show__notification'
				: ''} ${typeNotification ? typeNotification : ''}`}>
			<div className="notification__content">
				<div className="notification__bar" />
				<i className="notification__icon">
					{typeNotification === 'success' ? (
						<FiCheckCircle title={titleNotification} size={25} />
					) : typeNotification === 'error' ? (
						<FiAlertCircle title={titleNotification} size={25} />
					) : typeNotification === 'warning' ? (
						<FiAlertTriangle title={titleNotification} size={25} />
					) : (
						typeNotification === 'information' && (
							<FiInfo title={titleNotification} size={25} />
						)
					)}
				</i>
				<div className="notification__content__text">
					<h2 className="notification__title">{titleNotification}</h2>
					<p className="notification__subTitle">{subTitleNotification}</p>
				</div>
				<i className="notification__icon close__icon" onClick={changeValueIsOpen}>
					<FiX title={'Cerrar'} size={25} />
				</i>
			</div>
			<div
				className="loader__bar__notification"
				style={{
					width: `${currentCount}%`,
				}}
			/>
		</div>
	)
}
