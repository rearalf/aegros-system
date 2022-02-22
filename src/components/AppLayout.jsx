import React, { Fragment } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import usePrivateLayout from '@hooks/usePrivateLayout'

export const AppLayout = ({ children, ClassName = '' }) => {
	const { openSideBar, changeValueSidebar } = usePrivateLayout()
	return (
		<Fragment>
			<SideBar openSideBar={openSideBar} changeValueSidebar={changeValueSidebar} />
			<NavBar openSideBar={openSideBar} />
			<main className={`container ${ClassName}`} id="layout">
				{children}
			</main>
		</Fragment>
	)
}
