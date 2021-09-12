import { ipcRenderer } from 'electron';
import { useState } from 'react';

export const useNavBar = () => {
	const [ openSideBar, setOpenSideBar ] = useState(false);
	const Closed = () => {
		ipcRenderer.send('closed');
	};

	const Minimized = () => {
		ipcRenderer.send('minimized');
	};
	const Maximized = () => {
		ipcRenderer.send('maximized');
	};

	ipcRenderer.on('isMaximized', () => {
		ChangeMaxRestore(true);
	});
	ipcRenderer.on('isRestore', () => {
		ChangeMaxRestore(false);
	});

	const ChangeMaxRestore = isMaximized => {
		const btnResotre = document.getElementById('restore');
		const btnMaximize = document.getElementById('maximize');

		if (isMaximized) {
			btnMaximize.classList.add('hide__btn');
			btnResotre.classList.remove('hide__btn');
		}
		else {
			btnMaximize.classList.remove('hide__btn');
			btnResotre.classList.add('hide__btn');
		}
	};

	const meses = new Array(
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	);
	const f = new Date();
	const date = f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear();

	const changeValueSidebar = () => setOpenSideBar(!openSideBar);

	return {
		Closed,
		Minimized,
		Maximized,
		openSideBar,
		changeValueSidebar,
		date,
	};
};
