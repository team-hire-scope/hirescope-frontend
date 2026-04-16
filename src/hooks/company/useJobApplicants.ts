import { useQuery } from '@tanstack/react-query'
import { getJobApplicants } from '../../api/jobs'
import type { JobApplicantRow } from '../../types/jobApplicants'

export const jobApplicantsQueryKey = (
	jobId: string,
	params?: { status?: JobApplicantRow['status']; page?: number; size?: number }
) => ['jobApplicants', jobId, params?.status ?? 'ALL', params?.page ?? 0, params?.size ?? 10] as const

export const useJobApplicants = (
	jobId: string,
	params?: { status?: JobApplicantRow['status']; page?: number; size?: number }
) => {
	return useQuery({
		queryKey: jobApplicantsQueryKey(jobId, params),
		queryFn: () => getJobApplicants(jobId, params),
		enabled: Boolean(jobId),
	})
}
