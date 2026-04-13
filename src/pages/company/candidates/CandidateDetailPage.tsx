import { useParams } from 'react-router'
import { Badge } from '../../../components/company/common/Badge'

const CandidateDetailPage = () => {
	const { candidateId } = useParams()

	return (
		<section className='w-full space-y-6'>
			<div className='flex items-center gap-2'>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>지원자 상세 리포트</h2>
				<Badge variant='info'>ID: {candidateId}</Badge>
			</div>
			<div className='grid w-full grid-cols-2 gap-4'>
				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-2 text-base font-semibold text-black'>5대 기준 점수</h3>
					<p className='text-sm text-black'>ScoreRadarChart 영역</p>
				</div>
				<div className='rounded-xl border border-hs-cream bg-white p-5 shadow-sm'>
					<h3 className='mb-2 text-base font-semibold text-black'>요약 리포트</h3>
					<p className='text-sm text-black'>SummaryCard / ResumeViewer 영역</p>
				</div>
			</div>
		</section>
	)
}

export default CandidateDetailPage
