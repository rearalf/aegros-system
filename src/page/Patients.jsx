import React from 'react'
import { Link } from 'react-router-dom'
import { FiActivity, FiUserPlus } from 'react-icons/fi'
import { format, formatDistanceToNow } from 'date-fns'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '../components/BreadCrumbsComponent'
import { usePatients } from '@hooks/usePatients'
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
import '@styles/page/Patients.scss'

export const Patients = () => {
	const { patients, loading } = usePatients()

	const TableBodyPatient = (patients = []) => {
		return patients.map(patient => {
			const {
				_id,
				patient_name,
				patient_date_birth,
				patient_email,
				patient_phone_number,
			} = patient
			const formatDate = format(new Date(patient_date_birth), 'dd - MMM - yyyy')
			const resultAge = formatDistanceToNow(new Date(patient_date_birth))
			const patient_age = resultAge.split(' ')
			return (
				<TableRow key={_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
					<TableCell>{patient_name}</TableCell>
					<TableCell align="center">{formatDate}</TableCell>
					<TableCell align="center">{patient_age[1]}</TableCell>
					<TableCell align="center">{patient_email}</TableCell>
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
		})
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
			{loading ? patients.length ? (
				<TableContainer className="table__patients" component={Paper}>
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
						<TableBody>{TableBodyPatient(patients)}</TableBody>
					</Table>
				</TableContainer>
			) : (
				<h3>No hay pacientes</h3>
			) : (
				<p>Cargando</p>
			)}
		</AppLayout>
	)
}
