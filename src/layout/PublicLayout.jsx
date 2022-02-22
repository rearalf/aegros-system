import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '@components/PublicNavBar'

const PublicLayout = () => {
	return (
		<Fragment>
			<PublicNavBar />
			<Outlet />
		</Fragment>
	)
}

export default PublicLayout
