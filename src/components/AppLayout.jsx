import React, { Fragment } from 'react'
import { useNavBar } from '@hooks/useNavBar'
import { NavBar, SideBar } from './NavBar'

export const AppLayout = ({ children, ClassName = '' }) => {
	const { openSideBar, changeValueSidebar } = useNavBar()
	return (
		<Fragment>
			<SideBar openSideBar={openSideBar} changeValueSidebar={changeValueSidebar} />
			<NavBar openSideBar={openSideBar} changeValueSidebar={changeValueSidebar} />
			<main className={`container ${ClassName}`} id="layout">
				{children}
			</main>
		</Fragment>
	)
}
