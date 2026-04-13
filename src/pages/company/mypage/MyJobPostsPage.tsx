import { Link } from 'react-router'
import { Button } from '../../../components/company/common/Button'
import { Badge } from '../../../components/company/common/Badge'

const myJobs = [
	{ id: '1', title: '프론트엔드 개발자', status: '진행중', applicants: 42 },
	{ id: '2', title: '백엔드 개발자', status: '검토중', applicants: 28 },
]

const MyJobPostsPage = () => {
	return (
		<section className='space-y-4'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-semibold text-hs-deep-green'>내 공고 관리</h2>
					<p className='mt-1 text-sm text-black'>
						내가 올린 공고를 확인하고 새 공고를 등록할 수 있습니다. 새 공고 등록 시 5대 평가 기준 가중치를 직접 설정할
						수 있습니다.
					</p>
				</div>
				<Link to='/jobs/create'>
					<Button>새 공고 올리기</Button>
				</Link>
			</div>

			<div className='space-y-3'>
				{myJobs.map(job => (
					<Link
						key={job.id}
						to={`/mypage/jobs/${job.id}`}
						className='block rounded-xl border border-hs-cream bg-white p-4 shadow-sm transition hover:border-hs-yellow'
					>
						<div className='mb-1 flex items-center justify-between'>
							<h3 className='text-base font-semibold text-black'>{job.title}</h3>
							<Badge variant={job.status === '진행중' ? 'success' : 'default'}>{job.status}</Badge>
						</div>
						<p className='text-sm text-black'>지원자 수 {job.applicants}명</p>
					</Link>
				))}
			</div>
		</section>
	)
}

export default MyJobPostsPage
