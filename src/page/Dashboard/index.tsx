import { Link } from 'react-router-dom'
import { FiUserPlus, FiCalendar } from 'react-icons/fi'
import { BreadCrumbsComponent, Loading } from '../../components'
import { Button } from '@mui/material'
import useDashboard from '../../hooks/useDashboard'
import {
	DataCounts,
	BarChart,
	AppointmentsDay,
	AppointmentsWeek,
	AppointmentMonth,
} from './components'
import '../../assets/styles/page/Dashboard.scss'

const Dashboard = () => {
	const {
		dataUser,
		dataCount,
		variantSelect,
		appointments,
		daysAppointments,
		dataBarChart,
		optionsChartLine,
		loading,
		handleChangeVariantSelect,
	} = useDashboard()
	return (
		<main className="container dashboard" id="layout">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Inicio',
						link_to: '/',
					},
				]}
			/>
			<header className="dashboard__header">
				<article>
					<h1 className="dashboard__header__title">Descrición General</h1>
					<h3>Bienvenid@ {dataUser}</h3>
				</article>
				<div className="dashboard__header__button__group">
					<Link to="appointments/creat-appointment">
						<Button variant="contained" className="btn_basic">
							<FiCalendar size={18} /> Crear cita
						</Button>
					</Link>
					<Link to="patients/create-patient">
						<Button variant="contained" className="btn_basic">
							<FiUserPlus size={18} /> Nuevo paciente
						</Button>
					</Link>
				</div>
			</header>
			<DataCounts {...dataCount} />
			<section className="dashboard__information">
				<section className="dashboard__appointments">
					<header className="dashboard__appointments__header">
						<h2>Citas del día</h2>
					</header>
					<div className="dashboard__appointments__variant">
						<Button
							className={`dashboard__appointments__variant__button ${variantSelect ===
							'Day'
								? 'Active'
								: null}`}
							variant="outlined"
							onClick={() => handleChangeVariantSelect('Day')}>
							Día
						</Button>
						<Button
							className={`dashboard__appointments__variant__button ${variantSelect ===
							'Week'
								? 'Active'
								: null}`}
							variant="outlined"
							onClick={() => handleChangeVariantSelect('Week')}>
							Semana
						</Button>
						<Button
							className={`dashboard__appointments__variant__button ${variantSelect ===
							'Month'
								? 'Active'
								: null}`}
							variant="outlined"
							onClick={() => handleChangeVariantSelect('Month')}>
							Mes
						</Button>
					</div>
					{loading ? (
						<div className="dashboard__appointments__schedule">
							<Loading />
						</div>
					) : variantSelect === 'Day' ? (
						<AppointmentsDay appointments={appointments} />
					) : variantSelect === 'Week' ? (
						<AppointmentsWeek
							appointments={appointments}
							daysAppointments={daysAppointments}
						/>
					) : variantSelect === 'Month' ? (
						<AppointmentMonth
							appointments={appointments}
							daysAppointments={daysAppointments}
						/>
					) : null}
				</section>
				<section className="dashboard__charts">
					<h2 className="dashboard__charts__title">Citas por los ultimos 12 meses</h2>
					<BarChart dataBarChart={dataBarChart} optionsChartLine={optionsChartLine} />
				</section>
			</section>
		</main>
	)
}

export default Dashboard
