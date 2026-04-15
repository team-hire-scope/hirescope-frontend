export interface Education {
	id?: string
	resumeId?: string
	schoolName: string
	major: string
	degree: string
	startDate: string // 입학일
	endDate?: string // 졸업일
}

export interface Career {
	id?: string
	resumeId?: string
	companyName: string
	jobTitle: string // 직무
	position: string // 직급
	startDate: string
	endDate?: string
	jobDescription: string // 담당 업무 설명
	quantitativeResults: string // 정량적 성과
}

export interface Skill {
	id?: string
	resumeId?: string
	skillName: string
	proficiency: 'high' | 'mid' | 'low' // 숙련도 (상/중/하)
	durationMonths: number // 사용 기간 (개월 수)
}

export interface Project {
	id?: string
	resumeId?: string
	projectName: string
	role: string
	duration: string // 기간 (예: 2023.01 - 2023.03)
	techStack: string // 사용 기술 (문자열 또는 콤마로 구분된 리스트)
	achievementsDescription: string // 성과 설명
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
	summary: string // 자기소개 요약
	educations: Education[]
	careers: Career[]
	skills: Skill[]
	projects: Project[]
	certifications: Certification[]
	createdAt?: string
	updatedAt?: string
}

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
