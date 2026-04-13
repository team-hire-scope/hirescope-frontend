import { useParams } from 'react-router'
import { Badge } from '../../../components/company/common/Badge'
import { Select } from '../../../components/company/common/Select'

const candidates = [
	{ id: 'c1', name: '김지원', score: 92, status: '서류 통과' },
	{ id: 'c2', name: '이서준', score: 81, status: '검토중' },
]

const JobCandidatesPage = () => {
	const { jobId } = useParams()

	return (
		<section className='w-full space-y-6'>
			<div>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>지원자 관리 대시보드</h2>
				<p className='mt-1 text-sm text-black'>공고 ID: {jobId}</p>
			</div>
			<div className='flex w-full max-w-xs gap-3'>
				<Select defaultValue='score-desc' aria-label='정렬'>
					<option value='score-desc'>점수 높은 순</option>
					<option value='latest'>최신순</option>
				</Select>
			</div>
			<div className='w-full overflow-hidden rounded-xl border border-hs-cream bg-white shadow-sm'>
				<table className='min-w-full text-left text-sm'>
					<thead className='bg-hs-cream text-hs-deep-green'>
						<tr>
							<th className='px-4 py-3'>이름</th>
							<th className='px-4 py-3'>점수</th>
							<th className='px-4 py-3'>상태</th>
						</tr>
					</thead>
					<tbody>
						{candidates.map(candidate => (
							<tr key={candidate.id} className='border-t border-hs-cream'>
								<td className='px-4 py-3 font-medium text-black'>{candidate.name}</td>
								<td className='px-4 py-3 text-black'>{candidate.score}</td>
								<td className='px-4 py-3'>
									<Badge variant={candidate.status === '서류 통과' ? 'success' : 'default'}>
										{candidate.status}
									</Badge>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default JobCandidatesPage
