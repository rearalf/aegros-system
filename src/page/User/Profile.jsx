import React from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import { FiEdit, FiKey, FiMail, FiPhone } from 'react-icons/fi'
import { BreadCrumbsComponent, Loading, AvatarComponent } from '@components'
import useProfile from '@hooks/useProfile'
import '@styles/page/Profile.scss'

const Profile = () => {
	const { userData, loading, validShowContent } = useProfile()
	return (
		<main className="container profile" id="layout">
			<BreadCrumbsComponent
				links={[
					{
						link_name: 'Perfil',
						link_to: '/private/profile',
					},
				]}
			/>
			<header className="profile__header">
				<h1>Perfil</h1>
			</header>
			{loading ? <Loading /> : null}
			<section className={`profile__contents ${validShowContent}`}>
				<div className="profile__contents__person">
					<Tooltip title="Editar datos">
						<Link to={`/private/profile`} className="profile__contents__person__edit">
							<FiEdit size={24} />
						</Link>
					</Tooltip>
					<Tooltip title="Cambiar contraseña">
						<Link
							to={`/private/profile`}
							className="profile__contents__person__password">
							<FiKey size={24} />
						</Link>
					</Tooltip>
					<div className="profile__contents__person__information">
						<AvatarComponent
							className="profile__contents__person__information__avatar"
							name={userData.user_name}
						/>
						<article className="profile__contents__person__information__data">
							<h2 className="profile__contents__person__information__data__title">
								{userData.user_name}
							</h2>
							<h3 className="profile__contents__person__information__data__role">
								{userData.user_role}
							</h3>
						</article>
					</div>
					<div className="profile__contents__person__contacts">
						<h3 className="profile__contents__person__contacts__title">Contactos</h3>
						<a
							href={`mailto:${userData.user_email}`}
							className="profile__contents__person__contacts__text">
							<FiMail />
							{userData.user_email}
						</a>
						{userData.user_phone && (
							<a
								href={`tel:${userData.user_phone}`}
								className="profile__contents__person__contacts__text">
								<FiPhone />
								{userData.user_phone}
							</a>
						)}
					</div>
				</div>
				<div className="profile__contents__dates">
					<article className="profile__contents__dates__date">
						<h3>Cuenta creada:</h3>
						<p>{userData.createdAt}</p>
					</article>
					<article className="profile__contents__dates__date">
						<h3>Ultima actualización de datos:</h3>
						<p>{userData.updatedAt}</p>
					</article>
				</div>
			</section>
		</main>
	)
}

export default Profile
