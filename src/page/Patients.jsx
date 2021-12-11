import React from 'react'
import { Link } from 'react-router-dom'
import { FiActivity, FiUserPlus, FiSearch, FiX } from 'react-icons/fi'
import { format, formatDistanceToNow } from 'date-fns'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '../components/BreadCrumbsComponent'
import { usePatients } from '@hooks/usePatients'
import { Loading } from '../components/Loading'
import {
	Button,
	Checkbox,
	IconButton,
	MenuItem,
	Pagination,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
} from '@mui/material'
import '@styles/page/Patients.scss'

export const Patients = () => {
	const {
		patients,
		loading,
		patientSearch,
		onChangeInputSearch,
		deleteInputSearch,
		handleSearchPatients,
		onChangeStateShowSearch,
		handleResetPatients,
		pagesAndLimit,
		handleChangePage,
		handleChangeLimit,
		handleChangeAsc,
		handleChangeSortBy,
	} = usePatients()
	const { patient_name, show_patient_form, patients_search } = patientSearch
	const { currentPage, limit, totalPage, sortBy, asc, loadingSort } = pagesAndLimit

	const validaPagination =
		loading && loadingSort && patients.length && totalPage > 1 && !patients_search.length > 0

	const validationPatientParams = loading && patients.length

	const classValidationInputSearch = show_patient_form ? 'patients__search__form__show' : null

	const TableBodyPatient = (patients = []) => {
		return (
			<TableContainer className="table__basic table__patients" component={Paper}>
				<Table sx={{ minWidth: 1024 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell align="center">Fecha de nacimiento</TableCell>
							<TableCell align="center">Edad</TableCell>
							<TableCell align="center">Correo</TableCell>
							<TableCell align="center">Teléfono</TableCell>
							<TableCell align="center">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patients.map(patient => {
							const {
								_id,
								patient_name,
								patient_date_birth,
								patient_email,
								patient_phone_number,
							} = patient
							const formatDate = format(
								new Date(patient_date_birth),
								'dd - MMM - yyyy',
							)
							const resultAge = formatDistanceToNow(new Date(patient_date_birth))
							const patient_age = resultAge.split(' ')
							return (
								<TableRow
									key={_id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell>{patient_name}</TableCell>
									<TableCell align="center">{formatDate}</TableCell>
									<TableCell align="center">{patient_age[1]}</TableCell>
									<TableCell align="center">
										<Tooltip title="Enviar un correo">
											<a href={`mailto:${patient_email}`}>{patient_email}</a>
										</Tooltip>
									</TableCell>
									<TableCell align="center">{patient_phone_number}</TableCell>
									<TableCell align="center">
										<Tooltip title="Ver más">
											<Link to={`/patients/patient/${_id}`}>
												<IconButton className="btn__icon bnt__edit">
													<FiActivity size={18} />
												</IconButton>
											</Link>
										</Tooltip>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		)
	}

	return (
		<AppLayout ClassName="Patients">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Pacientes',
						link_to: '/patients',
					},
				]}
			/>
			<header className="patients__header">
				<h1>Pacientes</h1>
				<Link to="/patients/create-patient">
					<Button variant="contained" className="btn_basic">
						<FiUserPlus size={18} /> Nuevo paciente
					</Button>
				</Link>
			</header>
			{validationPatientParams ? (
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
								<IconButton
									className="btn__icon__basic"
									onClick={handleResetPatients}>
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
										<IconButton
											className="btn__icon"
											onClick={deleteInputSearch}>
											<FiX size={18} />
										</IconButton>
									),
								}}
							/>
							{patient_name.length >= 5 && (
								<Button
									variant="contained"
									className="btn_basic"
									onClick={handleSearchPatients}>
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
						<Tooltip title={`Ordenar de forma ${!asc ? 'ascendente' : 'Descendente'}`}>
							<Checkbox name="asc" checked={asc} onClick={handleChangeAsc} />
						</Tooltip>
					</div>
				</div>
			) : null}
			{loading ? loadingSort ? patients.length ? (
				TableBodyPatient(patients)
			) : (
				<h3>No hay pacientes</h3>
			) : (
				<Loading />
			) : (
				<Loading />
			)}

			{validaPagination ? (
				<Pagination
					variant="outlined"
					shape="rounded"
					count={totalPage}
					page={currentPage}
					onChange={handleChangePage}
				/>
			) : null}
		</AppLayout>
	)
}
