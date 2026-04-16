import type { Resume } from '../types/resume'
import type { RequestCreateResumeDto, ResponseResumeDto } from '../types/resume'

// YYYY.MM → YYYY-MM-01 변환
export const toIsoDate = (value: string | undefined): string => {
	if (!value) return ''
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
	if (/^\d{4}\.\d{2}$/.test(value)) return `${value.replace('.', '-')}-01`
	return value
}

const toProficiency = (value: 'high' | 'mid' | 'low'): 'HIGH' | 'MID' | 'LOW' => value.toUpperCase() as 'HIGH' | 'MID' | 'LOW'

const fromProficiency = (value: string): 'high' | 'mid' | 'low' => value.toLowerCase() as 'high' | 'mid' | 'low'

/** 폼 데이터 → API 요청 */
export const mapResumeToRequest = (form: Resume): RequestCreateResumeDto => ({
	title: form.title,
	summary: form.summary,
	careers: form.careers.map(c => ({
		companyName: c.companyName,
		position: c.jobTitle, // 폼: jobTitle → API: position (직무)
		rank: c.position, // 폼: position → API: rank (직급)
		startDate: toIsoDate(c.startDate),
		endDate: toIsoDate(c.endDate),
		description: c.jobDescription,
		quantitativeAchievement: c.quantitativeResults,
	})),
	educations: form.educations.map(e => ({
		schoolName: e.schoolName,
		major: e.major,
		degree: e.degree,
		enrollmentDate: toIsoDate(e.startDate),
		graduationDate: toIsoDate(e.endDate),
	})),
	skills: form.skills.map(s => ({
		skillName: s.skillName,
		proficiency: toProficiency(s.proficiency),
		monthsOfExperience: s.durationMonths,
	})),
	projects: form.projects.map(p => ({
		projectName: p.projectName,
		role: p.role,
		period: p.duration,
		technologies: p.techStack,
		achievement: p.achievementsDescription,
	})),
	certifications: form.certifications.map(c => ({
		certificationName: c.certificationName,
		issuingOrganization: c.issuer,
		acquiredDate: toIsoDate(c.acquisitionDate),
	})),
})

/** API 응답 → 폼 데이터 */
export const mapResponseToForm = (dto: ResponseResumeDto): Resume => ({
	id: String(dto.id),
	userId: String(dto.userId),
	title: dto.title,
	summary: dto.summary,
	careers: dto.careers.map(c => ({
		companyName: c.companyName,
		jobTitle: c.position, // API: position → 폼: jobTitle (직무)
		position: c.rank, // API: rank → 폼: position (직급)
		startDate: c.startDate,
		endDate: c.endDate,
		jobDescription: c.description,
		quantitativeResults: c.quantitativeAchievement,
	})),
	educations: dto.educations.map(e => ({
		schoolName: e.schoolName,
		major: e.major,
		degree: e.degree,
		startDate: e.enrollmentDate,
		endDate: e.graduationDate,
	})),
	skills: dto.skills.map(s => ({
		skillName: s.skillName,
		proficiency: fromProficiency(s.proficiency),
		durationMonths: s.monthsOfExperience,
	})),
	projects: dto.projects.map(p => ({
		projectName: p.projectName,
		role: p.role,
		duration: p.period,
		techStack: p.technologies,
		achievementsDescription: p.achievement,
	})),
	certifications: dto.certifications.map(c => ({
		certificationName: c.certificationName,
		issuer: c.issuingOrganization,
		acquisitionDate: c.acquiredDate,
	})),
})
