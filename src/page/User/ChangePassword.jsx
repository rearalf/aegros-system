import React from 'react'
import { BreadCrumbsComponent, Loading } from '@components'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { FiCheckCircle, FiEye, FiEyeOff, FiSave, FiXCircle } from 'react-icons/fi'
import useChangePassword from '@hooks/useChangePassword'
import '@styles/page/ChangePassword.scss'

const ChangePassword = () => {
	const {
		userPasswordValid,
		breadCrumbsLinks,
		validShowContent,
		userPasswords,
		showPassword,
		handleChangePassword,
		handleOnchengeInput,
		handleShowPassword,
		handleOnSubmit,
		handleCancel,
	} = useChangePassword()
	return (
		<main className="container change__password" id="layout">
			{validShowContent ? <Loading /> : null}
			<BreadCrumbsComponent links={breadCrumbsLinks} />
			<header className="change__password__header">
				<h1 className="change__password__header__title">Cambiar Contraseña</h1>
			</header>
			<form
				className={`change__password__form ${validShowContent}`}
				onSubmit={handleOnSubmit}>
				<div className="change__password__form__inputs">
					<TextField
						type={showPassword.current_password_show ? 'text' : 'password'}
						label="Contraseña actual"
						name="current_password"
						id="current_password"
						className="change__password__form__inputs__input current__password"
						value={userPasswords.current_password}
						onChange={handleOnchengeInput}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										onClick={() => handleShowPassword('current_password_show')}>
										{showPassword.current_password_show ? (
											<FiEyeOff />
										) : (
											<FiEye />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						required
						autoFocus
					/>
					<TextField
						type={showPassword.password1_show ? 'text' : 'password'}
						label="Nueva contrasña"
						name="password1"
						id="password1"
						className="change__password__form__inputs__input new__password"
						value={userPasswords.password1}
						onChange={handleChangePassword}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										onClick={() => handleShowPassword('password1_show')}>
										{showPassword.password1_show ? <FiEyeOff /> : <FiEye />}
									</IconButton>
								</InputAdornment>
							),
						}}
						required
					/>
					<TextField
						type={showPassword.password2_show ? 'text' : 'password'}
						label="Confirmar contraseña"
						name="password2"
						id="password2"
						className="change__password__form__inputs__input new__password2"
						value={userPasswords.password2}
						onChange={handleOnchengeInput}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										onClick={() => handleShowPassword('password2_show')}>
										{showPassword.password2_show ? <FiEyeOff /> : <FiEye />}
									</IconButton>
								</InputAdornment>
							),
						}}
						required
					/>
					<div className="change__password__form__inputs__input__validate">
						<p
							className={`create__user__form__inputs__input__validate__data  ${userPasswordValid.uppercase
								? 'uppercase__check'
								: ''}`}>
							<FiCheckCircle /> Mayúsculas
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${userPasswordValid.lowercase
								? 'lowercase__check'
								: ''}`}>
							<FiCheckCircle /> Minúsculas
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${userPasswordValid.char
								? 'char__check'
								: ''}`}>
							<FiCheckCircle /> Caracteres especiales (!, @, #, $, %, ^, &, *)
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${userPasswordValid.num
								? 'num__check'
								: ''}`}>
							<FiCheckCircle /> Números (0-9)
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${userPasswordValid.more8
								? 'more8__check'
								: ''}`}>
							<FiCheckCircle /> 8+ Caracteres
						</p>
					</div>
				</div>
				<div className="change__password__form__buttons">
					<Button
						type="submit"
						variant="contained"
						color="success"
						className="btn__success">
						<FiSave size={18} /> Guardar
					</Button>
					<Button
						type="button"
						variant="outlined"
						color="error"
						className="btn__error"
						onClick={handleCancel}>
						<FiXCircle size={18} /> Cancelar
					</Button>
				</div>
			</form>
		</main>
	)
}

export default ChangePassword
