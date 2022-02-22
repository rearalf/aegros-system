import React from 'react'
import { Pagination } from '@mui/material'

const AppointmentsPagination = ({ validaPagination, totalPages, currentPage, handleChangePage }) => {
	return validaPagination ? (
		<Pagination
			variant="outlined"
			shape="rounded"
			count={totalPages}
			page={currentPage}
			onChange={handleChangePage}
		/>
	) : null
}

export default AppointmentsPagination
