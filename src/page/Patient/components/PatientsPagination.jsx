import React from 'react'
import { Pagination } from '@mui/material'

const PatientsPagination = ({
	currentPage,
	totalPage,
	handleChangePage,
	validaPagination,
	loading,
}) => (
	<Pagination
		variant="outlined"
		shape="rounded"
		className={`${validaPagination}
	${loading}`}
		count={totalPage}
		page={currentPage}
		onChange={handleChangePage}
	/>
)

export default PatientsPagination
