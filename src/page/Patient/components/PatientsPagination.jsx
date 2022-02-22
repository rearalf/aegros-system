import React from 'react'
import { Pagination } from '@mui/material'

const PatientsPagination = ({ currentPage, totalPage, handleChangePage, validaPagination }) => {
	return validaPagination ? (
		<Pagination
			variant="outlined"
			shape="rounded"
			count={totalPage}
			page={currentPage}
			onChange={handleChangePage}
		/>
	) : null
}

export default PatientsPagination
