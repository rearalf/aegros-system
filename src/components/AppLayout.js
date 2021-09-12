import React, { Fragment } from 'react';
import { useNavBar } from '../hooks/useNavBar';
import { NavBar, SideBar } from './NavBar';
import { Notification } from './Notification';

export const AppLayout = ({ children, ClassName = '' }) => {
	const { openSideBar, changeValueSidebar } = useNavBar();
	return (
		<Fragment>
			<SideBar openSideBar={openSideBar} changeValueSidebar={changeValueSidebar} />
			<main
				className={`container ${ClassName} ${openSideBar
					? 'container__open__sidebar'
					: ''}`}
				id="layout">
				<NavBar />
				{children}
			</main>
			<Notification />
		</Fragment>
	);
};
