import { stringAvatar } from '../utils/Utils'
import { Avatar, Tooltip } from '@mui/material'

const AvatarComponent = ({ name = 'name name', className = '' }) => {
	const nameTrim = name.trim()
	return (
		<Tooltip title={nameTrim}>
			<Avatar className={className} {...stringAvatar(nameTrim)} />
		</Tooltip>
	)
}

export default AvatarComponent
