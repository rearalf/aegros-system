import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { NotificationContext } from '../context/notificationContext';
import { Login } from '../page/Login';
import { Home } from '../page/Home';

const App = () => {
	return (
		<HashRouter>
			<NotificationContext>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/home" exact component={Home} />
				</Switch>
			</NotificationContext>
		</HashRouter>
	);
};

export default App;
