export interface notificationInterface {
	isOpenNotification: boolean
	titleNotification: string
	subTitleNotification: string
	typeNotification: string
}

export const defaultState: notificationInterface = {
	isOpenNotification: false,
	titleNotification: '',
	subTitleNotification: '',
	typeNotification: '',
}

export type notificationType = {
	isOpenNotification: boolean
	titleNotification: string
	subTitleNotification: string
	typeNotification: string
}

export const defaulNotificationContext = {
	notification: defaultState,
	setNotification: (state: notificationType) => {},
}
