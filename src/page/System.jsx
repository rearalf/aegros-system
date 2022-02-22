import React from 'react'
import { shell } from 'electron'
import Logo from '@image/icons/logo64x64.png'
import packages from '../../package.json'
import '@styles/page/System.scss'

const System = () => {
	const openUrl = url => shell.openExternal(url)
	return (
		<main className="container system" id="layout">
			<header className="system__header">
				<h2 className="system__header__title">Información del sistema</h2>
			</header>
			<section className="system__content">
				<article className="system__content__name">
					<img src={Logo} alt="Logo" className="system__content__name__logo" />
					<h1 className="system__content__name__title">Aegros</h1>
				</article>
				<article className="system__content__version">
					<h3 className="system__content__version__title">
						Version del software: {packages.version}
					</h3>
					<a
						onClick={() => openUrl('https://github.com/rearalf/aegros-system/releases')}
						className="system__content__version__notes">
						Notas de lanzamiento
					</a>
				</article>
				<article className="system__content__version">
					<h3 className="system__content__version__title">
						<a onClick={() => openUrl('https://github.com/rearalf/aegros-system')}>
							Licencia y Documentación
						</a>
					</h3>
					<h3 className="system__content__version__title">
						<a onClick={() => openUrl(packages.bugs.url)}>Notificar un problema</a>
					</h3>
				</article>
				<article className="system__content__author">
					<h3 className="system__content__author__title">
						Autor:
						<a
							onClick={() => openUrl(packages.author.url)}
							className="system__content__author__title__link">
							{packages.author.name}
						</a>
					</h3>
				</article>
			</section>
		</main>
	)
}

export default System
