import { Badge } from '../../../components/company/common/Badge'
import { Button } from '../../../components/company/common/Button'

const jobs = [
	{ id: '1', title: '프론트엔드 개발자', applicants: 42, status: '진행중' },
	{ id: '2', title: '백엔드 개발자', applicants: 28, status: '마감임박' },
]

const JobListPage = () => {
	return (
		<section className='w-full space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-semibold text-slate-900'>채용 공고 목록</h2>
					<p className='mt-1 text-sm text-slate-600'>현재 진행 중인 공고와 지원 현황을 확인하세요.</p>
				</div>
				<Button>공고 추가</Button>
			</div>
			<div className='grid w-full grid-cols-2 gap-4'>
				{jobs.map(job => (
					<article key={job.id} className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
						<div className='mb-2 flex items-center justify-between'>
							<h3 className='text-base font-semibold text-slate-900'>{job.title}</h3>
							<Badge variant={job.status === '진행중' ? 'success' : 'warning'}>{job.status}</Badge>
						</div>
						<p className='text-sm text-slate-600'>지원자 {job.applicants}명</p>
					</article>
				))}
			</div>
		</section>
	)
}

export default JobListPage
