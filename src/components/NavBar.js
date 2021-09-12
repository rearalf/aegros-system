import React from 'react';
import { Link } from 'react-router-dom';
import logo64x64 from '../assets/image/icons/logo64x64.png';
import brand_nav from '../assets/image/brand_nav.png';
import { useNavBar } from '../hooks/useNavBar';
import {
	VscChromeMinimize,
	VscChromeClose,
	VscChromeMaximize,
	VscChromeRestore,
} from 'react-icons/vsc';
import { FiArrowRight, FiCalendar, FiHome, FiLogOut, FiMoreVertical, FiUser } from 'react-icons/fi';
import '../assets/styles/components/NavBar.scss';

export const NavBar = () => {
	const { Closed, Maximized, Minimized, date } = useNavBar();

	return (
		<header className="header">
			<nav className="navbar">
				<div className="navbar__center">
					<FiCalendar size={20} />
					{date}
				</div>
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
	);
};

export const SideBar = ({ openSideBar, changeValueSidebar }) => {
	return (
		<div className={`side__bar ${openSideBar ? 'open__sidebar' : 'close__sidebar'}`}>
			<div className="navbar__brand">
				<Link className="navbar__link__brand" to="/">
					<img src={logo64x64} alt="Aegros system" className="image__brand__1" />
					<img src={brand_nav} alt="Aegros system" className="image__brand__2" />
				</Link>
				<button className="btn__sidebar" onClick={changeValueSidebar}>
					<FiArrowRight size={20} />
				</button>
			</div>
			<div className="navbar__nav">
				<Link className="nav__link" to="/dashboard">
					<i className="nav__link__icon">
						<FiHome size={20} />
					</i>
					<span className="nav__link__text">Home</span>
				</Link>
				<Link className="nav__link" to="/appointment">
					<i className="nav__link__icon">
						<FiCalendar size={20} />
					</i>
					<span className="nav__link__text">Citas</span>
				</Link>
			</div>
			<div className="user__perfil">
				<i className="image__perfil">
					<FiUser size={30} />
				</i>
				<div className="user__perfil__info">
					<h1 className="name__perfil">Vicente Fernandez</h1>
					<h2 className="email__perfil">valemas.unbuen@amor.com</h2>
				</div>
				<button className="icon__config">
					<FiMoreVertical size={20} />
				</button>
				<div className="user__config">
					<Link className="user__config__link" to="/perfil">
						<i>
							<FiUser size={20} />
						</i>
						Perfil
					</Link>
					<Link className="user__config__link" to="/">
						<i>
							<FiLogOut size={20} />
						</i>
						Cerrar sesión
					</Link>
				</div>
			</div>
		</div>
	);
};

export const NavBarPublic = () => {
	const { Closed, Maximized, Minimized } = useNavBar();
	return (
		<header className="header__public">
			<nav className="navbar">
				<div className="navbar__brand">
					<Link className="navbar__link__brand" to="/">
						<img src={logo64x64} alt="Aegros system" className="image__brand" />
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
	);
};
