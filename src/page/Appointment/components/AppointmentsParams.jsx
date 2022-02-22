import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { Button, IconButton, Tooltip, TextField, MenuItem, Checkbox } from '@mui/material'

const AppointmentsParams = ({
	validForm,
	pagesAndLimit,
	appointmnetSearch,
	classValidationFormShow,
	handleChangeInput,
	handleSearchAppointmets,
	handleChangeStateShowSearch,
	handleResetSearchAppointment,
	handleChangeLimit,
	handleChangeStatus,
	handleChangeSort,
	handleChangeAsc,
}) => {
	const { patient_search, show_search_form } = appointmnetSearch
	const { limit, sortStatus, sortBy, asc } = pagesAndLimit
	if (validForm)
		return (
			<div className="appointment__params">
				<div className="appointment__params__search">
					{!show_search_form && (
						<Tooltip title="Buscar cita por nombre del paciente">
							<IconButton
								className="btn__icon__basic"
								onClick={handleChangeStateShowSearch}>
								<FiSearch size={18} />
							</IconButton>
						</Tooltip>
					)}
					{show_search_form && (
						<Tooltip title="Cancelar busqueda">
							<IconButton
								className="btn__icon__basic"
								onClick={handleResetSearchAppointment}>
								<FiX size={18} />
							</IconButton>
						</Tooltip>
					)}
					<form
						className={`appointment__params__search__form ${classValidationFormShow}`}
						onSubmit={handleSearchAppointmets}>
						<TextField
							id="patient_name"
							name="patient_name"
							placeholder="Buscar cita por nombre del paciente"
							type="text"
							className="appointment__params__search__form__input"
							value={patient_search}
							onChange={handleChangeInput}
							InputProps={{
								startAdornment: <FiSearch size={25} />,
								endAdornment: patient_search.length > 0 && (
									<Tooltip title="Cancelar busqueda">
										<IconButton
											className="btn__icon"
											onClick={handleResetSearchAppointment}>
											<FiX size={18} />
										</IconButton>
									</Tooltip>
								),
							}}
						/>
						{patient_search.length >= 5 && (
							<Button variant="contained" className="btn_basic" type="submit">
								<FiSearch size={18} /> Buscar
							</Button>
						)}
					</form>
				</div>
				<div className="appointment__params__sorts">
					<TextField
						id="sort__number__appointment"
						select
						className="appointment__params__sorts__input"
						helperText="Citas por pagina"
						value={limit}
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
						value={sortStatus}
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
						value={sortBy}
						onChange={handleChangeSort}>
						<MenuItem value="createdAt">Fecha de creación</MenuItem>
						<MenuItem value="appointment_date">Fecha de la cita</MenuItem>
					</TextField>
					<Tooltip title={`Ordenar de forma ${!asc ? 'ascendente' : 'Descendente'}`}>
						<Checkbox name="asc" checked={asc} onClick={handleChangeAsc} />
					</Tooltip>
				</div>
			</div>
		)
	return null
}

export default AppointmentsParams
