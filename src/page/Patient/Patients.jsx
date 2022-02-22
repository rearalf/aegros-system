import React from 'react'
import { Link } from 'react-router-dom'
import { FiUserPlus } from 'react-icons/fi'
import { Button } from '@mui/material'
import { BreadCrumbsComponent, Loading } from '@components'
import usePatients from '@hooks/usePatients'
import PatientsParams from './components/PatientsParams'
import PatientsTable from './components/PatientsTable'
import PatientsPagination from './components/PatientsPagination'
import '@styles/page/Patients.scss'

const Patients = () => {
	const {
		patients,
		patientSearch,
		pagesAndLimit,
		validLoading,
		validaPagination,
		validationPatientParams,
		classValidationInputSearch,
		linkBreadCrumbs,
		onChangeInputSearch,
		handleSearchPatients,
		onChangeStateShowSearch,
		handleResetPatients,
		handleChangePage,
		handleChangeLimit,
		handleChangeAsc,
		handleChangeSortBy,
	} = usePatients()

	return (
		<main className="container Patients" id="layout">
			<BreadCrumbsComponent links={linkBreadCrumbs} />
			<header className="patients__header">
				<h1>Pacientes</h1>
				<Link to="create-patient">
					<Button variant="contained" className="btn_basic">
						<FiUserPlus size={18} /> Nuevo paciente
					</Button>
				</Link>
			</header>
			<PatientsParams
				patientSearch={patientSearch}
				pagesAndLimit={pagesAndLimit}
				classValidationInputSearch={classValidationInputSearch}
				onChangeInputSearch={onChangeInputSearch}
				handleSearchPatients={handleSearchPatients}
				onChangeStateShowSearch={onChangeStateShowSearch}
				handleResetPatients={handleResetPatients}
				handleChangeLimit={handleChangeLimit}
				handleChangeAsc={handleChangeAsc}
				handleChangeSortBy={handleChangeSortBy}
				validationPatientParams={validationPatientParams}
			/>
			{validLoading ? <PatientsTable patients={patients} /> : <Loading />}
			{validLoading && (
				<div className="patients__total">
					<p>Total de pacientes: {pagesAndLimit.totalPatients}</p>
				</div>
			)}
			<PatientsPagination
				validaPagination={validaPagination}
				{...pagesAndLimit}
				handleChangePage={handleChangePage}
			/>
		</main>
	)
}

export default Patients
