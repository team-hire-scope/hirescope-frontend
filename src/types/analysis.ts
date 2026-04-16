export type AnalysisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

export interface InterviewQuestion {
	question: string
	intent: string
	answer_guide: string
}

export interface AnalysisResult {
	status: AnalysisStatus
	message: string
	totalScore: number
	scoreJobFit: number
	scoreCareerConsistency: number
	scoreSkillMatch: number
	scoreQuantitativeAchievement: number
	scoreDocumentQuality: number
	summary: string
	interviewQuestions: InterviewQuestion[]
	analyzedAt: string
}
