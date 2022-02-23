import React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumbsComponent } from '@components'
import { Button } from '@mui/material'
import { FiUserPlus } from 'react-icons/fi'
import { Loading } from '@components'
import UsersTable from './components/UsersTable'
import useUsers from '@hooks/useUsers'
import EmptyData from '@components/EmptyData'
import UsersPagination from './components/UsersPagination'
import '@styles/page/Users.scss'

const Users = () => {
	const {
		users,
		pagesAndLimit,
		validUsers,
		validLoading,
		validShowContent,
		validShowTable,
		validaPagination,
		handleChangePage,
	} = useUsers()
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
			<UsersTable users={users} loading={validShowContent} validShowTable={validShowTable} />
			{validUsers && <EmptyData loading={validLoading} title="No hay usuarios en la base." />}
			<div className={`users__total ${validShowContent}`}>
				<p>Total de usuarios: {pagesAndLimit.totalUser}</p>
			</div>
			<UsersPagination
				{...pagesAndLimit}
				validaPagination={validaPagination}
				loading={validShowContent}
				handleChangePage={handleChangePage}
			/>
		</main>
	)
}

export default Users
