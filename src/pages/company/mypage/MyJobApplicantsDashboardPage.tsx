import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { SortDropdown } from '../../../components/company/candidate/SortDropdown'
import { CandidateTable, type CandidateRow } from '../../../components/company/candidate/CandidateTable'
import { Button } from '../../../components/common/Button'
import { useJobApplicants } from '../../../hooks/company/useJobApplicants'
import type { JobApplicantRow } from '../../../types/jobApplicants'
import { Input } from '../../../components/common/Input'
import { Select } from '../../../components/common/Select'

const MyJobApplicantsDashboardPage = () => {
	const { jobId } = useParams()
	const navigate = useNavigate()
	const [status, setStatus] = useState<'all' | JobApplicantRow['status']>('all')
	const [scoreBand, setScoreBand] = useState<'all' | '90+' | '80-89' | 'under-80'>('all')
	const [keyword, setKeyword] = useState('')
	const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'latest'>('score-desc')
	const { data: applicantPage, isFetching } = useJobApplicants(jobId ?? '', {
		page: 0,
		size: 10,
		status: status === 'all' ? undefined : status,
	})

	const visibleCandidates = useMemo(() => {
		const filtered = (applicantPage?.content ?? []).filter(candidate => {
			const isStatusMatch = status === 'all' || candidate.status === status
			const isKeywordMatch = candidate.applicantName.includes(keyword.trim())
			const isScoreBandMatch =
				scoreBand === 'all' ||
				(scoreBand === '90+' && candidate.totalScore >= 90) ||
				(scoreBand === '80-89' && candidate.totalScore >= 80 && candidate.totalScore < 90) ||
				(scoreBand === 'under-80' && candidate.totalScore < 80)

			return isStatusMatch && isKeywordMatch && isScoreBandMatch
		})

		return [...filtered]
			.sort((a, b) => {
				if (sortBy === 'score-desc') return b.totalScore - a.totalScore
				if (sortBy === 'score-asc') return a.totalScore - b.totalScore
				return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
			})
			.map(
				candidate =>
					({
						id: String(candidate.applicationId),
						name: candidate.applicantName,
						score: Math.round(candidate.totalScore),
						fitScore: Math.round(candidate.scoreJobFit),
						careerScore: Math.round(candidate.scoreCareerConsistency),
						stackScore: Math.round(candidate.scoreSkillMatch),
						achievementScore: Math.round(candidate.scoreQuantitativeAchievement),
						docScore: Math.round(candidate.scoreDocumentQuality),
						status: candidate.status,
						appliedAt: new Date(candidate.appliedAt).toISOString().slice(0, 10),
					}) satisfies CandidateRow
			)
	}, [applicantPage?.content, keyword, scoreBand, sortBy, status])

	return (
		<section className='space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>공고별 지원자 대시보드</h2>
				<p className='mt-1 text-sm text-black'>
					공고 ID: {jobId} · 총 {applicantPage?.totalElements ?? 0}명 · 페이지 {(applicantPage?.number ?? 0) + 1}/
					{applicantPage?.totalPages ?? 0}
				</p>
				{isFetching && <p className='mt-1 text-xs text-black/60'>불러오는 중...</p>}
			</div>

			<div className='grid w-full grid-cols-3 gap-3 rounded-xl border border-hs-cream bg-white p-4'>
				<div>
					<label htmlFor='status-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
						상태 필터
					</label>
					<Select
						id='status-filter'
						value={status}
						options={[
							{ value: 'all', label: '전체' },
							{ value: 'PENDING', label: 'PENDING' },
							{ value: 'PROCESSING', label: 'PROCESSING' },
							{ value: 'COMPLETED', label: 'COMPLETED' },
							{ value: 'FAILED', label: 'FAILED' },
						]}
						onChange={val => setStatus(val as typeof status)}
					/>
				</div>
				<div>
					<label htmlFor='score-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
						점수 구간
					</label>
					<Select
						id='score-filter'
						value={scoreBand}
						options={[
							{ value: 'all', label: '전체 점수' },
							{ value: '90+', label: '90점 이상' },
							{ value: '80-89', label: '80-89점' },
							{ value: 'under-80', label: '80점 미만' },
						]}
						onChange={val => setScoreBand(val as typeof scoreBand)}
					/>
				</div>
				<div>
					<label htmlFor='keyword-filter' className='mb-1 block text-sm font-medium text-hs-deep-green'>
						이름 검색
					</label>
					<Input
						id='keyword-filter'
						value={keyword}
						onChange={event => setKeyword(event.target.value)}
						placeholder='지원자 이름 입력'
					/>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<Link to={jobId ? `/com-mypage/jobs/${jobId}` : '/com-mypage/jobs'}>
					<Button variant='secondary'>공고글 보러가기</Button>
				</Link>
				<SortDropdown value={sortBy} onChange={setSortBy} />
			</div>

			<CandidateTable
				candidates={visibleCandidates}
				onNameClick={candidate => {
					if (!jobId) return
					navigate(`/com-mypage/jobs/${jobId}/${candidate.id}`)
				}}
			/>
		</section>
	)
}

export default MyJobApplicantsDashboardPage
