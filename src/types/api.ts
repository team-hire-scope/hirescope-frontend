export interface ApiResponse<T> {
	success: boolean
	code: string
	message: string
	data: T
}

export interface PageSort {
	empty: boolean
	sorted: boolean
	unsorted: boolean
}

export interface PageRequestInfo {
	offset: number
	sort: PageSort
	paged: boolean
	pageNumber: number
	pageSize: number
	unpaged: boolean
}

export interface PageResponse<T> {
	totalElements: number
	totalPages: number
	first: boolean
	last: boolean
	size: number
	content: T[]
	number: number
	sort: PageSort
	numberOfElements: number
	pageable: PageRequestInfo
	empty: boolean
}
