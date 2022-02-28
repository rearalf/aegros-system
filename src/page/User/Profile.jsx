import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Tooltip } from '@mui/material'
import { FiEdit, FiKey, FiMail, FiPhone, FiThumbsDown, FiThumbsUp, FiTrash } from 'react-icons/fi'
import { BreadCrumbsComponent, Loading, AvatarComponent } from '@components'
import useProfile from '@hooks/useProfile'
import '@styles/page/Profile.scss'

const Profile = () => {
	const {
		userData,
		loading,
		validShowContent,
		enableOrDisable,
		validUserState,
		BreadCrumbs,
		titleParams,
	} = useProfile()
	return (
		<main className="container profile" id="layout">
			<BreadCrumbsComponent links={BreadCrumbs} />
			<header className="profile__header">
				<h1>{titleParams}</h1>
			</header>
			{loading ? <Loading /> : null}
			<section className={`profile__contents ${validShowContent}`}>
				<div className="profile__contents__person">
					<div className="profile__contents__person__actions">
						<Tooltip title="Editar datos">
							<Link
								to={`/private/users/update-user/${userData._id}`}
								className={`profile__contents__person__actions__button profile__contents__person__edit ${validUserState}`}>
								<FiEdit size={18} />
							</Link>
						</Tooltip>
						<Tooltip title="Cambiar contraseña">
							<Link
								to={`/private/profile`}
								className={`profile__contents__person__actions__button profile__contents__person__password  ${validUserState}`}>
								<FiKey size={18} />
							</Link>
						</Tooltip>
						<Tooltip title="Eliminar usuario">
							<IconButton
								className={`profile__contents__person__actions__button profile__contents__person__delete  ${enableOrDisable}`}>
								<FiTrash size={18} />
							</IconButton>
						</Tooltip>
						<Tooltip
							title={userData.user_state ? 'Desactivar usuario' : 'Activar usuario'}>
							<IconButton
								className={`profile__contents__person__actions__button profile__contents__person__delete  ${enableOrDisable}`}>
								{userData.user_state ? (
									<FiThumbsDown size={18} />
								) : (
									<FiThumbsUp size={18} />
								)}
							</IconButton>
						</Tooltip>
					</div>
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
