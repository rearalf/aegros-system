import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { Checkbox, IconButton, MenuItem, TextField, Tooltip } from '@mui/material'

const UsersParams = ({
	loading,
	validShow,
	userSearch,
	pagesAndLimit,
	classFormShow,
	handeChangeInput,
	handleSearchUser,
	handleChangeStateForm,
	handleResetSearch,
	handleChangeLimit,
	handleChangeSortBy,
	handleChangeAsc,
}) => {
	const { user_name, show_users_form } = userSearch
	const { limit, sortBy, asc } = pagesAndLimit
	return (
		<div className={`users__params ${loading} ${validShow}`}>
			<div className="users__params__search">
				<Tooltip title={`${!show_users_form ? 'Buscar por nombre' : 'Cancelar busqueda'}`}>
					<IconButton className="btn__icon__basic" onClick={handleChangeStateForm}>
						{!show_users_form ? <FiSearch size={18} /> : <FiX size={18} />}
					</IconButton>
				</Tooltip>
				<form
					className={`users__params__search__form ${classFormShow}`}
					onSubmit={handleSearchUser}>
					<TextField
						id="patient_name"
						name="patient_name"
						placeholder="Buscar por nombre"
						type="text"
						className="users__params__search__form__input"
						value={user_name}
						onChange={handeChangeInput}
						InputProps={{
							startAdornment: <FiSearch size={25} />,
							endAdornment: (
								<IconButton
									className={`btn__icon ${user_name.length >= 5 ? '' : 'hide'}`}
									onClick={handleResetSearch}>
									<Tooltip title="Cancelar busqueda">
										<i>
											<FiX size={18} />
										</i>
									</Tooltip>
								</IconButton>
							),
						}}
					/>
					<IconButton
						className={`btn__icon__basic ${user_name.length >= 5 ? '' : 'hide'}`}
						type="submit">
						<Tooltip title="Buscar por nombre">
							<i>
								<FiSearch size={18} />
							</i>
						</Tooltip>
					</IconButton>
					<IconButton
						className={`btn__icon__basic ${user_name.length >= 5 ? '' : 'hide'}`}
						onClick={handleResetSearch}>
						<Tooltip title="Cancelar busqueda">
							<i>
								<FiX size={18} />
							</i>
						</Tooltip>
					</IconButton>
				</form>
			</div>
			<div className="users__params__sort">
				<TextField
					id="sort__number__users"
					select
					className="users__params__sort__number"
					helperText="Usuarios por pagina"
					value={limit}
					onChange={handleChangeLimit}>
					<MenuItem value="5">5</MenuItem>
					<MenuItem value="10">10</MenuItem>
					<MenuItem value="15">15</MenuItem>
					<MenuItem value="20">20</MenuItem>
					<MenuItem value="25">25</MenuItem>
				</TextField>
				<TextField
					id="sort__type__users"
					select
					className="users__params__sort__role"
					helperText="Ordenar usuarios"
					value={sortBy}
					onChange={handleChangeSortBy}>
					<MenuItem value="user_name">Nombre</MenuItem>
					<MenuItem value="user_role">Rol</MenuItem>
					<MenuItem value="createdAt">Fecha de creación</MenuItem>
				</TextField>
				<Tooltip title={`Ordenar de forma ${asc ? 'Descendente' : 'Ascendente'}`}>
					<Checkbox name="asc" checked={asc} onClick={handleChangeAsc} />
				</Tooltip>
			</div>
		</div>
	)
}

export default UsersParams
