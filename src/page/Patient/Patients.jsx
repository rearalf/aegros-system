import React from 'react'
import { Link } from 'react-router-dom'
import { FiUserPlus } from 'react-icons/fi'
import { Button } from '@mui/material'
import { BreadCrumbsComponent, Loading, EmptyData } from '@components'
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
		validPatients,
		classFormShow,
		breadCrumbsLinks,
		validShowContent,
		validShowTable,
		validAditional,
		handleResetSearch,
		handleChangeInput,
		handleChangeStateForm,
		handleSearchPatients,
		handleChangePage,
		handleChangeLimit,
		handleChangeAsc,
		handleChangeSortBy,
	} = usePatients()
	return (
		<main className="container Patients" id="layout">
			<BreadCrumbsComponent links={breadCrumbsLinks} />
			<header className="patients__header">
				<h1>Pacientes</h1>
				<Link to="create-patient">
					<Button variant="contained" className="btn_basic">
						<FiUserPlus size={18} /> Nuevo paciente
					</Button>
				</Link>
			</header>
			{validLoading ? <Loading /> : null}
			<PatientsParams
				patientSearch={patientSearch}
				pagesAndLimit={pagesAndLimit}
				classFormShow={classFormShow}
				loading={validShowContent}
				validShow={validShowTable}
				validAditional={validAditional}
				handleResetSearch={handleResetSearch}
				handleChangeInput={handleChangeInput}
				handleChangeStateForm={handleChangeStateForm}
				handleSearchPatients={handleSearchPatients}
				handleChangeLimit={handleChangeLimit}
				handleChangeAsc={handleChangeAsc}
				handleChangeSortBy={handleChangeSortBy}
			/>
			<PatientsTable
				patients={patients}
				loading={validShowContent}
				validShowTable={validShowTable}
			/>
			{validPatients && (
				<EmptyData loading={validLoading} title="No hay pacientes en la base." />
			)}
			<div className={`patients__total ${validShowContent}`}>
				<p>Total de pacientes: {pagesAndLimit.totalPatients}</p>
			</div>
			<PatientsPagination
				{...pagesAndLimit}
				handleChangePage={handleChangePage}
				validaPagination={validaPagination}
				loading={validShowContent}
			/>
		</main>
	)
}

export default Patients
