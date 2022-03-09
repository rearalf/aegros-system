import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { Button, IconButton, Tooltip, TextField, MenuItem, Checkbox } from '@mui/material'

const AppointmentsParams = ({
	loading,
	validShow,
	pagesAndLimit,
	classFormShow,
	validAditional,
	appointmnetSearch,
	handleChangeInput,
	handleSearchAppointmets,
	handleResetSearch,
	handleChangeStateForm,
	handleChangeLimit,
	handleChangeStatus,
	handleChangeSort,
	handleChangeAsc,
}) => (
	<div className={`appointment__params ${loading} ${validShow}`}>
		<div className="appointment__params__search">
			<Tooltip title={validAditional.toolTipTitle}>
				<IconButton className="btn__icon__basic" onClick={handleChangeStateForm}>
					{appointmnetSearch.show_search_form ? (
						<FiX size={18} />
					) : (
						<FiSearch size={18} />
					)}
				</IconButton>
			</Tooltip>
			<form
				className={`appointment__params__search__form ${classFormShow}`}
				onSubmit={handleSearchAppointmets}>
				<TextField
					id="patient_name"
					name="patient_name"
					placeholder="Buscar cita por nombre"
					type="text"
					className="appointment__params__search__form__input"
					value={appointmnetSearch.patient_search}
					onChange={handleChangeInput}
					InputProps={{
						startAdornment: <FiSearch size={25} />,
						endAdornment: (
							<Tooltip title="Cancelar busqueda">
								<IconButton
									className={`btn__icon  ${validAditional.validLengthName}`}
									onClick={handleResetSearch}>
									<FiX size={18} />
								</IconButton>
							</Tooltip>
						),
					}}
				/>
				<Tooltip title="Buscar por nombre">
					<IconButton
						variant="contained"
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
		<div className="appointment__params__sorts">
			<TextField
				id="sort__number__appointment"
				select
				className="appointment__params__sorts__input"
				helperText="Citas por pagina"
				value={pagesAndLimit.limit}
				onChange={handleChangeLimit}>
				<MenuItem value="5">5</MenuItem>
				<MenuItem value="10">10</MenuItem>
				<MenuItem value="15">15</MenuItem>
				<MenuItem value="20">20</MenuItem>
				<MenuItem value="25">25</MenuItem>
			</TextField>
			<TextField
				id="sort__type__appointment"
				select
				className="appointment__params__sorts__status"
				helperText="Mostrar tipos de citas"
				value={pagesAndLimit.sortStatus}
				onChange={handleChangeStatus}>
				<MenuItem value="Todas">Todas</MenuItem>
				<MenuItem value="Activa">Activa</MenuItem>
				<MenuItem value="Finalizada">Finalizada</MenuItem>
				<MenuItem value="Cancelada">Cancelada</MenuItem>
			</TextField>
			<TextField
				id="sort__type__appointment"
				select
				className="appointment__params__sorts__status"
				helperText="Orden de las citas"
				value={pagesAndLimit.sortBy}
				onChange={handleChangeSort}>
				<MenuItem value="createdAt">Fecha de creación</MenuItem>
				<MenuItem value="appointment_date">Fecha de la cita</MenuItem>
			</TextField>
			<Tooltip title={`Ordenar de forma ${validAditional.sortAsc}`}>
				<Checkbox name="asc" checked={pagesAndLimit.asc} onClick={handleChangeAsc} />
			</Tooltip>
		</div>
	</div>
)

export default AppointmentsParams
