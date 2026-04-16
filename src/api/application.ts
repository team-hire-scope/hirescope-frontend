import { api } from '../utils/AxiosInstance'
import type { ApiResponse } from '../types/auth'
import type { PageResponse } from '../types/api'
import type { RequestApplyDto, ResponseApplyDto, MyApplicationItem } from '../types/application'

export const applyToJob = async (payload: RequestApplyDto): Promise<ResponseApplyDto> => {
	const response = await api.post<ApiResponse<ResponseApplyDto>>('/api/applications', payload)
	return response.data.data
}

export const getMyApplications = async (page = 0, size = 5): Promise<PageResponse<MyApplicationItem>> => {
	const response = await api.get<ApiResponse<PageResponse<MyApplicationItem>>>('/api/applications/me', {
		params: { page, size },
	})
	return response.data.data
}
