import { useState } from 'react'

function usePrivateLayout(){
	const [ openSideBar, setOpenSideBar ] = useState(false)
	const changeValueSidebar = () => setOpenSideBar(!openSideBar)
	return {
		openSideBar,
		changeValueSidebar,
	}
}

export default usePrivateLayout
