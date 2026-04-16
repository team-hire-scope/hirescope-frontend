import { useQuery } from '@tanstack/react-query'
import { getAnalysisResult } from '@/api/analysis'

const POLL_INTERVAL_MS = 30_000

export const useAnalysisResult = (applicationId: string) => {
	return useQuery({
		queryKey: ['analysis-result', applicationId],
		queryFn: () => getAnalysisResult(applicationId),
		refetchInterval: data => {
			const status = data?.state.data?.status
			if (status === 'PENDING' || status === 'PROCESSING') return POLL_INTERVAL_MS
			return false
		},
	})
}
