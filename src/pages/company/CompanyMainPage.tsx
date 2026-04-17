import { useNavigate } from 'react-router'
import { Briefcase, Users, ChevronRight, PlusCircle, Clock } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import { useJobPosts } from '@/hooks/company/useJobPosts'
import type { JobPost } from '@/types/job'

const formatDate = (iso: string) => {
	const d = new Date(iso)
	return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function CompanyMainPage() {
	const navigate = useNavigate()
	const { data, isLoading } = useJobPosts({ page: 0, size: 5 })
	const jobs = data?.content ?? []

	return (
		<div className='container mx-auto max-w-4xl p-6 space-y-8'>
			<header className='space-y-2'>
				<h1 className='text-3xl font-bold text-hs-deep-green'>반가워요! 👋</h1>
				<p className='text-slate-600'>HireScope와 함께 채용 공고와 지원자 현황을 한눈에 관리해보세요.</p>
			</header>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				<ResumeSectionCard title='내 공고 관리' className='flex h-full flex-col'>
					<p className='mb-4 text-sm text-slate-500'>등록한 공고를 확인하고 새 공고를 빠르게 작성할 수 있습니다.</p>
					<div className='mt-auto flex gap-2'>
						<Button className='w-full' onClick={() => navigate('/com-mypage/jobs')}>
							목록 보기
						</Button>
						<Button variant='secondary' className='w-full' onClick={() => navigate('/jobs/create')}>
							새 공고 작성
						</Button>
					</div>
				</ResumeSectionCard>

				<ResumeSectionCard title='회사 정보 관리' className='flex h-full flex-col'>
					<p className='mb-4 text-sm text-slate-500'>회사 프로필 정보를 직접 수정할 수 있습니다.</p>
					<div className='mt-auto'>
						<Button
							className='w-full bg-hs-green text-white hover:bg-hs-deep-green'
							onClick={() => navigate('/com-mypage/company')}
						>
							정보 수정
						</Button>
					</div>
				</ResumeSectionCard>
			</div>

			<ResumeSectionCard title='채용 공고 현황'>
				{isLoading ? (
					<div className='space-y-3'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className='flex items-center gap-4 p-4 rounded-xl bg-slate-50 animate-pulse'>
								<div className='w-10 h-10 rounded-xl bg-slate-200 shrink-0' />
								<div className='flex-1 space-y-2'>
									<div className='h-4 w-1/2 rounded bg-slate-200' />
									<div className='h-3 w-1/3 rounded bg-slate-200' />
								</div>
								<div className='w-16 h-6 rounded-full bg-slate-200' />
							</div>
						))}
					</div>
				) : jobs.length > 0 ? (
					<div className='space-y-2'>
						{jobs.map((job: JobPost) => (
							<button
								key={job.id}
								onClick={() => navigate(`/com-mypage/jobs/${job.id}`)}
								className='w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-hs-yellow/40 hover:bg-hs-cream/30 transition-all text-left group'
							>
								<div className='w-10 h-10 bg-hs-deep-green rounded-xl flex items-center justify-center shrink-0'>
									<Briefcase size={16} className='text-hs-yellow' />
								</div>
								<div className='flex-1 min-w-0'>
									<p className='font-bold text-hs-deep-green text-sm truncate'>{job.jobTitle}</p>
									<p className='text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5'>
										<Clock size={11} />
										{formatDate(job.createdAt)} 등록
									</p>
								</div>
								<div className='flex items-center gap-2 shrink-0'>
									<span className='inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500'>
										<Users size={11} />
										지원자 보기
									</span>
									<ChevronRight
										size={15}
										className='text-slate-300 group-hover:text-hs-deep-green group-hover:translate-x-0.5 transition-all'
									/>
								</div>
							</button>
						))}
						{(data?.totalElements ?? 0) > 5 && (
							<button
								onClick={() => navigate('/com-mypage/jobs')}
								className='w-full text-center text-sm font-bold text-slate-400 hover:text-hs-deep-green py-3 transition-colors'
							>
								전체 공고 보기 ({data?.totalElements}개)
							</button>
						)}
					</div>
				) : (
					<div className='rounded-xl border-2 border-dashed border-hs-yellow/20 py-10 text-center space-y-3'>
						<p className='text-slate-400 text-sm'>등록된 채용 공고가 없습니다.</p>
						<button
							onClick={() => navigate('/jobs/create')}
							className='inline-flex items-center gap-1.5 text-sm font-bold text-hs-deep-green hover:text-hs-deep-green/70 transition-colors'
						>
							<PlusCircle size={15} />첫 공고 등록하기
						</button>
					</div>
				)}
			</ResumeSectionCard>
		</div>
	)
}
