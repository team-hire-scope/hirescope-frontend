export interface JobPost {
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
