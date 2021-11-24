import React, { Fragment } from 'react'
import { NavBarPublic } from '@components/NavBar'
import imageLogin from '@image/image-login.svg'
import bigBrandWhite from '@image/big-brand-white.png'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useLogin } from '@hooks/useLogin'
import { Notification } from '@components/Notification'
import { TextField, Button, IconButton } from '@mui/material'
import '@styles/page/Login.scss'

export const Login = () => {
	const { formData, handleSubmit, stateForm, changePasswordViewer } = useLogin()
	const { errroEmail, errorPassword, showPassword } = stateForm
	return (
		<Fragment>
			<NavBarPublic />
			<main className="container login__container" id="layout">
				<div className="left__side">
					<h1>Hola!!</h1>
					<h2>Inicia Sesión</h2>
					<form
						className="form__login"
						id="formLogin"
						ref={formData}
						onSubmit={handleSubmit}>
						<TextField
							id="email"
							name="email"
							label="Correo"
							type="email"
							placeholder="correo@caliente.com"
							error={errroEmail}
							value="mario.verde@gmail.com"
							required
						/>
						<div className="from__login__password">
							<TextField
								id="password"
								name="password"
								label="Contraseña"
								value="soyLuigi1"
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
					<img src={bigBrandWhite} alt="Brand" className="big__brand__white" />
					<img src={imageLogin} alt="Image doctors" className="image__login" />
				</div>
			</main>
			<Notification />
		</Fragment>
	)
}
