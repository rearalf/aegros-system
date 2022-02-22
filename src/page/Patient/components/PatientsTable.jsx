import React from 'react'
import { Link } from 'react-router-dom'
import { FiActivity, FiFrown, FiCalendar } from 'react-icons/fi'
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

const PatientsTable = ({ patients = [] }) => {
	if (!patients.length) {
		return <h3>No hay pacientes</h3>
	}
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
							patient_email,
							patient_phone_number,
							patient_state,
							patient_age,
							formatDate,
						} = patient
						return (
							<TableRow
								key={_id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell
									className={`${patient_state
										? null
										: 'table__patients__row__disabled'}`}>
									<Tooltip
										title={`${patient_state
											? 'Ver perfil del paciente'
											: 'Paciente deshabilitado. Ver perfil del paciente'}`}>
										<Link to={`${_id}`}>
											<div>
												{patient_state ? null : <FiFrown size={18} />}
												{patient_name}
											</div>
										</Link>
									</Tooltip>
								</TableCell>
								<TableCell align="center">{formatDate}</TableCell>
								<TableCell align="center">{patient_age}</TableCell>
								<TableCell align="center">
									{patient_email ? (
										<Tooltip title="Enviar un correo">
											<a href={`mailto:${patient_email}`}>{patient_email}</a>
										</Tooltip>
									) : (
										'Datos no proporcionados'
									)}
								</TableCell>
								<TableCell align="center">
									{patient_phone_number ? (
										patient_phone_number
									) : (
										'Datos no proporcionados'
									)}
								</TableCell>
								<TableCell align="center" className="table__patients__row__actions">
									<Tooltip title="Crear cita">
										<Link to={`/private/appointments/creat-appointment/${_id}`}>
											<IconButton className="btn__icon bnt__edit">
												<FiCalendar size={18} />
											</IconButton>
										</Link>
									</Tooltip>
									<Tooltip title="Ver más">
										<Link to={`${_id}`}>
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

export default PatientsTable
