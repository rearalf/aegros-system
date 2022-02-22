import React from 'react'
import brand_nav from '@image/brand_nav.png'
import NavBarActions from './NavBarActions'
import '@styles/components/PublicNavBar.scss'

const PublicNavBar = () => {
	return (
		<header className="header__public">
			<nav className="navbar">
				<div className="navbar__brand">
					<span className="navbar__link__brand">
						<img src={brand_nav} alt="Aegros" className="image__brand" />
					</span>
				</div>
				<div className="navbar__center" />
				<NavBarActions />
			</nav>
		</header>
	)
}

export default PublicNavBar
