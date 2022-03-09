import React from 'react'
import { Link } from 'react-router-dom'
import { FiActivity } from 'react-icons/fi'
import {
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

const AppointmentsTable = ({ appointments = [], loading, validShowTable }) => (
	<TableContainer
		className={`table__basic appointment__table ${loading} ${validShowTable}`}
		component={Paper}>
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
				{appointments.map(appointment => (
					<TableRow
						key={appointment._id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<TableCell component="th" scope="row">
							<Tooltip title="Ver cita">
								<Link to={`${appointment._id}`}>{appointment.patient_name}</Link>
							</Tooltip>
						</TableCell>
						<TableCell align="center">{appointment.format_appointment_date}</TableCell>
						<TableCell align="center">{appointment.format_created}</TableCell>
						<TableCell
							align="center"
							className={`appointment__table__state ${appointment.appointment_state}`}>
							{appointment.appointment_state}
						</TableCell>
						<TableCell align="center">
							<Tooltip title="Ver más">
								<Link to={appointment._id}>
									<IconButton className="btn__icon bnt__edit">
										<FiActivity size={18} />
									</IconButton>
								</Link>
							</Tooltip>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
)

export default AppointmentsTable
