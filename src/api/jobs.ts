import { api } from '../utils/AxiosInstance'
import type { ApiResponse, PageResponse } from '../types/api'
import type { JobPost, JobUpsertPayload } from '../types/job'
import type { JobApplicantRow } from '../types/jobApplicants'

export const getJobPosts = async (params?: { page?: number; size?: number }): Promise<PageResponse<JobPost>> => {
	const response = await api.get<ApiResponse<PageResponse<JobPost>>>('/api/jobs', { params })
	return response.data.data
}

export const getJobApplicants = async (
	jobId: string | number,
	params?: { status?: JobApplicantRow['status']; page?: number; size?: number }
): Promise<PageResponse<JobApplicantRow>> => {
	const response = await api.get<ApiResponse<PageResponse<JobApplicantRow>>>(`/api/jobs/${jobId}/applicants`, { params })
	return response.data.data
}

export const createJob = async (payload: JobUpsertPayload): Promise<JobPost> => {
	const response = await api.post<ApiResponse<JobPost>>('/api/jobs', payload)
	return response.data.data
}

export const updateJob = async (id: string | number, payload: JobUpsertPayload): Promise<JobPost> => {
	const response = await api.put<ApiResponse<JobPost>>(`/api/jobs/${id}`, payload)
	return response.data.data
}
