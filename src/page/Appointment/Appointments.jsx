import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import { Button } from '@mui/material'
import { BreadCrumbsComponent, Loading } from '@components'
import useAppointments from '@hooks/useAppoitnments'
import AppointmentsTable from './components/AppointmentTable'
import AppointmentsParams from './components/AppointmentsParams'
import AppointmentsPagination from './components/AppointmentsPagination'
import '@styles/page/Appointments.scss'

const Appointments = () => {
	const {
		appointments,
		appointmnetSearch,
		pagesAndLimit,
		validaPagination,
		validForm,
		validLoading,
		classValidationFormShow,
		linkBreadCrumbs,
		handleChangePage,
		handleChangeInput,
		handleSearchAppointmets,
		handleChangeStateShowSearch,
		handleResetSearchAppointment,
		handleChangeLimit,
		handleChangeStatus,
		handleChangeSort,
		handleChangeAsc,
	} = useAppointments()
	return (
		<main className="container Appointments" id="layout">
			<BreadCrumbsComponent links={linkBreadCrumbs} />
			<header className="appointments__header">
				<h1 className="appointments__header__title">Citas</h1>
				<Link to="creat-appointment">
					<Button variant="contained" className="btn_basic">
						<FiCalendar size={18} /> Nuevo cita
					</Button>
				</Link>
			</header>
			<AppointmentsParams
				classValidationFormShow={classValidationFormShow}
				appointmnetSearch={appointmnetSearch}
				handleChangeInput={handleChangeInput}
				handleSearchAppointmets={handleSearchAppointmets}
				handleChangeStateShowSearch={handleChangeStateShowSearch}
				handleResetSearchAppointment={handleResetSearchAppointment}
				handleChangeLimit={handleChangeLimit}
				handleChangeStatus={handleChangeStatus}
				handleChangeSort={handleChangeSort}
				handleChangeAsc={handleChangeAsc}
				pagesAndLimit={pagesAndLimit}
				validForm={validForm}
			/>
			{validLoading ? <AppointmentsTable appointments={appointments} /> : <Loading />}
			{validLoading && (
				<div className="appointments__total__appointment">
					<p className="appointments__total__appointment__text">
						Total de citas: <b>{pagesAndLimit.totalAppointments}</b>
					</p>
				</div>
			)}
			<AppointmentsPagination
				validaPagination={validaPagination}
				{...pagesAndLimit}
				handleChangePage={handleChangePage}
			/>
		</main>
	)
}

export default Appointments
