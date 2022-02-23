import React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumbsComponent } from '@components'
import { Button } from '@mui/material'
import { FiUserPlus } from 'react-icons/fi'
import { Loading } from '@components'
import UsersTable from './components/UsersTable'
import useUsers from '@hooks/useUsers'
import '@styles/page/Users.scss'

const Users = () => {
	const { users, validLoading, pagesAndLimit } = useUsers()
	return (
		<main className="container users" id="layout">
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
			{validLoading ? <Loading /> : null}
			<UsersTable users={users}  loading={validLoading} />
			<div className={`users__total ${validLoading ? 'hide' : ''}`}>
				<p>Total de usuarios: {pagesAndLimit.totalUser}</p>
			</div>
		</main>
	)
}

export default Users
