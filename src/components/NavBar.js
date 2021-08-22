import React from 'react';
import { Link } from 'react-router-dom';
import logo64x64 from '../assets/image/icons/logo64x64.png';
import { useNavBar } from '../hooks/useNavBar';
import {
	VscChromeMinimize,
	VscChromeClose,
	VscChromeMaximize,
	VscChromeRestore,
} from 'react-icons/vsc';
import '../assets/styles/components/NavBar.scss';

export const NavBar = () => {
	const { Closed, Maximized, Minimized } = useNavBar();
	return (
		<header className="header">
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
