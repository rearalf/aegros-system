import { useContext } from 'react'
import dialogContext from '@context/dialogContext'

export const useDialog = () => {
	const { dialog, setDialog } = useContext(dialogContext)
	const {
		isOpenDialog,
		titleDialog,
		textDialog,
		typeDialog,
		handleAgreeDialog,
		handleDisagreeDialog,
		textButtonDialogAgree,
		textButtonDialogDisagree,
	} = dialog

	const handleAgree = () => {
		setDialog({
			...dialog,
			isOpenDialog: false,
		})
		handleAgreeDialog()
	}

	const handleDisagree = () => {
		setDialog({
			...dialog,
			isOpenDialog: false,
		})
		handleDisagreeDialog()
	}

	return {
		handleAgree,
		handleDisagree,
		isOpenDialog,
		titleDialog,
		textDialog,
		typeDialog,
		textButtonDialogAgree,
		textButtonDialogDisagree,
	}
}
