import React from 'react';
import { FiUser, FiExternalLink, FiXCircle, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '@styles/page/AppointmentData.scss';

export const AppointmentData = () => {
	return (
		<div className="appointment__data">
			<div className="appointment__data__header">
				<h1>Cita #666</h1>
				<div className="btn__group">
					<button className="btn btn__primary">
						<FiCheck /> Terminar
					</button>
					<button className="btn btn__cancel">
						<FiXCircle /> Cancelar
					</button>
				</div>
			</div>
			<div className="appointment__data__information">
				<div className="information__card__user">
					<div className="card__user__header">
						<i className="card__user__image">
							<FiUser size={30} />
						</i>
						<h2>Ricardo Alfaro</h2>
					</div>
					<div className="card__user__information">
						<div className="information__age">
							<p>23</p>
							<h3>Edad</h3>
						</div>
						<div className="information__gender">
							<p>Hombre</p>
							<h3>Sexo</h3>
						</div>
					</div>
				</div>
				<div className="information__card__appointment">
					<div className="appointment__date">
						<h3>Fecha:</h3>
						<p>25 Febrero 2021, 11:30 Am</p>
					</div>
					<div className="appointment__issue">
						<h3>Asunto:</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate
							quam nibh, non consequat enim lobortis in. In aliquam lacus sem, in
							malesuada eros porttitor vel. Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Ut vulputate quam nibh, non consequat enim lobortis in.
							In aliquam lacus sem, in malesuada eros porttitor vel.
						</p>
					</div>
					<div className="appointment__branch__office">
						<h3>Sucursal:</h3>
						<p>Clinica MetroCentro</p>
					</div>
					<div className="appointment__date">
						<h3>Doctor@:</h3>
						<p>Vicente Fernandez</p>
					</div>
				</div>
			</div>
			<div className="previous__appointments">
				<h2>Citas anteriores</h2>
				<div className="appointments__time__line" />
				<div className="previous__appointments__cards">
					<div className="card__previous__appointment">
						<div className="circle circle__active" />
						<div className="appointment__date">
							<h3>25 Febrero 2021, 11:30 Am</h3>
							<p>Fecha:</p>
						</div>
						<div className="appointment__branch__office">
							<h3>Clinica MetroCentro</h3>
							<p>Sucursal:</p>
						</div>
						<div className="appointment__doctor">
							<h3>Vicente Fernandez</h3>
							<p>Doctor@:</p>
						</div>
						<Link to="/appointmentdata" className="previous_appontments__link">
							<i>
								<FiExternalLink />
							</i>
							Ver cita
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
