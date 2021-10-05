import React, { useState } from 'react';
import { FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import '@styles/components/Inputs.scss';
registerLocale('es', es);

export const InputText = ({
	labelText = '',
	id = '',
	ariaLabel = '',
	ariaDescribedby = '',
	placeholder = '',
	onChange,
	value,
	disable = false,
}) => {
	return (
		<div className="input__group">
			<label htmlFor={id} className="input__group__text">
				{labelText}
			</label>
			<input
				type="text"
				id={id}
				name={id}
				className="form__control"
				placeholder={placeholder}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby}
				onChange={onChange}
				value={value}
				disabled={disable}
				required
			/>
		</div>
	);
};
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
export const InputTextArea = ({
	labelText = '',
	id = '',
	ariaLabel = '',
	ariaDescribedby = '',
	placeholder = '',
	onChange,
	value = '',
}) => {
	return (
		<div className="input__group">
			<label htmlFor={id} className="input__group__text">
				{labelText}
			</label>
			<textarea
				cols="30"
				rows="10"
				id={id}
				name={id}
				className="form__control input__textarea"
				placeholder={placeholder}
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby}
				value={value}
				onChange={onChange}
				required
			/>
		</div>
	);
};
export const InputDate = ({ labelText = '', id = '', ChangeDate, startDate = new Date() }) => {
	return (
		<div className="input__group">
			<label htmlFor={id} className="input__group__text">
				{labelText}
			</label>
			<DatePicker
				className="pickers form__control input__date"
				selected={startDate}
				onChange={ChangeDate}
				dateFormat="dd/MM/yyyy hh:mm"
				minDate={new Date()}
				showDisabledMonthNavigation
				closeOnScroll={true}
				showTimeSelect
				locale="es"
			/>
		</div>
	);
};
export const InputSelect = ({
	labelText = '',
	id = '',
	labelSelect = 'Seleccione una opción',
	onChange,
	options = [],
}) => {
	return (
		<div className="input__group input__select">
			<label htmlFor={id} className="input__group__text">
				{labelText}
			</label>
			<Select
				options={options}
				id={id}
				inputId={id}
				onChange={onChange}
				placeholder={labelSelect}
			/>
		</div>
	);
};

{
	/* <div className="input__group input__select">
			<label htmlFor={id} className="input__group__text">
				{labelText}
			</label>
			<div className="form__control">
				<div className="input__select__title">
					{value ? <span>{value}</span> : <span>{labelSelect}</span>}
					<FiChevronDown />
				</div>
				<ul className="input__select__options">
					{data.map(({ id, issue }) => (
						<li
							className="input__select__option"
							key={id}
							id={id}
							onClick={onChangeSelect}>
							{issue}
						</li>
					))}
				</ul>
			</div>
		</div> */
}
