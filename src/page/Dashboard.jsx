import React from 'react'
import { Link } from 'react-router-dom'
import { FiUserPlus, FiCalendar, FiUsers, FiArrowRight } from 'react-icons/fi'
import { Button } from '@mui/material'
import { Loading } from '@components/Loading'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import useDashboard from '@hooks/useDashboard'
import CardAppointment from '@components/CardAppointment'
import image__empty from '@image/no-data.svg'
import '@styles/page/Dashboard.scss'

export const Dashboard = () => {
	const {
		dataCount,
		variantSelect,
		appointments,
		daysAppointments,
		loading,
		handleChangeVariantSelect,
	} = useDashboard()
	const {
		totalAppointments,
		totalPatients,
		todayAppointments,
		totalAppointmentsCancel,
		totalAppointmentsFinish,
		loadingDataCount,
	} = dataCount

	const EmptyAppointments = () => (
		<div className="dashboard__appointments__schedule__empty">
			<img
				src={image__empty}
				alt="No hay citas"
				className="dashboard__appointments__schedule__empty__image"
			/>
			<h3 className="dashboard__appointments__schedule__empty__title">
				No hay citas para hoy
			</h3>
		</div>
	)
	const AppointmentsDay = () =>
		appointments.length ? (
			<div className="dashboard__appointments__schedule dashboard__appointments__schedule__day">
				{appointments.map(data => <CardAppointment {...data} key={data._id} />)}
			</div>
		) : (
			<EmptyAppointments />
		)
	const AppointmentsWeek = () =>
		appointments.length ? (
			<div className="dashboard__appointments__schedule">
				{daysAppointments.map(day => {
					const today = new Date()
					const todaySelect = new Date(
						today.getFullYear(),
						today.getMonth(),
						day.split(' ')[1],
					).getDate()
					const validationToday = today.getDate() === todaySelect
					return (
						<div className="dashboard__appointments__schedule__week" key={day}>
							<article className="dashboard__appointments__schedule__week__header">
								<h3
									className={`dashboard__appointments__schedule__week__header__title ${validationToday
										? 'today'
										: ''}`}>
									{validationToday ? <FiArrowRight /> : null}
									{day}
								</h3>
								<hr className="dashboard__appointments__schedule__week__header__hr" />
							</article>
							<div className="dashboard__appointments__schedule__week__appointment">
								{appointments.map(data => {
									const { format_day_appointment_date, _id } = data
									if (day === format_day_appointment_date)
										return <CardAppointment {...data} key={_id} />
									return null
								})}
							</div>
						</div>
					)
				})}
			</div>
		) : (
			<EmptyAppointments />
		)
	const AppointmentMonth = () =>
		appointments.length ? (
			<div className="dashboard__appointments__schedule">
				{daysAppointments.map(day => {
					const today = new Date()
					const todaySelect = new Date(
						today.getFullYear(),
						today.getMonth(),
						day.split(' ')[1],
					).getDate()
					const validationToday = today.getDate() === todaySelect
					return (
						<div className="dashboard__appointments__schedule__week" key={day}>
							<article className="dashboard__appointments__schedule__week__header">
								<h3
									className={`dashboard__appointments__schedule__week__header__title ${validationToday
										? 'today'
										: ''}`}>
									{validationToday ? <FiArrowRight /> : null}
									{day}
								</h3>
								<hr className="dashboard__appointments__schedule__week__header__hr" />
							</article>
							<div className="dashboard__appointments__schedule__week__appointment">
								{appointments.map(data => {
									const { format_day_appointment_date, _id } = data
									if (day === format_day_appointment_date) {
										return <CardAppointment {...data} key={_id} />
									}
									return null
								})}
							</div>
						</div>
					)
				})}
			</div>
		) : (
			<EmptyAppointments />
		)
	const ContentLoader = () => <div className="content__loader" />

	return (
		<AppLayout ClassName="dashboard">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Inicio',
						link_to: '/dashboard',
					},
				]}
			/>
			<header className="dashboard__header">
				<article>
					<h1 className="dashboard__header__title">Descrición General</h1>
					<h3>Bienvenid@ Mulan Rodriguez</h3>
				</article>
				<div className="dashboard__header__button__group">
					<Link to="/appointments/creat-appointment">
						<Button variant="contained" className="btn_basic">
							<FiCalendar size={18} /> Crear cita
						</Button>
					</Link>
					<Link to="/patients/create-patient">
						<Button variant="contained" className="btn_basic">
							<FiUserPlus size={18} /> Nuevo paciente
						</Button>
					</Link>
				</div>
			</header>
			<section className="dashboard__data__counts">
				{loadingDataCount ? (
					<ContentLoader />
				) : (
					<div className="dashboard__data__counts__article">
						<i className="dashboard__data__counts__article__icon total__patients__icon">
							<FiUsers />
						</i>
						<article className="dashboard__data__counts__article__data">
							<p className="dashboard__data__counts__article__data__title">
								Total de pacientes
							</p>
							<h3 className="dashboard__data__counts__article__data__number">
								{totalPatients}
							</h3>
						</article>
					</div>
				)}
				{loadingDataCount ? (
					<ContentLoader />
				) : (
					<div className="dashboard__data__counts__article">
						<i className="dashboard__data__counts__article__icon total__appointments__icon">
							<FiCalendar />
						</i>
						<article className="dashboard__data__counts__article__data">
							<p className="dashboard__data__counts__article__data__title">
								Total de citas
							</p>
							<h3 className="dashboard__data__counts__article__data__number">
								{totalAppointments}
							</h3>
						</article>
					</div>
				)}
				{loadingDataCount ? (
					<ContentLoader />
				) : (
					<div className="dashboard__data__counts__article">
						<i className="dashboard__data__counts__article__icon today__appointments__icon">
							<FiCalendar />
						</i>
						<article className="dashboard__data__counts__article__data">
							<p className="dashboard__data__counts__article__data__title">
								Citas para hoy
							</p>
							<h3 className="dashboard__data__counts__article__data__number">
								{todayAppointments}
							</h3>
						</article>
					</div>
				)}
				{loadingDataCount ? (
					<ContentLoader />
				) : (
					<div className="dashboard__data__counts__article">
						<i className="dashboard__data__counts__article__icon total__appointments__cancel__icon">
							<FiCalendar />
						</i>
						<article className="dashboard__data__counts__article__data">
							<p className="dashboard__data__counts__article__data__title">
								Citas canceladas
							</p>
							<h3 className="dashboard__data__counts__article__data__number">
								{totalAppointmentsCancel}
							</h3>
						</article>
					</div>
				)}
				{loadingDataCount ? (
					<ContentLoader />
				) : (
					<div className="dashboard__data__counts__article">
						<i className="dashboard__data__counts__article__icon total__appointments__finish__icon">
							<FiCalendar />
						</i>
						<article className="dashboard__data__counts__article__data">
							<p className="dashboard__data__counts__article__data__title">
								Citas finalizadas
							</p>
							<h3 className="dashboard__data__counts__article__data__number">
								{totalAppointmentsFinish}
							</h3>
						</article>
					</div>
				)}
			</section>
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
					AppointmentsDay()
				) : variantSelect === 'Week' ? (
					AppointmentsWeek()
				) : variantSelect === 'Month' ? (
					AppointmentMonth()
				) : null}
			</section>
		</AppLayout>
	)
}
