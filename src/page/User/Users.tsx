import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { FiUserPlus } from 'react-icons/fi'
import { Loading, BreadCrumbsComponent, EmptyData } from '../../components'
import useUsers from '../../hooks/useUsers'
import UsersTable from './components/UsersTable'
import UsersPagination from './components/UsersPagination'
import UsersParams from './components/UsersParams'
import '../../assets/styles/page/Users.scss'

const Users = () => {
	const {
		users,
		pagesAndLimit,
		userSearch,
		breadCrumbsLinks,
		classFormShow,
		validUsers,
		validLoading,
		validShowContent,
		validShowTable,
		validaPagination,
		validUserPerfil,
		validAditional,
		handleChangePage,
		handeChangeInput,
		handleChangeStateForm,
		handleSearchUser,
		handleResetSearch,
		handleChangeLimit,
		handleChangeSortBy,
		handleChangeAsc,
	} = useUsers()
	return (
		<main className="container users" id="layout">
			<BreadCrumbsComponent links={breadCrumbsLinks} />
			<header className="users__header">
				<h1>Usuarios</h1>
				<Link to="create-user">
					<Button variant="contained" className="btn_basic">
						<FiUserPlus size={18} /> Nuevo usuario
					</Button>
				</Link>
			</header>
			{validLoading ? <Loading /> : null}
			<UsersParams
				userSearch={userSearch}
				pagesAndLimit={pagesAndLimit}
				classFormShow={classFormShow}
				loading={validShowContent}
				validShow={validShowTable}
				validAditional={validAditional}
				handleChangeStateForm={handleChangeStateForm}
				handeChangeInput={handeChangeInput}
				handleSearchUser={handleSearchUser}
				handleResetSearch={handleResetSearch}
				handleChangeLimit={handleChangeLimit}
				handleChangeSortBy={handleChangeSortBy}
				handleChangeAsc={handleChangeAsc}
			/>
			<UsersTable
				users={users}
				loading={validShowContent}
				validShowTable={validShowTable}
				id_user={validUserPerfil}
			/>
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
