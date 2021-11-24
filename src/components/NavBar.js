import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo64x64 from '@image/icons/logo64x64.png'
import brand_nav from '@image/brand_nav.png'
import aegros from '@image/aegros.png'
import { useNavBar, useSideBar } from '@hooks/useNavBar'
import { FiChevronRight, FiCalendar, FiHome, FiLogOut } from 'react-icons/fi'
import {
	VscChromeMinimize,
	VscChromeClose,
	VscChromeMaximize,
	VscChromeRestore,
} from 'react-icons/vsc'
import { Avatar, IconButton } from '@mui/material'
import { stringAvatar } from '@utils/utils'
import '@styles/components/NavBar.scss'

export const NavBar = ({ openSideBar }) => {
	const { Closed, Maximized, Minimized, date } = useNavBar()

	return (
		<header className={`header ${openSideBar ? 'open__sidebar' : 'close__sidebar'}`}>
			<nav className="navbar">
				<h3 className="navbar__center">
					<FiCalendar size={20} />
					{date}
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
		changeValueSidebarOnBluer,
		changeValueSidebarOnFocus,
		stateLinkDashboard,
		stateLinkAppointment,
	} = useSideBar({ openSideBar, changeValueSidebar })
	return (
		<div
			className={`side__bar ${openSideBar ? 'open__sidebar' : 'close__sidebar'}`}
			onBlur={changeValueSidebarOnBluer}
			onFocus={changeValueSidebarOnFocus}>
			<div className="navbar__brand">
				<Link className="navbar__brand__link" to="/">
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
				<Link className={`nav__link ${stateLinkAppointment}`} to="/appointment">
					<i className="nav__link__icon">
						<FiCalendar size={18} />
					</i>
					<span className="nav__link__text">Citas</span>
				</Link>
			</div>
			<div className="side__bar__footer">
				<IconButton
					className="btn__icon side__bar__footer__action__side__bar"
					onClick={changeValueSidebar}>
					<FiChevronRight size={18} />
				</IconButton>
				<div className="side__bar__footer__user">
					<Avatar
						className="side__bar__footer__user__avatar"
						{...stringAvatar('Ricardo Alfaro')}
					/>
					<article className="side__bar__footer__user__data">
						<h2 className="side__bar__footer__user__data__name">Mulan Rodriguez</h2>
						<small className="side__bar__footer__user__data__role">
							Doctora Rashos X
						</small>
					</article>
					<IconButton className="btn__icon side__bar__footer__user__data__logout">
						<FiLogOut size={18} />
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export const NavBarPublic = () => {
	const { Closed, Maximized, Minimized } = useNavBar()
	return (
		<header className="header__public">
			<nav className="navbar">
				<div className="navbar__brand">
					<Link className="navbar__link__brand" to="/">
						<img src={brand_nav} alt="Aegros system" className="image__brand" />
					</Link>
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
