import { DialogComponent, Notification } from './components'
import NotificationProvider from './context/NotificationProvider'
import DialogProvider from './context/DialogProvider'
import Routers from './router/Routers'

function App(){
	return (
		<NotificationProvider>
			<DialogProvider>
				<Routers />
				<Notification />
				<DialogComponent />
			</DialogProvider>
		</NotificationProvider>
	)
}

export default App
