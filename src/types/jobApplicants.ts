export type ApplicationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

export interface JobApplicantRow {
	applicationId: number
	resumeId: number
	applicantName: string
	status: ApplicationStatus
	totalScore: number
	scoreJobFit: number
	scoreCareerConsistency: number
	scoreSkillMatch: number
	scoreQuantitativeAchievement: number
	scoreDocumentQuality: number
	appliedAt: string
}
