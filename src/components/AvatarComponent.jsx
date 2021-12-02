import React from 'react'
import { stringAvatar } from '@utils/utils'
import { Avatar } from '@mui/material'

export const AvatarComponent = ({ name, className = '' }) => {
	return <Avatar className={className} {...stringAvatar(name)} />
}
