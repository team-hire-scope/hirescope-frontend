import { useQuery } from '@tanstack/react-query'
import { getApplicationDetail } from '../../api/jobs'

export const applicationDetailQueryKey = (applicationId: string) => ['applicationDetail', applicationId] as const

export const useApplicationDetail = (applicationId: string) => {
	return useQuery({
		queryKey: applicationDetailQueryKey(applicationId),
		queryFn: () => getApplicationDetail(applicationId),
		enabled: Boolean(applicationId),
	})
}
