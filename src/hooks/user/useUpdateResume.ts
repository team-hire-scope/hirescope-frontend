import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { updateResume } from '../../api/resume'
import { mapResumeToRequest } from '../../utils/resumeMappers'
import type { Resume } from '../../types/resume'

interface UpdateResumePayload {
	id: number
	form: Resume
}

export const useUpdateResume = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, form }: UpdateResumePayload) => updateResume(id, mapResumeToRequest(form)),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ['resumes'] })
			queryClient.invalidateQueries({ queryKey: ['resumes', id] })
			navigate('/applicant-main', { replace: true })
		},
	})
}
