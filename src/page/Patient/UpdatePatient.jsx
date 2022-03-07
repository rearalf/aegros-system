import React from 'react'
import useUpdatePatient from '@hooks/useUpdatePatient'
import { BreadCrumbsComponent, Loading } from '@components'
import FormPatient from './components/FormPatient'
import '@styles/page/CreatePatient.scss'

const UpdatePatient = () => {
	const {
		patientData,
		validData,
		breadCrumbsLink,
		validShowContent,
		loading,
		handleChangeInput,
		handleChangeDate,
		handleChangePhone,
		handleOnSubmit,
		handleCanceled,
	} = useUpdatePatient()
	return (
		<main className="container create__patient" id="layout">
			{loading ? <Loading /> : null}
			<BreadCrumbsComponent links={breadCrumbsLink} />
			<header className={`create__patient__header ${validShowContent}`}>
				<h1 className="create__patient__header__title">
					{`Actualizar datos de ${patientData.user_name_short}`}
				</h1>
			</header>
			<FormPatient
				patientData={patientData}
				validData={validData}
				validShowContent={validShowContent}
				handleChangeInput={handleChangeInput}
				handleChangeDate={handleChangeDate}
				handleChangePhone={handleChangePhone}
				handleOnSubmit={handleOnSubmit}
				handleCanceled={handleCanceled}
			/>
		</main>
	)
}

export default UpdatePatient
