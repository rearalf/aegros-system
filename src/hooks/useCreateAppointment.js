import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import notificationContext from '@context/notificationContext';

const patientsList = [
	{
		value: 1,
		label: 'Alma Marcela',
	},
	{
		value: 2,
		label: 'Alma María',
	},
	{
		value: 3,
		label: 'Carlos Augusto',
	},
	{
		value: 4,
		label: 'Carmen Lozano',
	},
];
export const useFunctionsPage = () => {
	const history = useHistory();
	const { setNotification } = useContext(notificationContext);
	const IssueTextPlaceHolder = `- Lorem ipsum dolor sit amet, consectetur adipiscing.
- Lorem ipsum dolor sit amet.
-Lorem ipsum dolor sit amet, consectetur adipiscing elit, pellentesque sem nullam`;
	const sucursales = [
		{
			value: 1,
			label: 'Metrocentro San Salvador',
		},
		{
			value: 2,
			label: 'Metrocentro Apopa',
		},
		{
			value: 3,
			label: 'Otros por ahí',
		},
		{
			value: 4,
			label: 'Otro por alla',
		},
	];
	const [ formCreateAppointment, setFormCreateAppointment ] = useState({
		branchOfficeId: '',
		date: new Date(),
		issue: '',
		idPatient: '',
	});
	const [ patients, setPatients ] = useState(patientsList);
	const onChangeInput = e => {
		setFormCreateAppointment({
			...formCreateAppointment,
			[e.target.name]: e.target.value,
		});
	};
	const onChangeDate = e => {
		/* console.log({
			e,
			fecha: e.toLocaleDateString('es-Es'),
			hora: e.toLocaleTimeString('es-Es'),
		}); */
		setFormCreateAppointment({
			...formCreateAppointment,
			date: e,
		});
	};
	const onChangeSelect = e => {
		setFormCreateAppointment({
			...formCreateAppointment,
			branchOfficeId: e.value,
		});
	};
	const onChangeSelectPatient = e => {
		setFormCreateAppointment({
			...formCreateAppointment,
			idPatient: e.value,
		});
	};
	const handleCreateAppointment = e => {
		try {
			e.preventDefault();
			if (formCreateAppointment.branchOfficeId === '')
				throw 'Debe de seleccionar una sucursal';
			if (formCreateAppointment.issue === '')
				throw 'Debe de agregar el asunto de la consulta';
			if (formCreateAppointment.idPatient === '') throw 'Debe de buscar el paciente';
			history.push('/Dashboard');
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Success',
				subTitleNotification: 'La operación fue un éxito.',
				typeNotification: 'success',
			});
		} catch (error) {
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: error,
				typeNotification: 'error',
			});
		}
	};
	const handleCanceled = () => {
		setFormCreateAppointment({
			branchOfficeId: '',
			date: new Date(),
			issue: '',
			idPatient: '',
			patientName: '',
		});
		history.push('/Dashboard');
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'La cita no fue creada.',
			typeNotification: 'information',
		});
	};
	return {
		date: formCreateAppointment.date,
		issue: formCreateAppointment.issue,
		sucursales,
		patients,
		IssueTextPlaceHolder,
		onChangeDate,
		onChangeSelect,
		onChangeSelectPatient,
		onChangeInput,
		handleCreateAppointment,
		handleCanceled,
	};
};
