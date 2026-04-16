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

export interface ResumeCareer {
	id: number
	companyName: string
	position: string
	rank: string
	startDate: string
	endDate: string
	description: string
	quantitativeAchievement: string
}

export interface ResumeEducation {
	id: number
	schoolName: string
	major: string
	degree: string
	enrollmentDate: string
	graduationDate: string
}

export interface ResumeSkill {
	id: number
	skillName: string
	proficiency: 'LOW' | 'MEDIUM' | 'HIGH'
	monthsOfExperience: number
}

export interface ResumeProject {
	id: number
	projectName: string
	role: string
	period: string
	technologies: string
	achievement: string
}

export interface ResumeCertification {
	id: number
	certificationName: string
	issuingOrganization: string
	acquiredDate: string
}

export interface ApplicationResume {
	id: number
	userId: number
	title: string
	summary: string
	createdAt: string
	updatedAt: string
	careers: ResumeCareer[]
	educations: ResumeEducation[]
	skills: ResumeSkill[]
	projects: ResumeProject[]
	certifications: ResumeCertification[]
}

export interface ApplicationAnalysisResult {
	totalScore: number
	scoreJobFit: number
	scoreCareerConsistency: number
	scoreSkillMatch: number
	scoreQuantitativeAchievement: number
	scoreDocumentQuality: number
	summary: string
	analyzedAt: string
}

export interface ApplicationDetail {
	applicationId: number
	resumeId: number
	jobPostingId: number
	status: ApplicationStatus
	appliedAt: string
	resume: ApplicationResume
	analysisResult: ApplicationAnalysisResult | null
}
