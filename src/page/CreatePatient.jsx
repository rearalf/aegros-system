import React from 'react'
import { useCreatePatient } from '@hooks/useCreatePatient'
import { AppLayout } from '@components/AppLayout'
import { FiAlertCircle, FiSave, FiXCircle } from 'react-icons/fi'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import MuiPhoneNumber from 'material-ui-phone-number'
import '@styles/page/CreatePatient.scss'

export const CreatePatient = () => {
	const {
		onChangeInput,
		onChangeDate,
		onChangePhone,
		PatientData,
		validationData,
		handleCreatePatient,
		handleCanceled,
	} = useCreatePatient()
	const {
		patient_name,
		patient_gender,
		patient_email,
		patient_allergies,
		patient_date_birth,
		patient_phone_number,
		patient_weight,
		patient_height,
	} = PatientData
	const {
		maxDate,
		minDate,
		error_name,
		error_email,
		error_gender,
		error_date_birth,
		error_phone_number,
		error_weight,
		error_height,
	} = validationData
	return (
		<AppLayout ClassName="create__patient">
			<header className="create__patient__header">
				<h1 className="create__patient__header__title">Crear paciente</h1>
			</header>
			<section className="create__patient__content">
				<form className="create__patient__form__main__information">
					<TextField
						id="patient_name"
						name="patient_name"
						label="Nombre completo"
						type="text"
						className="create__patient__form__inputs__input"
						onChange={onChangeInput}
						value={patient_name}
						error={error_name}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="input__adorment">
									<i>{error_name ? <FiAlertCircle /> : ''}</i>
								</InputAdornment>
							),
						}}
						required
					/>
					<TextField
						id="patient_email"
						name="patient_email"
						label="Correo"
						type="email"
						placeholder="correo@caliente.com"
						className="create__patient__form__inputs__input"
						onChange={onChangeInput}
						value={patient_email}
						error={error_email}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="input__adorment">
									<i>{error_email ? <FiAlertCircle /> : ''}</i>
								</InputAdornment>
							),
						}}
						required
					/>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Fecha de nacimiento"
							value={patient_date_birth}
							onChange={onChangeDate}
							maxDate={maxDate}
							minDate={minDate}
							toolbarPlaceholder="Mes/Día/Año"
							renderInput={params => (
								<TextField {...params} error={error_date_birth} required />
							)}
						/>
					</LocalizationProvider>
					<MuiPhoneNumber
						label="Teléfono"
						name="patient_phone_number"
						id="patient_phone_number"
						defaultCountry={'sv'}
						onlyCountries={[ 'sv' ]}
						variant="outlined"
						disableDropdown
						disableCountryCode
						placeholder="0000-0000"
						className="create__patient__form__inputs__input"
						value={patient_phone_number}
						onChange={onChangePhone}
						error={error_phone_number}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="input__adorment">
									<i>{error_phone_number ? <FiAlertCircle /> : ''}</i>
								</InputAdornment>
							),
						}}
						required
					/>
					<TextField
						id="patient_gender"
						name="patient_gender"
						label="Select"
						onChange={onChangeInput}
						value={patient_gender}
						className="create__patient__form__inputs__input"
						select
						error={error_gender}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="input__adorment">
									<i>{error_gender ? <FiAlertCircle /> : ''}</i>
								</InputAdornment>
							),
						}}
						required>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'man'}>Hombre</MenuItem>
						<MenuItem value={'woman'}>Mujer</MenuItem>
						<MenuItem value={'other'}>Otros</MenuItem>
					</TextField>
					<TextField
						id="patient_allergies"
						name="patient_allergies"
						label="Alergias"
						className="create__patient__form__inputs__input"
						onChange={onChangeInput}
						value={patient_allergies}
						multiline
						rows={4}
						maxRows={3}
					/>
				</form>
				<form className="create__patient__form__secondary__information">
					<TextField
						id="patient_weight"
						name="patient_weight"
						label="Peso"
						type="number"
						className="create__patient__form__inputs__input"
						InputProps={{
							endAdornment: <InputAdornment position="end">lb</InputAdornment>,
						}}
						error={error_weight}
						onChange={onChangeInput}
						value={patient_weight}
					/>
					<TextField
						id="patient_height"
						name="patient_height"
						label="Altura"
						type="number"
						className="create__patient__form__inputs__input"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="input__adorment">
									m
									<i>{error_height ? <FiAlertCircle /> : ''}</i>
								</InputAdornment>
							),
						}}
						error={error_height}
						onChange={onChangeInput}
						value={patient_height}
					/>
				</form>
				<div className="btn__group">
					<Button
						variant="contained"
						color="success"
						className="btn__success"
						onClick={handleCreatePatient}>
						<FiSave size={18} /> Guardar
					</Button>
					<Button
						variant="outlined"
						color="error"
						className="btn__error"
						onClick={handleCanceled}>
						<FiXCircle size={18} /> Cancelar
					</Button>
				</div>
			</section>
		</AppLayout>
	)
}
