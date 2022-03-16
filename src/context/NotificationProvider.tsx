import { useState } from 'react'
import { defaulNotificationContext } from '../Interface/NorificationInterface'
import NotificationContext from './NotificationContext'

type Props = {
	children: JSX.Element | JSX.Element[]
}

function NotificationProvider({ children }: Props){
	const [ notification, setNotification ] = useState(defaulNotificationContext.notification)
	return (
		<NotificationContext.Provider value={{ notification, setNotification }}>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationProvider
