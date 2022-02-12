import React, { Fragment } from 'react'
import { NavBarPublic } from '@components/NavBar'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import useLogin from '@hooks/useLogin'
import { TextField, Button, IconButton } from '@mui/material'
import { Loading } from '@components/Loading'
import imageLogin from '@image/image-login.svg'
import bigBrandWhite from '@image/big-brand-white.png'
import '@styles/page/Login.scss'

export const Login = () => {
	const { formData, stateForm, loading, handleSubmit, changePasswordViewer } = useLogin()
	const { errroEmail, errorPassword, showPassword } = stateForm
	return (
		<Fragment>
			<NavBarPublic />
			<main className="container login__container" id="layout">
				<div className={`left__side ${loading ? 'load__form' : null}`}>
					<h1>Hola!!</h1>
					<h2>Inicia Sesión</h2>
					<form
						className="form__login"
						id="formLogin"
						ref={formData}
						onSubmit={handleSubmit}>
						<TextField
							id="user_email"
							name="user_email"
							label="Correo"
							type="email"
							placeholder="correo@caliente.com"
							error={errroEmail}
							required
							autoFocus
						/>
						<div className="from__login__password">
							<TextField
								id="user_password"
								name="user_password"
								label="Contraseña"
								type={showPassword ? 'text' : 'password'}
								error={errorPassword}
								className="from__login__password_input"
								required
							/>
							<IconButton className="btn__icon" onClick={changePasswordViewer}>
								{showPassword ? <FiEyeOff /> : <FiEye />}
							</IconButton>
						</div>
						<Button variant="contained" className="btn_basic" type="submit">
							Iniciar
						</Button>
					</form>
					<div className="footer__form">
						<a>¿Olvido la contraseña?</a>
					</div>
				</div>
				<div className="right__side">
					<img
						src={bigBrandWhite}
						alt="Brand"
						className={`big__brand__white ${loading ? 'load__image' : null}`}
						loading="lazy"
					/>
					<img
						src={imageLogin}
						alt="Image doctors"
						className={`image__login ${loading ? 'load__image' : null}`}
						loading="lazy"
					/>
				</div>
			</main>
		</Fragment>
	)
}
