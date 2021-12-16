import React, { createContext, useState } from 'react'

const notificationContext = createContext({
	// Notification
	isOpenNotification: false,
	titleNotification: '',
	subTitleNotification: '',
	typeNotification: '',
})

export function NotificationContext({ children }){
	const [ notification, setNotification ] = useState({
		isOpenNotification: false,
		titleNotification: '',
		subTitleNotification: '',
		typeNotification: '',
	})
	return (
		<notificationContext.Provider value={{ notification, setNotification }}>
			{children}
		</notificationContext.Provider>
	)
}

export default notificationContext
