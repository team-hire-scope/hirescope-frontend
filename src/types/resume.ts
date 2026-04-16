// ─── 폼 내부 타입 (기존 컴포넌트에서 사용) ───────────────────────────────────

export interface Education {
	id?: string
	resumeId?: string
	schoolName: string
	major: string
	degree: string
	startDate: string
	endDate?: string
}

export interface Career {
	id?: string
	resumeId?: string
	companyName: string
	jobTitle: string
	position: string
	startDate: string
	endDate?: string
	jobDescription: string
	quantitativeResults: string
}

export interface Skill {
	id?: string
	resumeId?: string
	skillName: string
	proficiency: 'high' | 'mid' | 'low'
	durationMonths: number
}

export interface Project {
	id?: string
	resumeId?: string
	projectName: string
	role: string
	duration: string
	techStack: string
	achievementsDescription: string
}

export interface Certification {
	id?: string
	resumeId?: string
	certificationName: string
	issuer: string
	acquisitionDate: string
}

export interface Resume {
	id?: string
	userId: string
	title: string
	summary: string
	educations: Education[]
	careers: Career[]
	skills: Skill[]
	projects: Project[]
	certifications: Certification[]
	createdAt?: string
	updatedAt?: string
}

// ─── API 요청 타입 ────────────────────────────────────────────────────────────

type Proficiency = 'HIGH' | 'MEDIUM' | 'LOW'

export interface RequestCareerDto {
	companyName: string
	position: string
	rank: string
	startDate: string
	endDate: string
	description: string
	quantitativeAchievement: string
}

export interface RequestEducationDto {
	schoolName: string
	major: string
	degree: string
	enrollmentDate: string
	graduationDate: string
}

export interface RequestSkillDto {
	skillName: string
	proficiency: Proficiency
	monthsOfExperience: number
}

export interface RequestProjectDto {
	projectName: string
	role: string
	period: string
	technologies: string
	achievement: string
}

export interface RequestCertificationDto {
	certificationName: string
	issuingOrganization: string
	acquiredDate: string
}

export interface RequestCreateResumeDto {
	title: string
	summary: string
	careers: RequestCareerDto[]
	educations: RequestEducationDto[]
	skills: RequestSkillDto[]
	projects: RequestProjectDto[]
	certifications: RequestCertificationDto[]
}

// ─── API 응답 타입 ────────────────────────────────────────────────────────────

export interface ResponseCareerDto extends RequestCareerDto {
	id: number
}

export interface ResponseEducationDto extends RequestEducationDto {
	id: number
}

export interface ResponseSkillDto extends RequestSkillDto {
	id: number
}

export interface ResponseProjectDto extends RequestProjectDto {
	id: number
}

export interface ResponseCertificationDto extends RequestCertificationDto {
	id: number
}

export interface ResponseResumeDto {
	id: number
	userId: number
	title: string
	summary: string
	createdAt: string
	updatedAt: string
	careers: ResponseCareerDto[]
	educations: ResponseEducationDto[]
	skills: ResponseSkillDto[]
	projects: ResponseProjectDto[]
	certifications: ResponseCertificationDto[]
}

// ─── 이력서 목록 조회 응답 ────────────────────────────────────────────────────

export interface ResumeListItem {
	id: number
	title: string
	summary: string
	createdAt: string
}

export interface ResumeListPage {
	totalElements: number
	totalPages: number
	first: boolean
	last: boolean
	size: number
	content: ResumeListItem[]
	number: number
	numberOfElements: number
	empty: boolean
}

// ─── 기타 ─────────────────────────────────────────────────────────────────────

export interface AIAnalysisRequest {
	resumeId?: string
	resumeContent?: Resume
	companyName: string
	jobDescription: string
}

export interface InterviewQuestion {
	id: string
	category: 'technical' | 'personality' | 'experience'
	question: string
	intent?: string
}

export interface AIAnalysisResult {
	id: string
	analysisRequestId: string
	questions: InterviewQuestion[]
	summary: string
	score?: number
}
