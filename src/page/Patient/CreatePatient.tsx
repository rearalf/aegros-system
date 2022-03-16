import useCreatePatient from '../../hooks/useCreatePatient'
import { BreadCrumbsComponent } from '../../components'
import FormPatient from './components/FormPatient'
import '../../assets/styles/page/CreatePatient.scss'

const CreatePatient = () => {
	const {
		patientData,
		validData,
		breadCrumbsLink,
		handleChangeInput,
		handleChangeDate,
		handleChangePhone,
		handleOnSubmit,
		handleCanceled,
	} = useCreatePatient()
	return (
		<main className="container create__patient" id="layout">
			<BreadCrumbsComponent links={breadCrumbsLink} />
			<header className={`create__patient__header`}>
				<h1 className="create__patient__header__title">Crear paciente</h1>
			</header>
			<FormPatient
				patientData={patientData}
				validData={validData}
				handleChangeInput={handleChangeInput}
				handleChangeDate={handleChangeDate}
				handleChangePhone={handleChangePhone}
				handleOnSubmit={handleOnSubmit}
				handleCanceled={handleCanceled}
			/>
		</main>
	)
}

export default CreatePatient
