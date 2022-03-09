import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import { Button } from '@mui/material'
import { BreadCrumbsComponent, Loading, EmptyData } from '@components'
import useAppointments from '@hooks/useAppoitnments'
import AppointmentsTable from './components/AppointmentTable'
import AppointmentsParams from './components/AppointmentsParams'
import AppointmentsPagination from './components/AppointmentsPagination'
import '@styles/page/Appointments.scss'

const Appointments = () => {
	const {
		appointments,
		pagesAndLimit,
		linkBreadCrumbs,
		appointmnetSearch,
		classFormShow,
		validAppointments,
		validaPagination,
		validLoading,
		validShowContent,
		validShowTable,
		validAditional,
		handleChangePage,
		handleChangeInput,
		handleSearchAppointmets,
		handleChangeStateForm,
		handleResetSearch,
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
			{validLoading ? <Loading /> : null}
			<AppointmentsParams
				appointmnetSearch={appointmnetSearch}
				pagesAndLimit={pagesAndLimit}
				classFormShow={classFormShow}
				validAditional={validAditional}
				loading={validShowContent}
				validShow={validShowTable}
				handleChangeInput={handleChangeInput}
				handleSearchAppointmets={handleSearchAppointmets}
				handleChangeStateForm={handleChangeStateForm}
				handleResetSearch={handleResetSearch}
				handleChangeLimit={handleChangeLimit}
				handleChangeStatus={handleChangeStatus}
				handleChangeSort={handleChangeSort}
				handleChangeAsc={handleChangeAsc}
			/>
			<AppointmentsTable
				appointments={appointments}
				loading={validShowContent}
				validShowTable={validShowTable}
			/>
			{validAppointments && (
				<EmptyData loading={validLoading} title="No hay citas en la base." />
			)}
			<div className={`appointments__total__appointment ${validShowContent}`}>
				<p className="appointments__total__appointment__text">
					Total de citas: <b>{pagesAndLimit.totalAppointments}</b>
				</p>
			</div>
			<AppointmentsPagination
				{...pagesAndLimit}
				validaPagination={validaPagination}
				handleChangePage={handleChangePage}
				loading={validShowContent}
			/>
		</main>
	)
}

export default Appointments
