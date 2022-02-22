import React from 'react'
import { NotificationContext } from '@context/notificationContext'
import { DialogContext } from '@context/dialogContext'
import { Notification, DialogComponent } from '@components'
import Routers from '@router/Routers'

const App = () => {
	return (
		<NotificationContext>
			<DialogContext>
				<Routers />
				<Notification />
				<DialogComponent />
			</DialogContext>
		</NotificationContext>
	)
}

export default App
