import { useNavigate } from 'react-router-dom'

function useNavBar(){
	const navigate = useNavigate()

	const pageForward = () => {
		navigate(1)
	}
	const pageBack = () => {
		navigate(-1)
	}
	return {
		pageForward,
		pageBack,
	}
}

export default useNavBar
