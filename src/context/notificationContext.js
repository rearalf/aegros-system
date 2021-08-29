import React, { useState } from 'react';

const notificationContext = React.createContext({
	// Notification
	isOpenNotification: false,
	titleNotification: '',
	subTitleNotification: '',
	typeNotification: '',
	// Message
	isOpenMessage: false,
	titleMessage: '',
	subTitleMessage: '',
});

export function NotificationContext({ children }){
	const [ notification, setNotification ] = useState({
		isOpenNotification: false,
		titleNotification: '',
		subTitleNotification: '',
		typeNotification: '',
	});
	const [ message, setMessage ] = useState({
		isOpenMessage: false,
		titleMessage: '',
		subTitleMessage: '',
	});
	return (
		<notificationContext.Provider
			value={{ notification, setNotification, message, setMessage }}>
			{children}
		</notificationContext.Provider>
	);
}

export default notificationContext;
