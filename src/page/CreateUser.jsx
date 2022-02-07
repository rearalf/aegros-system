import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number'
import useCreateUser from '../hooks/useCreateUser'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { AppLayout } from '@components/AppLayout'
import { Button, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'
import { FiEye, FiEyeOff, FiSave, FiXCircle } from 'react-icons/fi'
import '@styles/page/CreateUser.scss'

const CreateUser = () => {
	const {
		userForm,
		showPassword,
		userFormError,
		handleClickShowPassword,
		handleOnchengeInput,
		handleOnChangePhone,
		handleOnSubmit,
		handleCancel,
	} = useCreateUser()

	const { user_name, user_email, user_password, user_phone, user_role } = userForm
	const {
		user_name_error,
		user_email_error,
		user_password_error,
		user_role_error,
	} = userFormError
	return (
		<AppLayout ClassName="create__user">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Usuarios',
						link_to: '/users',
					},
					{
						link_name: 'Crear usuario',
						link_to: '/users/create-user',
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
					<TextField
						id="user_password"
						name="user_password"
						label="Contraseña"
						type={showPassword ? 'text' : 'password'}
						className="create__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={user_password}
						error={user_password_error}
						helperText={user_password_error ? 'Agrege una contraseña.' : null}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end">
										{showPassword ? <FiEyeOff /> : <FiEye />}
									</IconButton>
								</InputAdornment>
							),
						}}
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
						variant="outlined"
						color="error"
						className="btn__error"
						onClick={handleCancel}>
						<FiXCircle size={18} /> Cancelar
					</Button>
				</div>
			</form>
		</AppLayout>
	)
}

export default CreateUser
