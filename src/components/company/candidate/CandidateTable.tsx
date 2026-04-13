import { Link } from 'react-router'
import { Badge } from '../common/Badge'

export interface CandidateRow {
	id: string
	name: string
	score: number
	status: '검토중' | '서류 통과' | '면접 예정' | '탈락'
	appliedAt: string
}

interface CandidateTableProps {
	candidates: CandidateRow[]
}

const statusVariantMap: Record<CandidateRow['status'], 'default' | 'success' | 'warning' | 'danger'> = {
	검토중: 'default',
	'서류 통과': 'success',
	'면접 예정': 'warning',
	탈락: 'danger',
}

export const CandidateTable = ({ candidates }: CandidateTableProps) => {
	return (
		<div className='w-full overflow-hidden rounded-xl border border-hs-cream bg-white shadow-sm'>
			<table className='min-w-full text-left text-sm'>
				<thead className='bg-hs-cream text-hs-deep-green'>
					<tr>
						<th className='px-4 py-3'>이름</th>
						<th className='px-4 py-3'>점수</th>
						<th className='px-4 py-3'>지원일</th>
						<th className='px-4 py-3'>상태</th>
						<th className='px-4 py-3'>리포트</th>
					</tr>
				</thead>
				<tbody>
					{candidates.map(candidate => (
						<tr key={candidate.id} className='border-t border-hs-cream'>
							<td className='px-4 py-3 font-medium text-black'>{candidate.name}</td>
							<td className='px-4 py-3 text-black'>{candidate.score}</td>
							<td className='px-4 py-3 text-black'>{candidate.appliedAt}</td>
							<td className='px-4 py-3'>
								<Badge variant={statusVariantMap[candidate.status]}>{candidate.status}</Badge>
							</td>
							<td className='px-4 py-3'>
								<Link
									to={`/candidates/${candidate.id}`}
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
