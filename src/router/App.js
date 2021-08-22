import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../page/Login';
import { Home } from '../page/Home';

const App = () => {
	return (
		<HashRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/home" exact component={Home} />
			</Switch>
		</HashRouter>
	);
};

export default App;
