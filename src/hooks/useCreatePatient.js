import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import notificationContext from '@context/notificationContext';

const regex = new RegExp(
	/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
);

const onlyText = new RegExp(/^[A-Z]+$/i);

export const useCreatePatient = () => {
	const history = useHistory();
	const { setNotification } = useContext(notificationContext);
	const gender = [
		{
			value: 'M',
			label: 'Hombre',
		},
		{
			value: 'F',
			label: 'Mujer',
		},
		{
			value: '?',
			label: 'Otros?',
		},
	];
	const f = new Date();
	const fechaValidate = `${f.getMonth() + 1}/${f.getDate()}/${f.getFullYear() - 1}`;
	const [ PatientData, setPatientData ] = useState({
		patientName: '',
		patientBorn: new Date(fechaValidate),
		patientAge: '',
		patientAllergies: '',
		patientEmail: '',
		patientGender: '',
	});
	const [ errorForm, setErrorForm ] = useState({
		errorEmail: false,
	});

	const onChangeDate = e => {
		setPatientData({
			...PatientData,
			patientBorn: e,
		});
	};

	const onChangeInput = e => {
		const { name, value } = e.target;
		if (name === 'patientEmail') validEmail(value);
		setPatientData({
			...PatientData,
			[name]: value,
		});
	};

	const onChangeSelect = e => {
		const { value } = e;
		setPatientData({
			...PatientData,
			patientGender: value,
		});
	};

	const validEmail = email => {
		regex.test(email)
			? setErrorForm({
					...errorForm,
					errorEmail: false,
				})
			: setErrorForm({
					...errorForm,
					errorEmail: true,
				});
	};

	const handleCreatePatient = e => {
		try {
			e.preventDefault();
			if (PatientData.patientName === '') throw 'Dede de agregar el nombre del paciente.';
			if (PatientData.patientBorn === '') throw 'Debe de agregar la fecha de nacimiento.';
			if (PatientData.patientEmail === '') throw 'Debe de agregar un correo.';
			if (errorForm.errorEmail === true) throw 'Debe de agregar un correo valido.';
			if (PatientData.patientGender === '') throw 'Debe de seleccionar un genero.';
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
		setPatientData({
			patientName: '',
			patientBorn: new Date(fechaValidate),
			patientAge: '',
			patientAllergies: '',
			patientEmail: '',
			patientGender: '',
		});
		history.push('/Dashboard');
		setNotification({
			isOpenNotification: true,
			titleNotification: 'Información',
			subTitleNotification: 'Se cancelo la creación del usuario.',
			typeNotification: 'information',
		});
	};

	return {
		PatientData,
		onChangeDate,
		onChangeInput,
		onChangeSelect,
		handleCreatePatient,
		handleCanceled,
		errorEmail: errorForm.errorEmail,
		gender,
	};
};
