import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiActivity } from 'react-icons/fi'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import useAppointments from '@hooks/useAppoitnments'
import { Loading } from '@components/Loading'
import { format, formatDistanceToNow } from 'date-fns'
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
} from '@mui/material'
import '@styles/page/Appointments.scss'

export const Appointments = () => {
	const { loading, appointments } = useAppointments()
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
								patient,
								appointment_date,
								appointment_state,
								createdAt,
							} = appointment
							const formatDate = format(
								new Date(appointment_date),
								'dd / MMM / yyyy - h:m bbbb',
							)
							const formatDateAt = formatDistanceToNow(new Date(createdAt))
							return (
								<TableRow
									key={_id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{patient.patient_name}
									</TableCell>
									<TableCell align="center">{formatDate}</TableCell>
									<TableCell align="center">{formatDateAt}</TableCell>
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
			{loading ? appointments.length ? (
				tableAppointment()
			) : (
				<h3>No hay citas</h3>
			) : (
				<Loading />
			)}
		</AppLayout>
	)
}
