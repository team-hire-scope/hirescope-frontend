import { api } from '../utils/AxiosInstance'
import type { ApiResponse } from '../types/auth'
import type { RequestApplyDto, ResponseApplyDto } from '../types/application'

export const applyToJob = async (payload: RequestApplyDto): Promise<ResponseApplyDto> => {
	const response = await api.post<ApiResponse<ResponseApplyDto>>('/api/applications', payload)
	return response.data.data
}
