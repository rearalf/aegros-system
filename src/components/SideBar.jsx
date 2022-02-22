import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import logo64x64 from '@image/icons/logo64x64.png'
import aegros from '@image/aegros.png'
import useSideBar from '@hooks/useSideBar'
import { stringAvatar } from '@utils/utils'
import { IoPeopleOutline } from 'react-icons/io5'
import { FiChevronRight, FiCalendar, FiHome, FiLogOut, FiUsers, FiCpu } from 'react-icons/fi'
import '@styles/components/SideBar.scss'

const SideBar = ({ openSideBar, changeValueSidebar }) => {
	const {
		dataUser,
		stateLinkDashboard,
		stateLinkAppointment,
		stateLinkPatient,
		stateLinkUsers,
		stateLinkSystem,
		handleLogOut,
	} = useSideBar()
	return (
		<div className={`side__bar ${openSideBar ? 'open__sidebar' : 'close__sidebar'}`}>
			<div className="navbar__brand">
				<Link className="navbar__brand__link" to="/private/">
					<img src={logo64x64} alt="Aegros system" className="image__brand__1" />
					<img src={aegros} alt="Aegros system" className="image__brand__2" />
				</Link>
			</div>
			<div className="navbar__nav">
				<Link className={`nav__link ${stateLinkDashboard}`} to="/private/">
					<i className="nav__link__icon">
						<FiHome size={18} />
					</i>
					<span className="nav__link__text">Inicio</span>
				</Link>
				<Link className={`nav__link ${stateLinkAppointment}`} to="/private/appointments">
					<i className="nav__link__icon">
						<FiCalendar size={18} />
					</i>
					<span className="nav__link__text">Citas</span>
				</Link>
				<Link className={`nav__link ${stateLinkPatient}`} to="/private/patients">
					<i className="nav__link__icon">
						<FiUsers size={18} />
					</i>
					<span className="nav__link__text">Pacientes</span>
				</Link>
				<Link className={`nav__link ${stateLinkUsers}`} to="/private/users">
					<i className="nav__link__icon">
						<IoPeopleOutline size={20} />
					</i>
					<span className="nav__link__text">Usuarios</span>
				</Link>
				<Link className={`nav__link ${stateLinkSystem}`} to="/private/system">
					<i className="nav__link__icon">
						<FiCpu size={18} />
					</i>
					<span className="nav__link__text">Sistema</span>
				</Link>
			</div>
			<div className="side__bar__footer">
				<Tooltip title="Abrir menu">
					<IconButton
						className="btn__icon side__bar__footer__action__side__bar"
						onClick={changeValueSidebar}>
						<FiChevronRight size={18} />
					</IconButton>
				</Tooltip>
				<div className="side__bar__footer__user">
					<Avatar
						className="side__bar__footer__user__avatar"
						{...stringAvatar(dataUser.user_name)}
					/>
					<article className="side__bar__footer__user__data">
						<h2 className="side__bar__footer__user__data__name">
							{dataUser.user_name}
						</h2>
						<small className="side__bar__footer__user__data__role">
							{dataUser.user_role}
						</small>
					</article>
					<Tooltip title="Cerrar Sesión">
						<IconButton
							className="btn__icon side__bar__footer__user__data__logout"
							onClick={handleLogOut}>
							<FiLogOut size={18} />
						</IconButton>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default SideBar
