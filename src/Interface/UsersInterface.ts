export interface propsUsersParams {
	loading: string
	validShow: string
	userSearch: {
		user_name: string
		show_users_form: boolean
	}
	pagesAndLimit: {
		currentPage: number
		limit: number
		totalUser: number
		totalPages: number
		sortBy: string
		asc: boolean
		loadingSort: boolean
	}
	classFormShow: string
	validAditional: {
		toolTipTitle: string
		validLengthName: string
		sortAsc: string
	}
	handleChangeAsc: (e: any) => void
	handeChangeInput: (e: any) => void
	handleSearchUser: (e: any) => void
	handleResetSearch: (e: any) => void
	handleChangeLimit: (e: any) => void
	handleChangeSortBy: (e: any) => void
	handleChangeStateForm: (e: any) => void
}

export interface propsUsersTable {
	users: userTableInterface[]
	loading: string
	validShowTable: string
	id_user: string
}

export interface userTableInterface {
	_id: string
	user_role: string
	user_name: string
	user_email: string
	user_state: string
}

export interface userProfile {
	_id: string
	user_name: string
	user_name_short: string
	user_password?: string
	user_password2?: string
	user_state: string
	user_role: string
	user_email: string
	user_phone: string
	updatedAt: string
	createdAt: string
}

export const userProfileDefaut = {
	_id: '',
	user_name: '',
	user_name_short: '',
	user_password: '',
	user_password2: '',
	user_state: '',
	user_role: '',
	user_email: '',
	user_phone: '',
	updatedAt: '',
	createdAt: '',
}

export interface updateUserInterface {
	user_name: string
	user_email: string
	user_phone: string
}
