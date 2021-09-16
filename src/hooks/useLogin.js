import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import notificationContext from '@context/notificationContext';

export const useLogin = () => {
	const history = useHistory();
	const { setNotification } = useContext(notificationContext);
	const [ formData, setFormData ] = useState({
		email: 'correo@hotmail.com',
		password: 'Qwerty12345$',
	});
	const [ errorForm, setErrorForm ] = useState({
		errroEmail: false,
		errorPassword: false,
	});

	const handleChange = e => {
		const { id, value } = e.target;
		if (id === 'email') validEmail(value);
		if (id === 'password') validPassword(value);
		setFormData({
			...formData,
			[id]: value,
		});
	};

	const validPassword = password => {
		const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i;
		if (regex.test(password)) {
			console.log('La constaseña ' + password + ' es correcta.');
			setErrorForm({
				...errorForm,
				errorPassword: false,
			});
		}
		else {
			console.log('La constaseña ' + password + ' es incorrecta.');
			setErrorForm({
				...errorForm,
				errorPassword: true,
			});
		}
		if (password.length <= 7) {
			setErrorForm({
				...errorForm,
				errorPassword: false,
			});
		}
	};
	const validEmail = email => {
		var regex = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
		);
		regex.test(email)
			? setErrorForm({
					...errorForm,
					errroEmail: false,
				})
			: setErrorForm({
					...errorForm,
					errroEmail: true,
				});
		email.length <= 5 &&
			setErrorForm({
				...errorForm,
				errroEmail: false,
			});
	};

	const handleLogin = e => {
		e.preventDefault();
		if (formData.email === 'correo@hotmail.com' && formData.password === 'Qwerty12345!') {
			history.push('/Dashboard');
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Success',
				subTitleNotification: 'La operación fue un éxito.',
				typeNotification: 'success',
			});
		}
		else {
			setNotification({
				isOpenNotification: true,
				titleNotification: 'Error',
				subTitleNotification: 'Su datos son incorrectos',
				typeNotification: 'error',
			});
		}
	};

	return {
		email: formData.email,
		password: formData.password,
		errroEmail: errorForm.errroEmail,
		errorPassword: errorForm.errorPassword,
		handleChange,
		handleLogin,
	};
};
