import React from 'react'
import { Link } from 'react-router-dom'
import { FiActivity, FiFrown } from 'react-icons/fi'
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

const UsersTable = ({ users = [], loading }) => {
	if (users.length === 0 && !loading) {
		return <h3 className={`${loading ? 'hide' : ''}`}>No hay usuario</h3>
	}
	return (
		<TableContainer
			className={`table__basic table__users ${loading ? 'hide' : ''}`}
			component={Paper}>
			<Table sx={{ minWidth: 1024 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Nombre</TableCell>
						<TableCell align="center">Correo</TableCell>
						<TableCell align="center">Rol</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map(({ _id, user_role, user_name, user_email, user_state }) => (
						<TableRow
							key={_id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell
								className={`${user_state ? null : 'table__users__row__disabled'}`}>
								<Tooltip
									title={`${user_state
										? 'Ver perfil del usuario'
										: 'Usuario deshabilitado. Ver perfil del usuario'}`}>
									<Link to={`${_id}`}>
										<div>
											{user_state ? null : <FiFrown size={18} />}
											{user_name}
										</div>
									</Link>
								</Tooltip>
							</TableCell>
							<TableCell align="center">
								<Tooltip title="Enviar un correo">
									<a className="link" href={`mailto:${user_email}`}>
										{user_email}
									</a>
								</Tooltip>
							</TableCell>
							<TableCell align="center">{user_role}</TableCell>
							<TableCell align="center" className="table__users__row__actions">
								<Tooltip title="Ver más">
									<Link to={`${_id}`}>
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
}

export default UsersTable
