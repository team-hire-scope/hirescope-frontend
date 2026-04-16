import { useQuery } from '@tanstack/react-query'
import { getMyApplications } from '@/api/application'

export const useMyApplications = (size = 5) => {
	return useQuery({
		queryKey: ['my-applications', size],
		queryFn: () => getMyApplications(0, size),
	})
}
