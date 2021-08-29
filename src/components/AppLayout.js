import React, { Fragment } from 'react';
import { NavBar } from './NavBar';
import { Notification } from './Notification';

export const AppLayout = ({ children, ClassName = '' }) => {
	return (
		<Fragment>
			<NavBar />
			<main className={`container ${ClassName}`} id="layout">
				{children}
			</main>
			<Notification />
		</Fragment>
	);
};
