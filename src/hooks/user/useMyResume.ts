import { useQuery } from '@tanstack/react-query'
import { getResumeList, getResumeDetail } from '../../api/resume'
import type { ResponseResumeDto } from '../../types/resume'

export interface ResumeSectionStatus {
	label: string
	done: boolean
}

export interface ResumeDisplayData {
	id: number
	updatedAt: string
	completionRate: number
	sections: ResumeSectionStatus[]
	raw: ResponseResumeDto
}

const deriveSections = (resume: ResponseResumeDto): ResumeSectionStatus[] => [
	{ label: '기본 정보', done: !!(resume.title && resume.summary) },
	{ label: '학력', done: resume.educations.length > 0 },
	{ label: '경력', done: resume.careers.length > 0 },
	{ label: '기술 스택', done: resume.skills.length > 0 },
	{ label: '프로젝트', done: resume.projects.length > 0 },
	{ label: '자격증', done: resume.certifications.length > 0 },
]

const formatDate = (iso: string): string => {
	const d = new Date(iso)
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, '0')
	const day = String(d.getDate()).padStart(2, '0')
	return `${y}.${m}.${day}`
}

const toDisplayData = (resume: ResponseResumeDto): ResumeDisplayData => {
	const sections = deriveSections(resume)
	const done = sections.filter(s => s.done).length
	const completionRate = Math.round((done / sections.length) * 100)

	return {
		id: resume.id,
		updatedAt: formatDate(resume.updatedAt),
		completionRate,
		sections,
		raw: resume,
	}
}

export const useMyResume = () => {
	const { data: listData, isLoading: isListLoading } = useQuery({
		queryKey: ['resumes'],
		queryFn: getResumeList,
	})

	const smallestId = listData && listData.content.length > 0 ? Math.min(...listData.content.map(r => r.id)) : null

	const { data: detailData, isLoading: isDetailLoading } = useQuery({
		queryKey: ['resumes', smallestId],
		queryFn: () => getResumeDetail(smallestId!),
		enabled: smallestId !== null,
	})

	const isLoading = isListLoading || (smallestId !== null && isDetailLoading)
	const hasResume = listData ? listData.content.length > 0 : null

	return {
		isLoading,
		hasResume,
		resume: detailData ? toDisplayData(detailData) : null,
	}
}
