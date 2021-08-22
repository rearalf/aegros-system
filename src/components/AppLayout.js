import React, { Fragment } from 'react';
import { NavBar } from './NavBar';

export const AppLayout = ({ children, ClassName = '' }) => {
	return (
		<Fragment>
			<NavBar />
			<main className={`container ${ClassName}`} id="layout">
				{children}
			</main>
		</Fragment>
	);
};
