import { Tooltip } from '@mui/material'
import { FiPhone, FiMail } from 'react-icons/fi'
import { propsContacts } from '../Interface/Interface'
import '../assets/styles/components/Contacts.scss'

const Contacts = ({ contact = '', type = 'mailto' }: propsContacts) => {
	const contactHref = type === 'mailto' ? `mailto:${contact}` : `tel:${contact}`
	const contactTooltip = type === 'mailto' ? 'Enviar un correo.' : 'Hacer una llamada.'
	return (
		<div className="component__contact">
			<Tooltip title={contactTooltip}>
				<a href={contactHref} className="contact__text">
					{type === 'mailto' ? <FiMail size={18} /> : <FiPhone size={18} />}
					{contact}
				</a>
			</Tooltip>
		</div>
	)
}

export default Contacts
