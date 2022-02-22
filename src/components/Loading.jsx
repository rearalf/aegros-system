import React from 'react'
import '@styles/components/Loading.scss'

const Loading = () => {
	return (
		<div className="Loading">
			<div className="circle" />
			<div className="circle" />
			<div className="circle" />
			<div className="shadow" />
			<div className="shadow" />
			<div className="shadow" />
			<span>Cargando</span>
		</div>
	)
}

export default Loading
