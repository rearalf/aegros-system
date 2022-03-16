export interface dialogInterface {
	isOpenDialog: boolean
	titleDialog: string
	textDialog: string
	typeDialog: string
	textButtonDialogAgree: string
	textButtonDialogDisagree: string
	handleAgreeDialog: () => void
	handleDisagreeDialog: () => void
}

export const defaultState: dialogInterface = {
	isOpenDialog: false,
	titleDialog: '',
	textDialog: '',
	typeDialog: '',
	textButtonDialogAgree: '',
	textButtonDialogDisagree: '',
	handleAgreeDialog: () => {},
	handleDisagreeDialog: () => {},
}

export type dialogType = {
	isOpenDialog: boolean
	titleDialog: string
	textDialog: string
	typeDialog: string
	textButtonDialogAgree: string
	textButtonDialogDisagree: string
	handleAgreeDialog: () => void
	handleDisagreeDialog: () => void
}

export const defaultDialogContext = {
	dialog: defaultState,
	setDialog: (state: dialogType) => {},
}
