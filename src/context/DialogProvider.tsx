import { useState } from 'react'
import { defaultDialogContext } from '../Interface/DialogInterface'
import DialogContext from './DialogContext'

type Props = {
	children: JSX.Element | JSX.Element[]
}

function DialogProvider({ children }: Props){
	const [ dialog, setDialog ] = useState(defaultDialogContext.dialog)
	return <DialogContext.Provider value={{ dialog, setDialog }}>{children}</DialogContext.Provider>
}

export default DialogProvider
