import React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { AppLayout } from '@components/AppLayout'
import { Button } from '@mui/material'
import { FiUserPlus } from 'react-icons/fi'
import '@styles/page/Users.scss'

const Users = () => {
	return (
		<AppLayout ClassName="Users">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Usuarios',
						link_to: '/users',
					},
				]}
			/>
			<header className='users__header'>
				<h1>Usuarios</h1>
				<Link to="/users/create-user">
					<Button variant="contained" className="btn_basic">
						<FiUserPlus size={18} /> Nuevo usuario
					</Button>
				</Link>
			</header>
		</AppLayout>
	)
}

export default Users
