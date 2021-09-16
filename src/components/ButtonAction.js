import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/components/Buttons.scss';

export const ButtonAction = ({ children }) => {
	return (
		<Link className="btn__action" to="/appointment">
			{children}
		</Link>
	);
};
