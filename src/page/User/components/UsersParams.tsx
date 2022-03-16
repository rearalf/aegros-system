import { FiSearch, FiX } from 'react-icons/fi'
import { Checkbox, IconButton, MenuItem, TextField, Tooltip } from '@mui/material'
import { propsUsersParams } from '../../../Interface/UsersInterface'

const UsersParams = ({
	loading,
	validShow,
	userSearch,
	pagesAndLimit,
	classFormShow,
	validAditional,
	handleChangeAsc,
	handeChangeInput,
	handleSearchUser,
	handleResetSearch,
	handleChangeLimit,
	handleChangeSortBy,
	handleChangeStateForm,
}: propsUsersParams) => (
	<div className={`users__params ${loading} ${validShow}`}>
		<div className="users__params__search">
			<Tooltip title={`${validAditional.toolTipTitle}`}>
				<IconButton className="btn__icon__basic" onClick={handleChangeStateForm}>
					{!userSearch.show_users_form ? <FiSearch size={18} /> : <FiX size={18} />}
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
					value={userSearch.user_name}
					onChange={handeChangeInput}
					InputProps={{
						startAdornment: <FiSearch size={25} />,
						endAdornment: (
							<Tooltip title="Cancelar busqueda">
								<IconButton
									className={`btn__icon ${validAditional.validLengthName}`}
									onClick={handleResetSearch}>
									<FiX size={18} />
								</IconButton>
							</Tooltip>
						),
					}}
				/>
				<Tooltip title="Buscar por nombre">
					<IconButton
						className={`btn__icon__basic ${validAditional.validLengthName}`}
						type="submit">
						<FiSearch size={18} />
					</IconButton>
				</Tooltip>
				<Tooltip title="Cancelar busqueda">
					<IconButton
						className={`btn__icon__basic ${validAditional.validLengthName}`}
						onClick={handleResetSearch}>
						<FiX size={18} />
					</IconButton>
				</Tooltip>
			</form>
		</div>
		<div className="users__params__sort">
			<TextField
				id="sort__number__users"
				select
				className="users__params__sort__number"
				helperText="Usuarios por pagina"
				value={pagesAndLimit.limit}
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
				value={pagesAndLimit.sortBy}
				onChange={handleChangeSortBy}>
				<MenuItem value="user_name">Nombre</MenuItem>
				<MenuItem value="user_role">Rol</MenuItem>
				<MenuItem value="createdAt">Fecha de creación</MenuItem>
			</TextField>
			<Tooltip title={`Ordenar de forma ${validAditional.sortAsc}`}>
				<Checkbox name="asc" checked={pagesAndLimit.asc} onClick={handleChangeAsc} />
			</Tooltip>
		</div>
	</div>
)

export default UsersParams
