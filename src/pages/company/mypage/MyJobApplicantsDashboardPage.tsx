import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FilterBar } from '../../../components/company/candidate/FilterBar'
import { SortDropdown } from '../../../components/company/candidate/SortDropdown'
import { CandidateTable, type CandidateRow } from '../../../components/company/candidate/CandidateTable'

interface WeightedCandidate {
	id: string
	name: string
	status: '검토중' | '서류 통과' | '면접 예정' | '탈락'
	appliedAt: string
	totalScore: number
	fitScore: number
	careerScore: number
	stackScore: number
	achievementScore: number
	docScore: number
	summary: string
}

const weightedCandidates: WeightedCandidate[] = [
	{
		id: 'c1',
		name: '김지원',
		status: '서류 통과',
		appliedAt: '2026-04-11',
		totalScore: 91,
		fitScore: 92,
		careerScore: 88,
		stackScore: 94,
		achievementScore: 90,
		docScore: 89,
		summary: '프론트엔드 실무 4년, React 성능 개선 경험과 협업 커뮤니케이션이 우수함.',
	},
	{
		id: 'c2',
		name: '이서준',
		status: '검토중',
		appliedAt: '2026-04-13',
		totalScore: 83,
		fitScore: 84,
		careerScore: 80,
		stackScore: 86,
		achievementScore: 81,
		docScore: 82,
		summary: '기술 스택은 우수하나 프로젝트 임팩트 정량화가 상대적으로 부족함.',
	},
	{
		id: 'c3',
		name: '박민아',
		status: '면접 예정',
		appliedAt: '2026-04-10',
		totalScore: 88,
		fitScore: 90,
		careerScore: 85,
		stackScore: 89,
		achievementScore: 87,
		docScore: 88,
		summary: '도메인 적합도가 높고 포트폴리오 문서 품질이 좋아 면접 후보로 적합함.',
	},
]

const MyJobApplicantsDashboardPage = () => {
	const { jobId } = useParams()
	const navigate = useNavigate()
	const [status, setStatus] = useState<'all' | '검토중' | '서류 통과' | '면접 예정' | '탈락'>('all')
	const [scoreBand, setScoreBand] = useState<'all' | '90+' | '80-89' | 'under-80'>('all')
	const [keyword, setKeyword] = useState('')
	const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'latest'>('score-desc')

	const visibleCandidates = useMemo(() => {
		const filtered = weightedCandidates.filter(candidate => {
			const isStatusMatch = status === 'all' || candidate.status === status
			const isKeywordMatch = candidate.name.includes(keyword.trim())
			const isScoreBandMatch =
				scoreBand === 'all' ||
				(scoreBand === '90+' && candidate.totalScore >= 90) ||
				(scoreBand === '80-89' && candidate.totalScore >= 80 && candidate.totalScore < 90) ||
				(scoreBand === 'under-80' && candidate.totalScore < 80)

			return isStatusMatch && isKeywordMatch && isScoreBandMatch
		})

		return [...filtered].sort((a, b) => {
			if (sortBy === 'score-desc') return b.totalScore - a.totalScore
			if (sortBy === 'score-asc') return a.totalScore - b.totalScore
			return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
		})
	}, [keyword, scoreBand, sortBy, status])

	return (
		<section className='space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>공고별 지원자 대시보드</h2>
				<p className='mt-1 text-sm text-black'>공고 ID: {jobId} · HR 가중치 반영 총점 기준 정렬/필터링</p>
			</div>

			<FilterBar
				status={status}
				scoreBand={scoreBand}
				keyword={keyword}
				onStatusChange={setStatus}
				onScoreBandChange={setScoreBand}
				onKeywordChange={setKeyword}
			/>
			<div className='flex justify-end'>
				<SortDropdown value={sortBy} onChange={setSortBy} />
			</div>

			<CandidateTable
				candidates={visibleCandidates.map(
					candidate =>
						({
							id: candidate.id,
							name: candidate.name,
							score: candidate.totalScore,
							fitScore: candidate.fitScore,
							careerScore: candidate.careerScore,
							stackScore: candidate.stackScore,
							achievementScore: candidate.achievementScore,
							docScore: candidate.docScore,
							status: candidate.status,
							appliedAt: candidate.appliedAt,
							summary: candidate.summary,
						}) satisfies CandidateRow
				)}
				onNameClick={candidate => {
					if (!jobId) return
					navigate(`/com-mypage/jobs/${jobId}/${candidate.id}`)
				}}
				getDetailPath={candidate => {
					if (!jobId) return `/candidates/${candidate.id}`
					return `/com-mypage/jobs/${jobId}/${candidate.id}`
				}}
			/>
		</section>
	)
}

export default MyJobApplicantsDashboardPage
