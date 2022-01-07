import React from 'react'
import { useParams } from 'react-router-dom'
import useUpdatePatient from '@hooks/useUpdatePatient'
import { useCreatePatient } from '@hooks/useCreatePatient'
import { AppLayout } from '@components/AppLayout'
import { FiAlertCircle, FiSave, FiXCircle } from 'react-icons/fi'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'
import { BreadCrumbsComponent } from '../components/BreadCrumbsComponent'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import MuiPhoneNumber from 'material-ui-phone-number'
import { Loading } from '@components/Loading'
import '@styles/page/CreatePatient.scss'

export const CreatePatient = () => {
	const { id_patient } = useParams()
	let patient = {}
	if (id_patient) {
		patient = useUpdatePatient({ id: id_patient })
	}
	else {
		patient = useCreatePatient()
	}
	const {
		loading,
		PatientData,
		validationData,
		onChangeInput,
		onChangeDate,
		onChangePhone,
		handleCreatePatient,
		handleCanceled,
	} = patient

	const {
		patient_name,
		patient_gender,
		patient_email,
		patient_allergies,
		patient_date_birth,
		patient_phone_number,
		patient_weight,
		patient_height,
		patient_name_static,
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
	const linksToBreadCrumbsComponent = id_patient
		? [
				{
					link_name: 'Pacientes',
					link_to: '/patients',
				},
				{
					link_name: patient_name_static,
					link_to: `/patients/patient/${id_patient}`,
				},
				{
					link_name: `Actualizar datos de ${patient_name_static}`,
					link_to: '/patients/create-patient',
				},
			]
		: [
				{
					link_name: 'Pacientes',
					link_to: '/patients',
				},
				{
					link_name: 'Crear paciente',
					link_to: '/patients/create-patient',
				},
			]
	return (
		<AppLayout ClassName="create__patient">
			{!loading && <BreadCrumbsComponent links={linksToBreadCrumbsComponent} />}
			{!loading && (
				<header className="create__patient__header">
					<h1 className="create__patient__header__title">
						{id_patient ? (
							`Actualizar datos de ${patient_name_static}`
						) : (
							'Crear paciente'
						)}
					</h1>
				</header>
			)}
			{loading ? (
				<Loading />
			) : (
				<form className="create__patient__content" onSubmit={handleCreatePatient}>
					<div className="create__patient__form__main__information">
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
									<InputAdornment position="end">
										<i>{error_name ? <FiAlertCircle /> : null}</i>
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
								endAdornment: error_email ? (
									<InputAdornment position="end">
										<i>
											<FiAlertCircle />
										</i>
									</InputAdornment>
								) : null,
							}}
							required
						/>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="Fecha de nacimiento"
								openTo="year"
								views={[ 'year', 'month', 'day' ]}
								value={patient_date_birth}
								onChange={onChangeDate}
								maxDate={maxDate}
								minDate={minDate}
								toolbarPlaceholder="Mes/Día/Año"
								renderInput={params => (
									<TextField {...params} helperText="mm/dd/yyyy" required />
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
								endAdornment: error_phone_number ? (
									<InputAdornment position="end">
										<i>
											<FiAlertCircle />
										</i>
									</InputAdornment>
								) : null,
							}}
							required
						/>
						<TextField
							id="patient_gender"
							name="patient_gender"
							label="Genero"
							onChange={onChangeInput}
							value={patient_gender}
							className="create__patient__form__inputs__input"
							select
							error={error_gender}
							InputProps={{
								endAdornment: error_gender ? (
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
										{error_weight ? (
											<i>
												<FiAlertCircle />
											</i>
										) : null}
									</InputAdornment>
								),
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
									<InputAdornment position="end">
										m
										{error_height ? (
											<i>
												<FiAlertCircle />
											</i>
										) : null}
									</InputAdornment>
								),
							}}
							error={error_height}
							onChange={onChangeInput}
							value={patient_height}
						/>
					</div>
					<div className="btn__group">
						<Button
							type="submit"
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
				</form>
			)}
		</AppLayout>
	)
}
