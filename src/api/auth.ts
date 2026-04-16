import { api } from '../utils/AxiosInstance'
import type { ApiResponse, RequestLoginDto, RequestSignupDto, ResponseLoginDto, ResponseSignupDto } from '../types/auth'

export const login = async (payload: RequestLoginDto): Promise<ResponseLoginDto> => {
	const response = await api.post<ApiResponse<ResponseLoginDto>>('/api/auth/login', payload)
	return response.data.data
}

export const signup = async (payload: RequestSignupDto): Promise<ResponseSignupDto> => {
	const response = await api.post<ApiResponse<ResponseSignupDto>>('/api/auth/signup', payload)
	return response.data.data
}
