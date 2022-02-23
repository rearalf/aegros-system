import React from 'react'
import { Pagination } from '@mui/material'

const UsersPagination = ({
	currentPage,
	totalPages,
	handleChangePage,
	validaPagination,
	loading,
}) => (
	<Pagination
		variant="outlined"
		shape="rounded"
		className={`${loading} ${validaPagination}`}
		count={totalPages}
		page={currentPage}
		onChange={handleChangePage}
	/>
)

export default UsersPagination
