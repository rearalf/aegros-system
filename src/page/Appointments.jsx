import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiActivity, FiSearch, FiX } from 'react-icons/fi'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import useAppointments from '@hooks/useAppoitnments'
import { Loading } from '@components/Loading'
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	TextField,
	MenuItem,
	Pagination,
	Checkbox,
} from '@mui/material'
import '@styles/page/Appointments.scss'

export const Appointments = () => {
	const {
		loading,
		appointments,
		appointmnetSearch,
		pagesAndLimit,
		handleChangePage,
		handleChangeInput,
		handleSearchAppointmets,
		handleChangeStateShowSearch,
		handleResetSearchAppointment,
		handleChangeLimit,
		handleChangeStatus,
		handleChangeSort,
		handleChangeAsc,
	} = useAppointments()
	const { patient_search, show_search_form } = appointmnetSearch
	const {
		totalAppointments,
		totalPages,
		currentPage,
		limit,
		loadingSort,
		sortStatus,
		sortBy,
		asc,
	} = pagesAndLimit
	const class_validation_form = show_search_form
		? 'appointment__params__search__form__show'
		: null
	const validaPagination =
		loading &&
		loadingSort &&
		appointments.length &&
		totalPages > 1 &&
		!patient_search.length > 0
	const tableAppointment = () => {
		return (
			<TableContainer className="table__basic appointment__table" component={Paper}>
				<Table sx={{ minWidth: 1024 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Nombre del paciente</TableCell>
							<TableCell align="center">Fecha de la cita</TableCell>
							<TableCell align="center">Creado</TableCell>
							<TableCell align="center">Estado</TableCell>
							<TableCell align="center">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{appointments.map(appointment => {
							const {
								_id,
								appointment_state,
								format_appointment_date,
								format_created,
								patient_name,
							} = appointment
							return (
								<TableRow
									key={_id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{patient_name}
									</TableCell>
									<TableCell align="center">{format_appointment_date}</TableCell>
									<TableCell align="center">{format_created}</TableCell>
									<TableCell
										align="center"
										className={`appointment__table__state ${appointment_state}`}>
										{appointment_state}
									</TableCell>
									<Tooltip title="Ver más">
										<TableCell align="center">
											<Link to={`/appointments/${_id}`}>
												<IconButton className="btn__icon bnt__edit">
													<FiActivity size={18} />
												</IconButton>
											</Link>
										</TableCell>
									</Tooltip>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		)
	}
	return (
		<AppLayout ClassName="Appointments">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Citas',
						link_to: '/appointments',
					},
				]}
			/>
			<header className="appointments__header">
				<h1 className="appointments__header__title">Citas</h1>
				<Link to="/appointments/creat-appointment">
					<Button variant="contained" className="btn_basic">
						<FiCalendar size={18} /> Nuevo cita
					</Button>
				</Link>
			</header>
			{loading && appointments.length > 0 ? (
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
							className={`appointment__params__search__form ${class_validation_form}`}
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
							helperText="Mostrar tipos de citas"
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
			) : null}
			{loading && loadingSort ? appointments.length ? (
				tableAppointment()
			) : (
				<h3>No hay citas</h3>
			) : (
				<Loading />
			)}
			{loading &&
			loadingSort &&
			appointments.length > 0 && (
				<div className="appointments__total__appointment">
					<p className="appointments__total__appointment__text">
						Total de citas: <b>{totalAppointments}</b>
					</p>
				</div>
			)}
			{validaPagination ? (
				<Pagination
					variant="outlined"
					shape="rounded"
					count={totalPages}
					page={currentPage}
					onChange={handleChangePage}
				/>
			) : null}
		</AppLayout>
	)
}
