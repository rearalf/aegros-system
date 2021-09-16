import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import '@styles/components/Inputs.scss';

export const InputEmail = ({
	labelText = '',
	id = '',
	ariaLabel = '',
	ariaDescribedby = '',
	placeholder = '',
	value = '',
	onChange,
	valid = false,
}) => {
	return (
		<div className="input__group email">
			<label htmlFor={id} className={`input__group__text ${valid ? 'error__label' : ''}`}>
				{labelText}
			</label>
			<input
				type="email"
				id={id}
				name={id}
				className={`form__control ${valid ? 'error__input' : ''}`}
				placeholder={placeholder}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby}
				value={value}
				onChange={onChange}
				required
			/>
			{valid && <span className="error__message">Correo incorrecto.</span>}
			{valid && (
				<i className="error__icon">
					<FiAlertCircle size={25} />
				</i>
			)}
		</div>
	);
};
export const InputPassword = ({
	labelText = '',
	id = '',
	ariaLabel = '',
	ariaDescribedby = '',
	placeholder = '',
	value = '',
	onChange,
	valid = false,
}) => {
	return (
		<div className="input__group password">
			<label htmlFor={id} className={`input__group__text  ${valid ? 'error__label' : ''}`}>
				{labelText}
			</label>
			<input
				type="password"
				id={id}
				name={id}
				className={`form__control ${valid ? 'error__input' : ''}`}
				placeholder={placeholder}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby}
				value={value}
				onChange={onChange}
				required
			/>
			{valid && <span className="error__message">Contraseña incorrecta.</span>}
			{valid && (
				<i className="error__icon">
					<FiAlertCircle size={25} />
				</i>
			)}
		</div>
	);
};
