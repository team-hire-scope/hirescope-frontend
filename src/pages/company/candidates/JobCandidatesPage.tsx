import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { CandidateTable, type CandidateRow } from '../../../components/company/candidate/CandidateTable'
import { FilterBar } from '../../../components/company/candidate/FilterBar'
import { SortDropdown } from '../../../components/company/candidate/SortDropdown'

const candidates: CandidateRow[] = [
	{ id: 'c1', name: '김지원', score: 92, status: '서류 통과', appliedAt: '2026-04-11' },
	{ id: 'c2', name: '이서준', score: 81, status: '검토중', appliedAt: '2026-04-13' },
	{ id: 'c3', name: '박민아', score: 88, status: '면접 예정', appliedAt: '2026-04-10' },
	{ id: 'c4', name: '정하준', score: 74, status: '탈락', appliedAt: '2026-04-09' },
	{ id: 'c5', name: '최서윤', score: 95, status: '서류 통과', appliedAt: '2026-04-12' },
]

const JobCandidatesPage = () => {
	const { jobId } = useParams()
	const [status, setStatus] = useState<'all' | '검토중' | '서류 통과' | '면접 예정' | '탈락'>('all')
	const [scoreBand, setScoreBand] = useState<'all' | '90+' | '80-89' | 'under-80'>('all')
	const [keyword, setKeyword] = useState('')
	const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'latest'>('score-desc')

	const visibleCandidates = useMemo(() => {
		const filtered = candidates.filter(candidate => {
			const isStatusMatch = status === 'all' || candidate.status === status
			const isKeywordMatch = candidate.name.includes(keyword.trim())
			const isScoreBandMatch =
				scoreBand === 'all' ||
				(scoreBand === '90+' && candidate.score >= 90) ||
				(scoreBand === '80-89' && candidate.score >= 80 && candidate.score < 90) ||
				(scoreBand === 'under-80' && candidate.score < 80)

			return isStatusMatch && isKeywordMatch && isScoreBandMatch
		})

		return [...filtered].sort((a, b) => {
			if (sortBy === 'score-desc') return b.score - a.score
			if (sortBy === 'score-asc') return a.score - b.score
			return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
		})
	}, [keyword, scoreBand, sortBy, status])

	return (
		<section className='w-full space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>지원자 관리 대시보드</h2>
				<p className='mt-1 text-sm text-black'>
					공고 ID: {jobId} · 총 지원자 {visibleCandidates.length}명
				</p>
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
			<CandidateTable candidates={visibleCandidates} />
		</section>
	)
}

export default JobCandidatesPage
