export interface JobListItem {
	id: number
	userId: number
	companyName: string
	jobTitle: string
	jobDescription: string
	requiredSkills: string
	preferredQualifications: string
	weightJobFit: number
	weightCareerConsistency: number
	weightSkillMatch: number
	weightQuantitativeAchievement: number
	weightDocumentQuality: number
	createdAt: string
	updatedAt: string
}

export interface JobUpsertPayload {
	companyName: string
	jobTitle: string
	jobDescription: string
	requiredSkills: string
	preferredQualifications: string
	weightJobFit: number
	weightCareerConsistency: number
	weightSkillMatch: number
	weightQuantitativeAchievement: number
	weightDocumentQuality: number
	weightSkillMatchOrDefault: number
	weightJobFitOrDefault: number
	weightCareerConsistencyOrDefault: number
	weightQuantitativeAchievementOrDefault: number
	weightDocumentQualityOrDefault: number
	totalWeight: number
}

export interface JobListPage {
	totalElements: number
	totalPages: number
	first: boolean
	last: boolean
	size: number
	content: JobListItem[]
	number: number
	numberOfElements: number
	empty: boolean
}

export interface GetJobListParams {
	page?: number
	size?: number
}
