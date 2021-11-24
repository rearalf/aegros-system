import React from 'react'
import { useCreatePatient } from '@hooks/useCreatePatient'
import { AppLayout } from '@components/AppLayout'
import { FiSave, FiXCircle } from 'react-icons/fi'
import { Button, MenuItem, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import frLocale from 'date-fns/locale/fr'
import '@styles/page/CreatePatient.scss'

export const CreatePatient = () => {
	const {
		onChangeInput,
		onChangeDate,
		PatientData,
		validationDate,
		handleCreatePatient,
		handleCanceled,
	} = useCreatePatient()
	const {
		patient_name,
		patient_gender,
		patient_email,
		patient_allergies,
		patient_date_birth,
		patient_age,
	} = PatientData
	return (
		<AppLayout ClassName="create__patient">
			<header className="create__patient__header">
				<h1 className="create__patient__header__title">Crear paciente</h1>
			</header>
			<section className="create__patient__content">
				<form className="create__patient__form">
					<div className="create__patient__form__inputs">
						<TextField
							id="patient_name"
							name="patient_name"
							label="Nombre completo"
							type="text"
							className="create__patient__form__inputs__input"
							onChange={onChangeInput}
							value={patient_name}
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
							required
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="Fecha de nacimiento"
								value={patient_date_birth}
								onChange={onChangeDate}
								maxDate={validationDate.maxDate}
								minDate={validationDate.minDate}
								toolbarPlaceholder="Mes/Día/Año"
								renderInput={params => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<TextField
							id="patient_gender"
							name="patient_gender"
							label="Select"
							onChange={onChangeInput}
							value={patient_gender}
							className="create__patient__form__inputs__input"
							select
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
					</div>
					<div className="btn__group">
						<Button
							variant="contained"
							color="success"
							className="btn__success"
							onClick={handleCreatePatient}>
							<FiSave size={18} /> Success
						</Button>
						<Button
							variant="outlined"
							color="error"
							className="btn__error"
							onClick={handleCanceled}>
							<FiXCircle size={18} /> Error
						</Button>
					</div>
				</form>
			</section>
		</AppLayout>
	)
}
