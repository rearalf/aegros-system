import { Link } from 'react-router-dom'
import { FiActivity, FiFrown, FiCalendar } from 'react-icons/fi'
import { patientInterface, propsPatientsTable } from '../../../Interface/PatientsInterface'
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

const PatientsTable = ({ patients = [], loading, validShowTable }: propsPatientsTable) => (
	<TableContainer
		className={`table__basic table__patients ${loading} ${validShowTable}`}
		component={Paper}>
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
				{patients.map((patient: patientInterface) => (
					<TableRow
						key={patient._id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<TableCell
							className={`${patient.patient_state
								? null
								: 'table__patients__row__disabled'}`}>
							<Tooltip
								title={`${patient.patient_state
									? 'Ver perfil del paciente'
									: 'Paciente deshabilitado. Ver perfil del paciente'}`}>
								<Link to={`${patient._id}`}>
									<div>
										{patient.patient_state ? null : <FiFrown size={18} />}
										{patient.patient_name}
									</div>
								</Link>
							</Tooltip>
						</TableCell>
						<TableCell align="center">{patient.patient_date_birth_format}</TableCell>
						<TableCell align="center">{patient.patient_age}</TableCell>
						<TableCell align="center">
							{patient.patient_email ? (
								<Tooltip title="Enviar un correo">
									<a
										href={`mailto:${patient.patient_email}`}
										className="additional__contact">
										{patient.patient_email}
									</a>
								</Tooltip>
							) : (
								'Datos no proporcionados'
							)}
						</TableCell>
						<TableCell align="center">
							{patient.patient_phone_number ? (
								<Tooltip title="Llamar al paciente">
									<a
										href={`tel:${patient.patient_phone_number}`}
										className="additional__contact">
										{patient.patient_phone_number}
									</a>
								</Tooltip>
							) : (
								'Datos no proporcionados'
							)}
						</TableCell>
						<TableCell align="center" className="table__patients__row__actions">
							<Tooltip title="Crear cita">
								<Link to={`/private/appointments/creat-appointment/${patient._id}`}>
									<IconButton className="btn__icon bnt__edit">
										<FiCalendar size={18} />
									</IconButton>
								</Link>
							</Tooltip>
							<Tooltip title="Ver más">
								<Link to={`${patient._id}`}>
									<IconButton className="btn__icon">
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

export default PatientsTable
