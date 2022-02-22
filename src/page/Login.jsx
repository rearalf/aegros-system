import React from 'react'
import imageLogin from '@image/image-login.svg'
import bigBrandWhite from '@image/big-brand-white.png'
import useLogin from '@hooks/useLogin'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { TextField, Button, IconButton } from '@mui/material'
import '@styles/page/Login.scss'

const Login = () => {
	const { formData, stateForm, loading, handleSubmit, changePasswordViewer } = useLogin()
	const { errroEmail, errorPassword, showPassword } = stateForm
	return (
		<main className="container login" id="layout">
			<div className={`login__left__side ${loading ? 'load__form' : ''}`}>
				<h1>Hola!!</h1>
				<h2>Inicia Sesión</h2>
				<form className="form__login" id="formLogin" ref={formData} onSubmit={handleSubmit}>
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
			<div className="login__right__side">
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
	)
}

export default Login
