import React, { Fragment } from 'react';
import { NavBarPublic } from '../components/NavBar';
import imageLogin from '../assets/image/image-login.svg';
import bigBrandWhite from '../assets/image/big-brand-white.png';
import { InputEmail, InputPassword } from '../components/Inputs';
import { useLogin } from '../hooks/useLogin';
import { Notification } from '../components/Notification';
import '../assets/styles/page/Login.scss';

export const Login = () => {
	const { email, password, handleChange, errroEmail, errorPassword, handleLogin } = useLogin();
	return (
		<Fragment>
			<NavBarPublic />
			<main className="container login__container" id="layout">
				<div className="left__side">
					<h1>Hola!!</h1>
					<h2>Inicia Sesión</h2>
					<form className="form__login" onSubmit={handleLogin}>
						<InputEmail
							placeholder="correo@caliente.com"
							id="email"
							labelText="Correo *"
							value={email}
							onChange={handleChange}
							valid={errroEmail}
						/>
						<InputPassword
							placeholder="Min 8 caracteres"
							id="password"
							labelText="Contraseña"
							value={password}
							onChange={handleChange}
							valid={errorPassword}
						/>
						<button className="btn btn__primary" type="submit">
							Iniciar
						</button>
					</form>
				</div>
				<div className="right__side">
					<img src={bigBrandWhite} alt="Brand" className="big__brand__white" />
					<img src={imageLogin} alt="Image doctors" className="image__login" />
				</div>
			</main>
			<Notification />
		</Fragment>
	);
};
