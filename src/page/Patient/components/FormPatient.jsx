import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import MuiPhoneNumber from 'material-ui-phone-number'
import { FiAlertCircle, FiSave, FiXCircle } from 'react-icons/fi'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'

const FormPatient = ({
	patientData,
	validData,
	validShowContent = '',
	handleChangeInput,
	handleChangeDate,
	handleChangePhone,
	handleOnSubmit,
	handleCanceled,
}) => {
	const {
		patient_name,
		patient_gender,
		patient_email,
		patient_allergies,
		patient_date_birth,
		patient_phone_number,
		patient_weight,
		patient_height,
	} = patientData
	const {
		maxDate,
		minDate,
		patient_name_error,
		patient_date_birth_error,
		patient_gender_error,
		patient_email_error,
		patient_allergies_error,
		patient_phone_error,
		patient_weight_error,
		patient_height_error,
	} = validData
	return (
		<form className={`create__patient__content ${validShowContent}`} onSubmit={handleOnSubmit}>
			<div className="create__patient__form__main__information">
				<TextField
					id="patient_name"
					name="patient_name"
					label="Nombre completo"
					type="text"
					className="create__patient__form__inputs__input"
					onChange={handleChangeInput}
					value={patient_name}
					error={patient_name_error}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{patient_name_error ? <FiAlertCircle /> : null}
							</InputAdornment>
						),
					}}
					required
					autoFocus
				/>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						label="Fecha de nacimiento"
						openTo="year"
						views={[ 'year', 'month', 'day' ]}
						value={patient_date_birth}
						onChange={handleChangeDate}
						maxDate={maxDate}
						minDate={minDate}
						toolbarPlaceholder="Mes/Día/Año"
						renderInput={params => (
							<TextField
								{...params}
								id="patient_date_birth"
								name="patient_date_birth"
								helperText="mm/dd/yyyy"
								error={patient_date_birth_error}
							/>
						)}
					/>
				</LocalizationProvider>
				<TextField
					id="patient_gender"
					name="patient_gender"
					label="Genero"
					onChange={handleChangeInput}
					value={patient_gender}
					className="create__patient__form__inputs__input"
					select
					error={patient_gender_error}
					InputProps={{
						endAdornment: patient_gender_error ? (
							<InputAdornment position="end">
								<i>
									<FiAlertCircle />
								</i>
							</InputAdornment>
						) : null,
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
					id="patient_email"
					name="patient_email"
					label="Correo"
					type="email"
					placeholder="correo@caliente.com"
					className="create__patient__form__inputs__input"
					onChange={handleChangeInput}
					value={patient_email}
					error={patient_email_error}
					InputProps={{
						endAdornment: patient_email_error ? (
							<InputAdornment position="end">
								<i>
									<FiAlertCircle />
								</i>
							</InputAdornment>
						) : null,
					}}
				/>
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
					onChange={handleChangePhone}
					error={patient_phone_error}
					InputProps={{
						endAdornment: patient_phone_error ? (
							<InputAdornment position="end">
								<i>
									<FiAlertCircle />
								</i>
							</InputAdornment>
						) : null,
					}}
				/>
				<TextField
					id="patient_allergies"
					name="patient_allergies"
					label="Alergias"
					className="create__patient__form__inputs__input"
					onChange={handleChangeInput}
					value={patient_allergies}
					multiline
					rows={4}
					maxRows={3}
					error={patient_allergies_error}
				/>
			</div>
			<div className="create__patient__form__secondary__information">
				<TextField
					id="patient_weight"
					name="patient_weight"
					label="Peso"
					type="number"
					className="create__patient__form__inputs__input"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								lb
								{patient_weight_error ? (
									<i>
										<FiAlertCircle />
									</i>
								) : null}
							</InputAdornment>
						),
					}}
					error={patient_weight_error}
					onChange={handleChangeInput}
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
							<InputAdornment position="end">
								m
								{patient_height_error ? (
									<i>
										<FiAlertCircle />
									</i>
								) : null}
							</InputAdornment>
						),
					}}
					error={patient_height_error}
					onChange={handleChangeInput}
					value={patient_height}
				/>
			</div>
			<div className="btn__group">
				<Button
					type="submit"
					variant="contained"
					color="success"
					className="btn__success"
					onClick={handleOnSubmit}>
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
		</form>
	)
}

export default FormPatient
