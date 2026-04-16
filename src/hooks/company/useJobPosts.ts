import { useQuery } from '@tanstack/react-query'
import { getJobPosts } from '../../api/jobs'

export const jobPostsQueryKey = (params?: { page?: number; size?: number }) =>
	['jobPosts', params?.page ?? 0, params?.size ?? 10] as const

export const useJobPosts = (params?: { page?: number; size?: number }) => {
	return useQuery({
		queryKey: jobPostsQueryKey(params),
		queryFn: () => getJobPosts(params),
	})
}
