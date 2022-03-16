import { IconButton, Tooltip } from '@mui/material'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import NavBarActions from './NavBarActions'
import CurrentDate from './CurrentDate'
import useNavBar from '../hooks/useNavBar'
import '../assets/styles/components/NavBar.scss'

interface props {
	openSideBar: boolean
}

const NavBar = ({ openSideBar }: props) => {
	const { pageForward, pageBack } = useNavBar()
	return (
		<header className={`header ${openSideBar ? 'open__sidebar' : 'close__sidebar'}`}>
			<nav className="navbar">
				<div className="navbar__forward__back">
					<Tooltip title="Haz clic para volver atrás">
						<IconButton className="btn__icon navbar__button__icon" onClick={pageBack}>
							<FiArrowLeft size={18} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Haz clic para continuar">
						<IconButton
							className="btn__icon navbar__button__icon"
							onClick={pageForward}>
							<FiArrowRight size={18} />
						</IconButton>
					</Tooltip>
				</div>
				<CurrentDate />
				<NavBarActions />
			</nav>
		</header>
	)
}

export default NavBar
