import React from 'react'
import { Pagination } from '@mui/material'

const AppointmentsPagination = ({
	loading,
	totalPages,
	currentPage,
	validaPagination,
	handleChangePage,
}) => (
	<Pagination
		variant="outlined"
		shape="rounded"
		className={`${validaPagination}
	${loading}`}
		count={totalPages}
		page={currentPage}
		onChange={handleChangePage}
	/>
)

export default AppointmentsPagination
