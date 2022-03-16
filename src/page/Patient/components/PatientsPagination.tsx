import { Pagination } from '@mui/material'
import { propsPagination } from '../../../Interface/Interface'

const PatientsPagination = ({
	loading,
	totalPages,
	currentPage,
	validaPagination,
	handleChangePage,
}: propsPagination) => (
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

export default PatientsPagination
