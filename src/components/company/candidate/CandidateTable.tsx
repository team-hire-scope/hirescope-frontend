import { Button } from '../../common/Button'
import { Badge } from '../../common/Badge'

export interface CandidateRow {
	id: string
	name: string
	score: number
	fitScore: number
	careerScore: number
	stackScore: number
	achievementScore: number
	docScore: number
	status: string
	appliedAt: string
	summary?: string
}

interface CandidateTableProps {
	candidates: CandidateRow[]
	onNameClick?: (candidate: CandidateRow) => void
}

const statusVariant = (status: string): 'default' | 'success' | 'warning' | 'danger' => {
	if (status === 'COMPLETED' || status === '서류 통과') return 'success'
	if (status === 'PROCESSING' || status === '면접 예정') return 'warning'
	if (status === 'FAILED' || status === '탈락') return 'danger'
	return 'default'
}

export const CandidateTable = ({ candidates, onNameClick }: CandidateTableProps) => {
	// 요약 리포트 컬럼은 데이터에 summary가 있을 때만 노출
	const hasSummary = candidates.some(candidate => Boolean(candidate.summary))

	return (
		<div className='w-full overflow-visible rounded-xl border border-hs-cream bg-white shadow-sm'>
			<table className='min-w-full text-left text-sm'>
				<thead className='bg-hs-cream text-hs-deep-green'>
					<tr>
						<th className='px-4 py-3'>이름</th>
						<th className='px-4 py-3'>평균 점수</th>
						<th className='px-4 py-3'>상태</th>
						{hasSummary && <th className='px-4 py-3'>요약 리포트</th>}
						<th className='px-4 py-3'>지원일</th>
					</tr>
				</thead>
				<tbody>
					{candidates.map(candidate => (
						<tr key={candidate.id} className='border-t border-hs-cream'>
							<td className='px-4 py-3 font-medium text-black'>
								{onNameClick ? (
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='py-1 font-bold'
										onClick={() => onNameClick(candidate)}
									>
										{candidate.name}
									</Button>
								) : (
									candidate.name
								)}
							</td>
							<td className='px-4 py-3 text-black'>
								<div className='text-sm font-semibold text-black'>평균 점수 {candidate.score}</div>
								<div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/50'>
									<span>직무적합 {candidate.fitScore}</span>
									<span>경력일관 {candidate.careerScore}</span>
									<span>기술매칭 {candidate.stackScore}</span>
									<span>정량성과 {candidate.achievementScore}</span>
									<span>문서품질 {candidate.docScore}</span>
								</div>
							</td>
							<td className='px-4 py-3'>
								<Badge variant={statusVariant(candidate.status)}>{candidate.status}</Badge>
							</td>
							{hasSummary && <td className='px-4 py-3 text-black'>{candidate.summary}</td>}
							<td className='px-4 py-3 text-black'>{candidate.appliedAt}</td>
						</tr>
					))}
				</tbody>
			</table>
			{candidates.length === 0 && (
				<div className='px-4 py-8 text-center text-sm text-black'>조건에 맞는 지원자가 없습니다.</div>
			)}
		</div>
	)
}
