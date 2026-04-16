import { Link } from 'react-router'
import { Badge } from '../../common/Badge'
import { Button } from '../../common/Button'

export interface CandidateRow {
	id: string
	name: string
	score: number
	fitScore: number
	careerScore: number
	stackScore: number
	achievementScore: number
	docScore: number
	status: '검토중' | '서류 통과' | '면접 예정' | '탈락'
	appliedAt: string
	summary?: string
}

interface CandidateTableProps {
	candidates: CandidateRow[]
	onNameClick?: (candidate: CandidateRow) => void
	getDetailPath?: (candidate: CandidateRow) => string
}

const statusVariantMap: Record<CandidateRow['status'], 'default' | 'success' | 'warning' | 'danger'> = {
	검토중: 'default',
	'서류 통과': 'success',
	'면접 예정': 'warning',
	탈락: 'danger',
}

export const CandidateTable = ({ candidates, onNameClick, getDetailPath }: CandidateTableProps) => {
	// 요약 리포트 컬럼은 데이터에 summary가 있을 때만 노출
	const hasSummary = candidates.some(candidate => Boolean(candidate.summary))

	const defaultGetDetailPath = (candidate: CandidateRow) => `/candidates/${candidate.id}`
	const detailPath = getDetailPath ?? defaultGetDetailPath

	return (
		<div className='w-full overflow-x-auto rounded-xl border border-hs-cream bg-white shadow-sm'>
			<table className='min-w-full text-left text-sm'>
				<thead className='bg-hs-cream text-hs-deep-green'>
					<tr>
						<th className='px-4 py-3'>이름</th>
						<th className='px-4 py-3'>점수</th>
						<th className='px-4 py-3'>지원일</th>
						{hasSummary && <th className='px-4 py-3'>요약 리포트</th>}
						<th className='px-4 py-3'>상태</th>
						<th className='px-4 py-3'>리포트</th>
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
								<div className='text-sm font-semibold text-black'>총점 {candidate.score}</div>
								<div className='mt-1 flex flex-nowrap items-center gap-x-3 text-xs text-black/50 whitespace-nowrap'>
									<span>직무적합 {candidate.fitScore}</span>
									<span>경력일관 {candidate.careerScore}</span>
									<span>기술매칭 {candidate.stackScore}</span>
									<span>정량성과 {candidate.achievementScore}</span>
									<span>문서품질 {candidate.docScore}</span>
								</div>
							</td>
							<td className='px-4 py-3 text-black'>{candidate.appliedAt}</td>
							{hasSummary && <td className='px-4 py-3 text-black'>{candidate.summary}</td>}
							<td className='px-4 py-3'>
								<Badge variant={statusVariantMap[candidate.status]}>{candidate.status}</Badge>
							</td>
							<td className='px-4 py-3'>
								<Link
									to={detailPath(candidate)}
									className='text-sm font-medium text-hs-deep-green hover:underline'
								>
									상세 보기
								</Link>
							</td>
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
