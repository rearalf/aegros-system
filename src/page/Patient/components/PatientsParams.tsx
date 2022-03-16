import { FiSearch, FiX } from 'react-icons/fi'
import { Checkbox, IconButton, MenuItem, TextField, Tooltip } from '@mui/material'
import { propsPatientsParams } from '../../../Interface/PatientsInterface'

const PatientsParams = ({
	loading,
	validShow,
	patientSearch,
	pagesAndLimit,
	classFormShow,
	validAditional,
	handleChangeAsc,
	handleChangeLimit,
	handleChangeInput,
	handleResetSearch,
	handleChangeSortBy,
	handleSearchPatients,
	handleChangeStateForm,
}: propsPatientsParams) => (
	<div className={`patients__params ${loading} ${validShow}`}>
		<div className="patients__search">
			<Tooltip title={validAditional.toolTipTitle}>
				<IconButton className="btn__icon__basic" onClick={handleChangeStateForm}>
					{!patientSearch.show_patient_form ? <FiSearch size={18} /> : <FiX size={18} />}
				</IconButton>
			</Tooltip>
			<form
				className={`patients__search__form ${classFormShow}`}
				onSubmit={handleSearchPatients}>
				<TextField
					id="patient_name"
					name="patient_name"
					placeholder="Buscar por nombre"
					type="text"
					className="patients__search__input"
					value={patientSearch.patient_name}
					onChange={handleChangeInput}
					autoFocus
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
		<div className="patients__params__sort">
			<TextField
				id="sort__number__patients"
				select
				className="patients__params__sort__number__patients"
				helperText="Pacientes por pagina"
				value={pagesAndLimit.limit}
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
				value={pagesAndLimit.sortBy}
				onChange={handleChangeSortBy}>
				<MenuItem value="patient_name">Nomabre</MenuItem>
				<MenuItem value="createdAt">Fecha de creación</MenuItem>
				<MenuItem value="patient_date_birth">Fecha de nacimiento</MenuItem>
			</TextField>
			<Tooltip title={`Ordenar de forma ${validAditional.sortAsc}`}>
				<Checkbox name="asc" checked={pagesAndLimit.asc} onClick={handleChangeAsc} />
			</Tooltip>
		</div>
	</div>
)

export default PatientsParams
