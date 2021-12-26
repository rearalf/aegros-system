import React from 'react'
import { Breadcrumbs } from '@mui/material/'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import '@styles/components/BreadCrumbsComponent.scss'

export const BreadCrumbsComponent = ({
	links = [
		{
			link_name: 'Dashboard',
			link_to: '/Dashboard',
		},
	],
}) => {
	const totalLinks = links.length - 1
	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			id="breadCrumbs"
			separator={<FiChevronRight size={18} />}>
			{links.map(({ link_name, link_to }, index) => {
				return totalLinks === index ? (
					<p key={link_to}>{link_name}</p>
				) : (
					<Link to={link_to} key={link_to}>
						{link_name}
					</Link>
				)
			})}
		</Breadcrumbs>
	)
}
