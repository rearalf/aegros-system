import { Pagination } from '@mui/material'
import { propsPagination } from '../../../Interface/Interface'

const UsersPagination = ({
	currentPage,
	totalPages,
	handleChangePage,
	validaPagination,
	loading,
}: propsPagination) => (
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
