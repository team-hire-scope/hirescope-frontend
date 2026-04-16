import { useQuery } from '@tanstack/react-query'
import { getJobList } from '../../api/job'

export const useJobList = (page: number, size: number) => {
	return useQuery({
		queryKey: ['jobs', page, size],
		queryFn: () => getJobList({ page, size }),
		placeholderData: prev => prev, // 페이지 전환 시 이전 데이터 유지
	})
}
