import { useContext, useEffect, useState } from 'react'
import NotificationContext from '../context/NotificationContext'

interface notificationInterface {
	isOpenNotification: boolean
	titleNotification: string
	subTitleNotification: string
	typeNotification: string
}

interface contextInterface {
	notification: notificationInterface
	setNotification: void
}

function useNotification(){
	const { notification, setNotification } = useContext(NotificationContext)
	const {
		isOpenNotification,
		titleNotification,
		subTitleNotification,
		typeNotification,
	} = notification
	const [ currentCount, setCount ] = useState(0)
	const changeValueIsOpen = () => {
		setNotification({
			...notification,
			isOpenNotification: false,
		})
		setCount(0)
	}
	const timer = () => setCount(currentCount + 1)

	useEffect(
		() => {
			if (isOpenNotification) {
				if (currentCount === 100) {
					changeValueIsOpen()
					return
				}
				const id = setInterval(timer, 100)
				return () => clearInterval(id)
			}
		},
		[ currentCount, isOpenNotification ],
	)
	return {
		changeValueIsOpen,
		isOpenNotification,
		titleNotification,
		subTitleNotification,
		typeNotification,
		currentCount,
	}
}

export default useNotification
