import React from 'react'
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import { Dialog, Button, Slide } from '@mui/material'
import { useDialog } from '@hooks/useDialog'
import '@styles/components/DialogComponent.scss'

const Transition = React.forwardRef(function Transition(props, ref){
	return <Slide direction="up" ref={ref} {...props} />
})

export const DialogComponent = () => {
	const {
		handleAgree,
		handleDisagree,
		isOpenDialog,
		titleDialog,
		textDialog,
		typeDialog,
		textButtonDialogAgree,
		textButtonDialogDisagree,
	} = useDialog()

	const typeDialogShow = typeDialog ? typeDialog : ''
	const showIconDialog =
		typeDialog === 'success' ? (
			<FiCheckCircle title={titleDialog} size={25} />
		) : typeDialog === 'error' ? (
			<FiAlertCircle title={titleDialog} size={25} />
		) : typeDialog === 'warning' ? (
			<FiAlertTriangle title={titleDialog} size={25} />
		) : (
			typeDialog === 'information' && <FiInfo title={titleDialog} size={25} />
		)

	return (
		<Dialog
			className={`dialog__component ${typeDialogShow}`}
			open={isOpenDialog}
			TransitionComponent={Transition}>
			<h1 className="dialog__component__title">{titleDialog}</h1>
			<i className="dialog__icon">{showIconDialog}</i>
			<p className="dialog__component__text">{textDialog}</p>
			<div className="btn__group">
				<Button
					variant="outlined"
					color="error"
					className="btn__error"
					onClick={handleDisagree}>
					{textButtonDialogDisagree}
				</Button>
				<Button variant="contained" className="btn_basic" onClick={handleAgree}>
					{textButtonDialogAgree}
				</Button>
			</div>
		</Dialog>
	)
}
