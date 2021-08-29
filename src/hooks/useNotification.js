import { useContext, useEffect, useState } from 'react';
import notificationContext from '../context/notificationContext';

export const useNotification = () => {
	const { notification, setNotification } = useContext(notificationContext);
	const {
		isOpenNotification,
		titleNotification,
		subTitleNotification,
		typeNotification,
	} = notification;
	const [ currentCount, setCount ] = useState(0);
	const changeValueIsOpen = () => {
		setNotification({
			...notification,
			isOpenNotification: false,
		});
		setCount(0);
	};
	const timer = () => setCount(currentCount + 1);

	useEffect(
		() => {
			if (isOpenNotification) {
				if (currentCount === 110) {
					changeValueIsOpen();
					return;
				}
				const id = setInterval(timer, 100);
				return () => clearInterval(id);
			}
		},
		[ currentCount, isOpenNotification ],
	);
	return {
		changeValueIsOpen,
		isOpenNotification,
		titleNotification,
		subTitleNotification,
		typeNotification,
		currentCount,
	};
};
