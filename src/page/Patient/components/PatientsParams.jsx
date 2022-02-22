import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { Button, Checkbox, IconButton, MenuItem, TextField, Tooltip } from '@mui/material'

const PatientsParams = ({
	patientSearch,
	pagesAndLimit,
	classValidationInputSearch,
	onChangeInputSearch,
	handleSearchPatients,
	onChangeStateShowSearch,
	handleResetPatients,
	handleChangeLimit,
	handleChangeAsc,
	handleChangeSortBy,
	validationPatientParams,
}) => {
	const { patient_name, show_patient_form } = patientSearch
	const { limit, sortBy, asc } = pagesAndLimit
	if (validationPatientParams)
		return (
			<div className="patients__params">
				<div className="patients__search">
					{!show_patient_form && (
						<Tooltip title="Buscar por nombre">
							<IconButton
								className="btn__icon__basic"
								onClick={onChangeStateShowSearch}>
								<FiSearch size={18} />
							</IconButton>
						</Tooltip>
					)}
					{show_patient_form && (
						<Tooltip title="Cancelar busqueda">
							<IconButton className="btn__icon__basic" onClick={handleResetPatients}>
								<FiX size={18} />
							</IconButton>
						</Tooltip>
					)}
					<form
						className={`patients__search__form ${classValidationInputSearch}`}
						onSubmit={handleSearchPatients}>
						<TextField
							id="patient_name"
							name="patient_name"
							placeholder="Buscar por nombre"
							type="text"
							className="patients__search__input"
							value={patient_name}
							onChange={onChangeInputSearch}
							InputProps={{
								startAdornment: <FiSearch size={25} />,
								endAdornment: patient_name.length > 0 && (
									<IconButton className="btn__icon" onClick={handleResetPatients}>
										<FiX size={18} />
									</IconButton>
								),
							}}
						/>
						{patient_name.length >= 5 && (
							<Button variant="contained" className="btn_basic" type="submit">
								<FiSearch size={18} /> Buscar
							</Button>
						)}
					</form>
				</div>
				<div className="patients__params__sort">
					<TextField
						id="sort__number__patients"
						select
						className="patients__params__sort__number__patients"
						helperText="Pacientes por pagina"
						value={limit}
						onChange={handleChangeLimit}>
						<MenuItem value="5">5</MenuItem>
						<MenuItem value="10">10</MenuItem>
						<MenuItem value="15">15</MenuItem>
						<MenuItem value="20">20</MenuItem>
						<MenuItem value="25">25</MenuItem>
					</TextField>
					<TextField
						id="sort__type__patients"
						select
						className="patients__params__sort__type__patients"
						helperText="Ordenar pacientes"
						value={sortBy}
						onChange={handleChangeSortBy}>
						<MenuItem value="patient_name">Nomabre</MenuItem>
						<MenuItem value="createdAt">Fecha de creación</MenuItem>
						<MenuItem value="patient_date_birth">Fecha de nacimiento</MenuItem>
					</TextField>
					<Tooltip title={`Ordenar de forma ${!asc ? 'Ascendente' : 'Descendente'}`}>
						<Checkbox name="asc" checked={asc} onClick={handleChangeAsc} />
					</Tooltip>
				</div>
			</div>
		)
	return null
}

export default PatientsParams
