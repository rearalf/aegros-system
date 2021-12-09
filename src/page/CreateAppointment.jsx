import React from 'react'
import { useParams } from 'react-router'
import { AppLayout } from '@components/AppLayout'
import { BreadCrumbsComponent } from '@components/BreadCrumbsComponent'
import { TextField } from '@mui/material'
import { useCreateAppointment } from '@hooks/useCreateAppointment'
import '@styles/page/CreateAppointment.scss'

export const CreateAppointment = () => {
	const { id_patient } = useParams()
	useCreateAppointment({ id_patient })
	return (
		<AppLayout ClassName="CreateAppointment">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Citas',
						link_to: '/appointments',
					},
					{
						link_name: 'Crear cita',
						link_to: '/appointments/creat-appointment/',
					},
				]}
			/>
			<header className="create__appointment__header">
				<h1 className="create__appointment__header__title">Crear Cita</h1>
			</header>
			<section className="create__appointment__content">
				<form className="create__appointment__content__form">
					<TextField
						id="patient_name"
						name="patient_name"
						label="Nombre completo"
						type="text"
						className="create__patient__form__inputs__input"
						required
					/>
				</form>
			</section>
		</AppLayout>
	)
}
