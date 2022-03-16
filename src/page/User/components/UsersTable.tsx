import { Link } from 'react-router-dom'
import { FiActivity, FiFrown } from 'react-icons/fi'
import { getRole } from '../../../utils/Utils'
import { propsUsersTable, userTableInterface } from '../../../Interface/UsersInterface'
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

const UsersTable = ({ users = [], loading, validShowTable, id_user }: propsUsersTable) => (
	<TableContainer
		className={`table__basic table__users ${loading} ${validShowTable}`}
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
				{users.map((user: userTableInterface) => (
					<TableRow
						key={user._id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
						<TableCell
							className={`${user.user_state ? null : 'table__users__row__disabled'}`}>
							<Tooltip
								title={`${user.user_state
									? 'Ver perfil del usuario'
									: 'Usuario deshabilitado. Ver perfil del usuario'}`}>
								<Link to={`${user._id}`}>
									<div>
										{user.user_state ? null : <FiFrown size={18} />}
										{user.user_name}
									</div>
								</Link>
							</Tooltip>
						</TableCell>
						<TableCell align="center">
							<Tooltip title="Enviar un correo">
								<a className="link" href={`mailto:${user.user_email}`}>
									{user.user_email}
								</a>
							</Tooltip>
						</TableCell>
						<TableCell align="center">{getRole(user.user_role)}</TableCell>
						<TableCell align="center" className="table__users__row__actions">
							{id_user === user._id ? (
								''
							) : (
								<Tooltip title="Ver más">
									<Link to={`${user._id}`}>
										<IconButton className="btn__icon">
											<FiActivity size={18} />
										</IconButton>
									</Link>
								</Tooltip>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
)

export default UsersTable
