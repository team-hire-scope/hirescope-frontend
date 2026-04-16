import { useMutation } from '@tanstack/react-query'
import { createJob, updateJob } from '../../api/jobs'
import type { JobUpsertPayload } from '../../types/job'

export const useCreateJob = () => {
	return useMutation({
		mutationFn: (payload: JobUpsertPayload) => createJob(payload),
	})
}

export const useUpdateJob = () => {
	return useMutation({
		mutationFn: ({ id, payload }: { id: string | number; payload: JobUpsertPayload }) => updateJob(id, payload),
	})
}
