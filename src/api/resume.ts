import { api } from '../utils/AxiosInstance'
import type { ApiResponse } from '../types/auth'
import type { RequestCreateResumeDto, ResponseResumeDto, ResumeListPage } from '../types/resume'

export const createResume = async (payload: RequestCreateResumeDto): Promise<ResponseResumeDto> => {
	const response = await api.post<ApiResponse<ResponseResumeDto>>('/api/resumes', payload)
	return response.data.data
}

export const getResumeList = async (): Promise<ResumeListPage> => {
	const response = await api.get<ApiResponse<ResumeListPage>>('/api/resumes')
	return response.data.data
}

export const getResumeDetail = async (id: number): Promise<ResponseResumeDto> => {
	const response = await api.get<ApiResponse<ResponseResumeDto>>(`/api/resumes/${id}`)
	return response.data.data
}

export const updateResume = async (id: number, payload: RequestCreateResumeDto): Promise<ResponseResumeDto> => {
	const response = await api.put<ApiResponse<ResponseResumeDto>>(`/api/resumes/${id}`, payload)
	return response.data.data
}
