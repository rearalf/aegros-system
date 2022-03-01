import React, { useContext } from 'react'
import { ipcRenderer } from 'electron'
import dialogContext from '@context/dialogContext'
import {
	VscChromeMinimize,
	VscChromeClose,
	VscChromeMaximize,
	VscChromeRestore,
} from 'react-icons/vsc'

const NavBarActions = () => {
	const { dialog, setDialog } = useContext(dialogContext)
	const Minimized = () => {
		ipcRenderer.send('minimized')
	}
	const Maximized = () => {
		ipcRenderer.send('maximized')
	}

	ipcRenderer.on('isMaximized', () => {
		ChangeMaxRestore(true)
	})
	ipcRenderer.on('isRestore', () => {
		ChangeMaxRestore(false)
	})

	const Closed = () => {
		setDialog({
			...dialog,
			isOpenDialog: true,
			titleDialog: 'Información',
			textDialog: 'Seguro que desea salir? Si acepta cerrara sesión y saldrá del programa.',
			typeDialog: 'information',
			textButtonDialogAgree: 'Quedarse',
			textButtonDialogDisagree: 'Salir',
			handleAgreeDialog: () => {},
			handleDisagreeDialog: () => {
				ipcRenderer.send('closed')
				sessionStorage.removeItem('user')
				sessionStorage.removeItem('role')
			},
		})
	}

	const ChangeMaxRestore = isMaximized => {
		const btnResotre = document.getElementById('restore')
		const btnMaximize = document.getElementById('maximize')

		if (isMaximized) {
			btnMaximize.classList.add('hide__btn')
			btnResotre.classList.remove('hide__btn')
		}
		else {
			btnMaximize.classList.remove('hide__btn')
			btnResotre.classList.add('hide__btn')
		}
	}

	return (
		<div className="navbar__actions">
			<button className="right__side__button__icon" onClick={Minimized}>
				<VscChromeMinimize title={'Minimizar ventana'} size={20} />
			</button>
			<button id="maximize" className="right__side__button__icon" onClick={Maximized}>
				<VscChromeMaximize title={'Maximizar ventana'} size={20} />
			</button>
			<button
				id="restore"
				className="right__side__button__icon hide__btn"
				onClick={Maximized}>
				<VscChromeRestore title={'Restaurar ventana'} size={20} />
			</button>
			<button className="right__side__button__icon" onClick={Closed}>
				<VscChromeClose title={'Cerrar Ventana'} size={20} />
			</button>
		</div>
	)
}

export default NavBarActions
