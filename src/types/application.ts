export type ApplicationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ACCEPTED' | 'REJECTED'

export interface MyApplicationItem {
	applicationId: number
	jobPostingId: number
	jobTitle: string
	companyName: string
	resumeId: number
	resumeTitle: string
	status: ApplicationStatus
	appliedAt: string
}

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
