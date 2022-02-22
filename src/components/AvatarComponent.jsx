import React from 'react'
import { stringAvatar } from '@utils/utils'
import { Avatar } from '@mui/material'

const AvatarComponent = ({ name = 'name name', className = '' }) => {
	const nameTrim = name.trim()
	return <Avatar className={className} {...stringAvatar(nameTrim)} />
}

export default AvatarComponent
