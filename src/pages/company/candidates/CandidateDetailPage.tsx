import { useParams } from 'react-router'
import { Badge } from '../../../components/company/common/Badge'

const CandidateDetailPage = () => {
	const { candidateId } = useParams()

	return (
		<section className='space-y-6'>
			<div className='flex items-center gap-2'>
				<h2 className='text-2xl font-semibold text-slate-900'>지원자 상세 리포트</h2>
				<Badge variant='info'>ID: {candidateId}</Badge>
			</div>
			<div className='grid gap-4 lg:grid-cols-2'>
				<div className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
					<h3 className='mb-2 text-base font-semibold text-slate-900'>5대 기준 점수</h3>
					<p className='text-sm text-slate-600'>ScoreRadarChart 영역 (추후 연결)</p>
				</div>
				<div className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
					<h3 className='mb-2 text-base font-semibold text-slate-900'>요약 리포트</h3>
					<p className='text-sm text-slate-600'>SummaryCard / ResumeViewer 영역 (추후 연결)</p>
				</div>
			</div>
		</section>
	)
}

export default CandidateDetailPage
