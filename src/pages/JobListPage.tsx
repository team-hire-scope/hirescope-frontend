import { Button } from '../components/common/Button'
import { JobCard } from '../components/company/job/JobCard'

const jobs = [
	{
		id: '1',
		title: '프론트엔드 개발자',
		department: '프로덕트팀',
		status: '진행중' as const,
		applicants: 42,
		passed: 13,
		progress: 62,
	},
	{
		id: '2',
		title: '백엔드 개발자',
		department: '플랫폼팀',
		status: '마감임박' as const,
		applicants: 28,
		passed: 8,
		progress: 84,
	},
	{
		id: '3',
		title: '프로덕트 디자이너',
		department: '디자인팀',
		status: '검토중' as const,
		applicants: 19,
		passed: 4,
		progress: 41,
	},
]

const JobListPage = () => {
	return (
		<section className='w-full space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-semibold text-hs-deep-green'>채용 공고 목록</h2>
					<p className='mt-1 text-sm text-black'>상태, 지원자 수, 진행률을 한 번에 확인하세요.</p>
				</div>
				<Button>공고 추가</Button>
			</div>
			<div className='grid w-full grid-cols-3 gap-4'>
				{jobs.map(job => (
					<JobCard key={job.id} {...job} />
				))}
			</div>
		</section>
	)
}

export default JobListPage
