import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number'
import useCreateUser from '@hooks/useCreateUser'
import BreadCrumbsComponent from '@components/BreadCrumbsComponent'
import { Button, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'
import { FiCheckCircle, FiEye, FiEyeOff, FiSave, FiXCircle } from 'react-icons/fi'
import '@styles/page/CreateUser.scss'

const CreateUser = () => {
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
		handleOnChangePhone,
		handleOnSubmit,
		handleCancel,
	} = useCreateUser()

	const { user_name, user_email, user_password, user_password2, user_phone, user_role } = userForm
	const { uppercase, lowercase, num, char, more8 } = userPasswordValid
	const {
		user_name_error,
		user_email_error,
		user_password_error,
		user_password2_error,
		user_role_error,
	} = userFormError
	return (
		<main className="container create__user" id="layout">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Usuarios',
						link_to: '/private/users',
					},
					{
						link_name: 'Crear usuario',
						link_to: '/private/users/create-user',
					},
				]}
			/>
			<header className="create__user__header">
				<h1>Crear ususario</h1>
			</header>
			<form className="create__user__form" onSubmit={handleOnSubmit}>
				<div className="create__user__form__inputs">
					<TextField
						id="user_name"
						name="user_name"
						label="Nombre completo"
						type="text"
						className="create__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={user_name}
						error={user_name_error}
						helperText={user_name_error ? 'Agrege un nombre.' : null}
						required
					/>
					<TextField
						id="user_email"
						name="user_email"
						label="Correo"
						type="email"
						className="create__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={user_email}
						error={user_email_error}
						helperText={user_email_error ? 'Agrege un correo.' : null}
						required
					/>
					<MuiPhoneNumber
						label="Teléfono"
						name="user_phone"
						id="user_phone"
						defaultCountry={'sv'}
						onlyCountries={[ 'sv' ]}
						variant="outlined"
						disableDropdown
						disableCountryCode
						placeholder="0000-0000"
						className="create__user__form__inputs__input"
						onChange={handleOnChangePhone}
						value={user_phone}
					/>
					<TextField
						id="user_role"
						name="user_role"
						label="Rol"
						className="create__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={user_role}
						error={user_role_error}
						helperText={user_role_error ? 'Agrege un role.' : null}
						select
						required>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'secretary'}>Secretarío</MenuItem>
						<MenuItem value={'doctor'}>Doctor</MenuItem>
						<MenuItem value={'master-chief'}>Jefe Maestro</MenuItem>
					</TextField>
					<TextField
						id="user_password"
						name="user_password"
						label="Contraseña"
						type={showPassword1 ? 'text' : 'password'}
						className="create__user__form__inputs__input"
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
						className="create__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={user_password2}
						error={user_password2_error}
						helperText={user_password2_error ? 'Las contraseña no coinciden.' : null}
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
					<div className="create__user__form__inputs__input__validate">
						<p
							className={`create__user__form__inputs__input__validate__data  ${uppercase
								? 'uppercase__check'
								: ''}`}>
							<FiCheckCircle /> Mayúsculas
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${lowercase
								? 'lowercase__check'
								: ''}`}>
							<FiCheckCircle /> Minúsculas
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${char
								? 'char__check'
								: ''}`}>
							<FiCheckCircle /> Caracteres especiales (!, @, #, $, %, ^, &, *)
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${num
								? 'num__check'
								: ''}`}>
							<FiCheckCircle /> Números (0-9)
						</p>
						<p
							className={`create__user__form__inputs__input__validate__data  ${more8
								? 'more8__check'
								: ''}`}>
							<FiCheckCircle /> 8+ Caracteres
						</p>
					</div>
				</div>
				<div className="create__user__form__buttons">
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

export default CreateUser
