export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

export interface RequestApplyDto {
	resumeId: number
	jobPostingId: number
}

export interface ResponseApplyDto {
	id: number
	resumeId: number
	jobPostingId: number
	status: ApplicationStatus
	appliedAt: string
}
