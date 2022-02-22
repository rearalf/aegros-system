import React from 'react'
import bigBrandWhite from '@image/big-brand-white.png'
import imageNewUser from '@image/image-new-user.svg'
import useNewUser from '@hooks/useNewUser'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { FiCheckCircle, FiEye, FiEyeOff, FiSave } from 'react-icons/fi'
import '@styles/page/NewUser.scss'

const NewUser = () => {
	const {
		userForm,
		showPassword1,
		showPassword2,
		userFormError,
		userPasswordValid,
		handleChangePassword,
		handleClickShowPassword1,
		handleClickShowPassword2,
		handleOnchengeInput,
		handleOnSubmit,
	} = useNewUser()
	const { user_email, user_password, user_password2 } = userForm
	const { user_email_error, user_password_error, user_password2_error } = userFormError
	const { uppercase, lowercase, num, char, more8 } = userPasswordValid
	return (
		<main className="container new__user" id="layout">
			<div className="new__user__left__side">
				<img src={bigBrandWhite} alt="Brand" className="big__brand__white" />
				<img src={imageNewUser} alt="Image doctors" className="image_new_user" />
			</div>
			<div className="new__user__right__side">
				<h1>Nuevo usuario</h1>
				<form className="right__side__form" onSubmit={handleOnSubmit}>
					<div className="right__side__form__inputs">
						<TextField
							id="user_name"
							label="Nombre de usuario"
							value="Master Chief"
							disabled
							required
						/>
						<TextField
							id="user_email"
							name="user_email"
							label="Correo"
							type="email"
							className="right__side__form__inputs__input"
							onChange={handleOnchengeInput}
							value={user_email}
							error={user_email_error}
							helperText={user_email_error ? 'Agrege un correo.' : null}
							required
						/>
						<TextField
							id="user_password"
							name="user_password"
							label="Contraseña"
							type={showPassword1 ? 'text' : 'password'}
							className="right__side__form__inputs__input"
							onChange={handleChangePassword}
							value={user_password}
							error={user_password_error}
							helperText={user_password_error ? 'Agrege una contraseña.' : null}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword1}
											edge="end">
											{showPassword1 ? <FiEyeOff /> : <FiEye />}
										</IconButton>
									</InputAdornment>
								),
							}}
							required
						/>
						<TextField
							id="user_password2"
							name="user_password2"
							label="Confirmar contraseña"
							type={showPassword2 ? 'text' : 'password'}
							className="right__side__form__inputs__input"
							onChange={handleOnchengeInput}
							value={user_password2}
							error={user_password2_error}
							helperText={user_password_error ? 'Agrege una contraseña.' : null}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword2}
											edge="end">
											{showPassword2 ? <FiEyeOff /> : <FiEye />}
										</IconButton>
									</InputAdornment>
								),
							}}
							required
						/>
						<div className="right__side__form__inputs__validate">
							<p
								className={`right__side__form__inputs__validate__data  ${uppercase
									? 'uppercase__check'
									: ''}`}>
								<FiCheckCircle /> Mayúsculas
							</p>
							<p
								className={`right__side__form__inputs__validate__data  ${lowercase
									? 'lowercase__check'
									: ''}`}>
								<FiCheckCircle /> Minúsculas
							</p>
							<p
								className={`right__side__form__inputs__validate__data  ${char
									? 'char__check'
									: ''}`}>
								<FiCheckCircle /> Caracteres especiales (!, @, #, $, %, ^, &, *)
							</p>
							<p
								className={`right__side__form__inputs__validate__data  ${num
									? 'num__check'
									: ''}`}>
								<FiCheckCircle /> Números (0-9)
							</p>
							<p
								className={`right__side__form__inputs__validate__data  ${more8
									? 'more8__check'
									: ''}`}>
								<FiCheckCircle /> 8+ Caracteres
							</p>
						</div>
					</div>
					<div className="right__side__form__buttons">
						<Button variant="contained" className="btn_basic" type="submit">
							<FiSave size={18} /> Guardar
						</Button>
					</div>
				</form>
			</div>
		</main>
	)
}

export default NewUser
