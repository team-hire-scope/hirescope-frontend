import { api } from '../utils/AxiosInstance'
import type { ApiResponse } from '../types/auth'
import type { AnalysisResult } from '../types/analysis'

export const getAnalysisResult = async (applicationId: string): Promise<AnalysisResult> => {
	const response = await api.get<ApiResponse<AnalysisResult>>(`/api/applications/${applicationId}/result`)
	return response.data.data
}
