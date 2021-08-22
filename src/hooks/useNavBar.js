import { ipcRenderer } from 'electron';

export const useNavBar = () => {
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

	return {
		Closed,
		Minimized,
		Maximized,
	};
};
