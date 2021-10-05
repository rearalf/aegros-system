import React from 'react';
import { ButtonAction } from '@components/ButtonAction';
import { FiExternalLink } from 'react-icons/fi';
import { CardAppointment } from '../components/CardAppointment';
import '@styles/page/Dashboard.scss';

export const Dashboard = () => {
	return (
		<div className="dashboard">
			<h1>Bienvenido Vicente</h1>
			<ButtonAction link="/createappointment">
				<i>
					<FiExternalLink />
				</i>
				Crear Cita
			</ButtonAction>
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
