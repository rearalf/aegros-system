import image__empty from '../assets/image/no-data.svg'
import '../assets/styles/components/EmptyData.scss'

const EmptyData = ({ title = 'No hay datos', loading = false }) => {
	return (
		<div className={`empty__data ${loading ? 'hide' : ''}`}>
			<img src={image__empty} alt={title} className="empty__data__image" />
			<h3 className="empty__data__title">{title}</h3>
		</div>
	)
}

export default EmptyData
