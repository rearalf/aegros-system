import React from 'react'
import { Link } from 'react-router-dom'
import logo64x64 from '@image/icons/logo64x64.png'
import brand_nav from '@image/brand_nav.png'
import aegros from '@image/aegros.png'
import { useNavBar, useSideBar } from '@hooks/useNavBar'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import { stringAvatar } from '@utils/utils'
import { IoPeopleOutline } from 'react-icons/io5'
import {
	FiChevronRight,
	FiCalendar,
	FiHome,
	FiLogOut,
	FiUsers,
	FiCpu,
	FiUser,
	FiArrowRight,
} from 'react-icons/fi'
import {
	VscChromeMinimize,
	VscChromeClose,
	VscChromeMaximize,
	VscChromeRestore,
} from 'react-icons/vsc'
import '@styles/components/NavBar.scss'

export const NavBar = ({ openSideBar, changeValueSidebar }) => {
	const { Closed, Maximized, Minimized, dateTime } = useNavBar()
	const { date, hours, minutes, timeSystem } = dateTime

	return (
		<header className={`header ${openSideBar ? 'open__sidebar' : 'close__sidebar'}`}>
			<nav className="navbar">
				<Tooltip title="Abrir menu">
					<IconButton
						className="btn__icon navbar__button__icon"
						onClick={changeValueSidebar}>
						<FiArrowRight size={18} />
					</IconButton>
				</Tooltip>
				<h3 className="navbar__center">
					<FiCalendar size={20} />
					{date} - {hours}:{minutes} {timeSystem}
				</h3>
				<div className="navbar__actions">
					<IconButton className="right__side__button__icon" onClick={Minimized}>
						<VscChromeMinimize title={'Minimizar ventana'} size={20} />
					</IconButton>
					<IconButton
						id="maximize"
						className="right__side__button__icon"
						onClick={Maximized}>
						<VscChromeMaximize title={'Maximizar ventana'} size={20} />
					</IconButton>
					<IconButton
						id="restore"
						className="right__side__button__icon hide__btn"
						onClick={Maximized}>
						<VscChromeRestore title={'Restaurar ventana'} size={20} />
					</IconButton>
					<IconButton className="right__side__button__icon" onClick={Closed}>
						<VscChromeClose title={'Cerrar Ventana'} size={20} />
					</IconButton>
				</div>
			</nav>
		</header>
	)
}

export const SideBar = ({ openSideBar, changeValueSidebar }) => {
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
				<Link className="navbar__brand__link" to="/dashboard">
					<img src={logo64x64} alt="Aegros system" className="image__brand__1" />
					<img src={aegros} alt="Aegros system" className="image__brand__2" />
				</Link>
			</div>
			<div className="navbar__nav">
				<Link className={`nav__link ${stateLinkDashboard}`} to="/dashboard">
					<i className="nav__link__icon">
						<FiHome size={18} />
					</i>
					<span className="nav__link__text">Home</span>
				</Link>
				<Link className={`nav__link ${stateLinkAppointment}`} to="/appointments">
					<i className="nav__link__icon">
						<FiCalendar size={18} />
					</i>
					<span className="nav__link__text">Citas</span>
				</Link>
				<Link className={`nav__link ${stateLinkPatient}`} to="/patients">
					<i className="nav__link__icon">
						<FiUsers size={18} />
					</i>
					<span className="nav__link__text">Pacientes</span>
				</Link>
				<Link className={`nav__link ${stateLinkUsers}`} to="/users">
					<i className="nav__link__icon">
						<IoPeopleOutline size={20} />
					</i>
					<span className="nav__link__text">Usuarios</span>
				</Link>
				<Link className={`nav__link ${stateLinkSystem}`} to="/system">
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

export const NavBarPublic = () => {
	const { Closed, Maximized, Minimized, loading } = useNavBar()
	return (
		<header className="header__public">
			<nav className="navbar">
				<div className="navbar__brand">
					<span className="navbar__link__brand">
						<img
							src={brand_nav}
							alt="Aegros"
							className={`image__brand ${loading ? 'load_image' : null} `}
						/>
					</span>
				</div>
				<div className="navbar__center" />
				<div className="navbar__actions">
					<button className="right__side__button__icon" onClick={Minimized}>
						<VscChromeMinimize title={'Minimizar ventana'} size={20} />
					</button>
					<button id="maximize" className="right__side__button__icon" onClick={Maximized}>
						<VscChromeMaximize title={'Maximizar ventana'} size={20} />
					</button>
					<button
						id="restore"
						className="right__side__button__icon hide__btn"
						onClick={Maximized}>
						<VscChromeRestore title={'Restaurar ventana'} size={20} />
					</button>
					<button className="right__side__button__icon" onClick={Closed}>
						<VscChromeClose title={'Cerrar Ventana'} size={20} />
					</button>
				</div>
			</nav>
		</header>
	)
}
