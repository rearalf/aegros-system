import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { NotificationContext } from '../context/notificationContext';
import { Login } from '@page/Login';
import { Dashboard } from '@page/Dashboard';
import { Perfil } from '@page/Perfil';
import { AppLayout } from '@components/AppLayout';
import { Appointment } from '@page/Appointment';
import { AppointmentData } from '@page/AppointmentData';

const App = () => {
	return (
		<HashRouter>
			<NotificationContext>
				<Switch>
					<Route path="/" exact component={Login} />
					<AppLayout>
						<Route path="/dashboard" exact component={Dashboard} />
						<Route path="/perfil" exact component={Perfil} />
						<Route path="/appointment" exact component={Appointment} />
						<Route path="/appointmentdata" exact component={AppointmentData} />
					</AppLayout>
				</Switch>
			</NotificationContext>
		</HashRouter>
	);
};

export default App;
