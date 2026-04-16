import { api } from '../utils/AxiosInstance'
import type { ApiResponse } from '../types/auth'
import type { JobListPage, GetJobListParams } from '../types/job'

export const getJobList = async ({ page = 0, size = 9 }: GetJobListParams = {}): Promise<JobListPage> => {
	const response = await api.get<ApiResponse<JobListPage>>('/api/jobs', {
		params: { page, size },
	})
	return response.data.data
}
