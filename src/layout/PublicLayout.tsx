import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '../components/PublicNavBar'

const PublicLayout = () => {
	return (
		<React.Fragment>
			<PublicNavBar />
			<Outlet />
		</React.Fragment>
	)
}

export default PublicLayout
