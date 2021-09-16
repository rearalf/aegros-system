import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '@styles/components/CardAppointment.scss';

export const CardAppointment = ({
	AppointmentNumber = 0,
	AppointmentDate = '25 Febrero 2021, 11:30Am',
}) => {
	return (
		<div className="card">
			<div className="card__header">
				<article className="article__appointment">
					<h2 className="appointment__number">Cita #{AppointmentNumber}</h2>
					<span className="appointment__date">{AppointmentDate}</span>
				</article>
				<i className="image__perfil">
					<FiUser size={30} />
				</i>
			</div>
			<div className="card__appointment__information">
				<div className="appointment__username">
					<h3 className="appointment__user">Nombre</h3>
					<p className="user__information">Ricardo Alfaro</p>
				</div>
				<div className="appointment__issue">
					<h3 className="appointment__issue">Asunto:</h3>
					<p className="issue__information">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate quam
						nibh, non consequat enim lobortis in. In aliquam lacus sem, in malesuada
						eros porttitor vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Ut vulputate quam nibh, non consequat enim lobortis in. In aliquam lacus
						sem, in malesuada eros porttitor vel. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Ut vulputate quam nibh, non consequat enim
						lobortis in. In aliquam lacus sem, in malesuada eros porttitor vel.
					</p>
				</div>
			</div>
			<div className="btn__group">
				<Link to="/appointment" className="btn btn__primary">
					Ver cita
				</Link>
			</div>
		</div>
	);
};
