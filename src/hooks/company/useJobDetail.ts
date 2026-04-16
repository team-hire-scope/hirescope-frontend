import { useQuery } from '@tanstack/react-query'
import { getJobById } from '../../api/jobs'

export const jobDetailQueryKey = (jobId: string) => ['jobDetail', jobId] as const

export const useJobDetail = (jobId: string) => {
	return useQuery({
		queryKey: jobDetailQueryKey(jobId),
		queryFn: () => getJobById(jobId),
		enabled: Boolean(jobId),
	})
}
