import React from 'react'
import { FiExternalLink, FiUserPlus, FiMoreVertical, FiChevronRight } from 'react-icons/fi'
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import PatientAppointmentTab from '@components/PatientAppointmentTab'
import { AppLayout } from '@components/AppLayout'
import '@styles/page/Dashboard.scss'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
	return (
		<AppLayout ClassName="dashboard">
			<header className="dashboard__header">
				<article>
					<h1 className="dashboard__header__title">Descrición General</h1>
					<h3>Bienvenid@ Mulan Rodriguez</h3>
				</article>
				<div className="dashboard__header__button__group">
					<Button variant="contained" className="btn_basic">
						<FiExternalLink size={18} /> Crear cita
					</Button>
					<Link to="/patient/create-patient">
						<Button variant="contained" className="btn_basic">
							<FiUserPlus size={18} /> Nuevo paciente
						</Button>
					</Link>
				</div>
			</header>
			<section className="dashboard__content">
				<article className="dashboard__patient__by__gender">
					<h2 className="dashboard__patient__by__gender__title">Pacientes por genero</h2>
				</article>
				<article className="dashboard__average__patient__visit">
					<h2 className="dashboard__average__patient__visit__title">
						Visita promedio del paciente
					</h2>
				</article>
				<article className="dashboard__latest__patients">
					<h2 className="dashboard__latest__patients__title">Últimos pacientes</h2>
					<div className="dashboard__latest__patients__list">
						<PatientAppointmentTab />
						<PatientAppointmentTab />
						<PatientAppointmentTab />
					</div>
				</article>
				<div className="dashboard__appointments__today">
					<article className="dashboard__appointments__today__header">
						<h2 className="dashboard__appointments__today__header__title">
							Citas para hoy
						</h2>
						<a
							href="#"
							className="dashboard__appointments__today__header__all__appointments">
							Todas las citas <FiChevronRight size={18} />
						</a>
					</article>
					<div className="dashboard__appointments__today__list">
						<div className="dashboard__appointments__today__list__appointment">
							<h3 className="dashboard__appointments__today__list__appointment__hour">
								10:30 am
							</h3>
						</div>
						<PatientAppointmentTab />
					</div>
				</div>
			</section>
		</AppLayout>
	)
}
