import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router'
import { applyToJob } from '@/api/application'
import type { RequestApplyDto } from '@/types/application'

export const useApply = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: (payload: RequestApplyDto) => applyToJob(payload),
		onSuccess: data => {
			navigate(`/analysis/result/${data.id}`)
		},
		onError: err => {
			if (isAxiosError(err) && err.response?.status === 409) {
				window.alert('이미 지원한 공고입니다.')
			}
		},
	})
}
