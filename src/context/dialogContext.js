import React, { useState, createContext } from 'react'

const dialogContext = createContext({
	/* Dialog */
	isOpenDialog: false,
	titleDialog: '',
	textDialog: '',
	typeDialog: '',
	textButtonDialogAgree: '',
	textButtonDialogDisagree: '',
	handleAgreeDialog: '',
	handleDisagreeDialog: '',
})

export function DialogContext({ children }){
	const [ dialog, setDialog ] = useState({
		isOpenDialog: false,
		titleDialog: '',
		textDialog: '',
		typeDialog: '',
		textButtonDialogAgree: '',
		textButtonDialogDisagree: '',
		handleAgreeDialog: '',
		handleDisagreeDialog: '',
	})
	return <dialogContext.Provider value={{ dialog, setDialog }}>{children}</dialogContext.Provider>
}

export default dialogContext
