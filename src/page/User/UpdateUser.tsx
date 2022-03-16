import useUpdateUser from '../../hooks/useUpdateUser'
import MuiPhoneNumber from 'material-ui-phone-number'
import { Loading, BreadCrumbsComponent } from '../../components'
import { Button, TextField } from '@mui/material'
import { FiSave, FiXCircle } from 'react-icons/fi'
import '../../assets/styles/page/UpdateUser.scss'

const UpdateUser = () => {
	const {
		breadCrumbsLinks,
		userData,
		validShowContent,
		handleOnChangePhone,
		handleOnchengeInput,
		handleOnSubmit,
		handleCancel,
	} = useUpdateUser()
	return (
		<main className="container update__user" id="layout">
			<BreadCrumbsComponent links={breadCrumbsLinks} />
			{validShowContent ? <Loading /> : null}
			<header className="update__user__header">
				<h1>Actualiza tus datos</h1>
			</header>
			<form className={`update__user__form ${validShowContent}`} onSubmit={handleOnSubmit}>
				<div className="update__user__form__inputs">
					<TextField
						id="user_name"
						name="user_name"
						label="Nombre completo"
						type="text"
						className="update__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={userData.user_name}
						required
					/>
					<TextField
						id="user_email"
						name="user_email"
						label="Correo"
						type="email"
						className="update__user__form__inputs__input"
						onChange={handleOnchengeInput}
						value={userData.user_email}
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
						className="update__user__form__inputs__input"
						onChange={handleOnChangePhone}
						value={userData.user_phone}
					/>
				</div>
				<div className="update__user__form__buttons">
					<Button
						type="submit"
						variant="contained"
						color="success"
						className="btn__success">
						<FiSave size={18} /> Actualizar
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

export default UpdateUser
