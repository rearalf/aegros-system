import React, { Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SideBar, NavBar } from '@components'
import usePrivateLayout from '@hooks/usePrivateLayout'

const PrivateLayout = () => {
	const { pathname } = useLocation()
	console.log(pathname)
	const { openSideBar, changeValueSidebar } = usePrivateLayout()
	return (
		<Fragment>
			<SideBar openSideBar={openSideBar} changeValueSidebar={changeValueSidebar} />
			<NavBar openSideBar={openSideBar} />
			<Outlet />
		</Fragment>
	)
}

export default PrivateLayout
