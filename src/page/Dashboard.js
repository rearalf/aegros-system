import React from 'react';
import { ButtonAction } from '@components/ButtonAction';
import { FiExternalLink, FiUserPlus } from 'react-icons/fi';
import { CardAppointment } from '@components/CardAppointment';
import '@styles/page/Dashboard.scss';

export const Dashboard = () => {
	return (
		<div className="dashboard">
			<h1>Bienvenido Vicente</h1>
			<div className="dashboard__options">
				<ButtonAction link="/createappointment">
					<i>
						<FiExternalLink />
					</i>
					Crear Cita
				</ButtonAction>
				<ButtonAction link="/createpatient">
					<i>
						<FiUserPlus />
					</i>
					Crear paciente
				</ButtonAction>
			</div>
			<h2 className="header__apointnment">Citas de hoy</h2>
			<div className="cards__apointment">
				<CardAppointment />
				<CardAppointment />
				<CardAppointment />
				<CardAppointment />
				<CardAppointment />
				<CardAppointment />
			</div>
		</div>
	);
};
