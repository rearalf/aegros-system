import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/components/Buttons.scss';

export const ButtonAction = ({ children, link = '/' }) => {
	return (
		<Link className="btn__action" to={link}>
			{children}
		</Link>
	);
};
