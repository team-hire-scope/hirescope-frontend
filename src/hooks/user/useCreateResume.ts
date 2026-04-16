import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { createResume } from '../../api/resume'
import { mapResumeToRequest } from '../../utils/resumeMappers'
import type { Resume } from '../../types/resume'

export const useCreateResume = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: (form: Resume) => createResume(mapResumeToRequest(form)),
		onSuccess: () => {
			navigate('/applicant-main', { replace: true })
		},
	})
}
