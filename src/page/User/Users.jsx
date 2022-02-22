import React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumbsComponent } from '@components'
import { Button } from '@mui/material'
import { FiUserPlus } from 'react-icons/fi'
import '@styles/page/Users.scss'

const Users = () => {
	return (
		<main className="container Users" id="layout">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Usuarios',
						link_to: '/private/users',
					},
				]}
			/>
			<header className="users__header">
				<h1>Usuarios</h1>
				<Link to="create-user">
					<Button variant="contained" className="btn_basic">
						<FiUserPlus size={18} /> Nuevo usuario
					</Button>
				</Link>
			</header>
		</main>
	)
}

export default Users
