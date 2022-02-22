import React from 'react'
import { FiCalendar, FiUsers } from 'react-icons/fi'

const ArticleDataCounts = ({ loadingDataCount, title, total, className, type }) => {
	return loadingDataCount ? (
		<div className="content__loader" />
	) : (
		<div className="dashboard__data__counts__article">
			<i className={`dashboard__data__counts__article__icon ${className}`}>
				{type === 'user' ? <FiUsers /> : <FiCalendar />}
			</i>
			<article className="dashboard__data__counts__article__data">
				<p className="dashboard__data__counts__article__data__title">{title}</p>
				<h3 className="dashboard__data__counts__article__data__number">{total}</h3>
			</article>
		</div>
	)
}

export default ArticleDataCounts
