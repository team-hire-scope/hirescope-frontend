import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Sparkles, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { JobFilterBar } from '@/components/job/JobFilterBar'
import { PublicJobCard } from '@/components/job/PublicJobCard'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { useJobList } from '@/hooks/user/useJobList'
import { useMyResume } from '@/hooks/user/useMyResume'
import { useApply } from '@/hooks/user/useApply'

const PAGE_SIZE = 9

export default function JobListPage() {
	const navigate = useNavigate()
	const [page, setPage] = useState(0)
	const [searchQuery, setSearchQuery] = useState('')

	const { data, isLoading } = useJobList(page, PAGE_SIZE)
	const { resume } = useMyResume()
	const { mutate: apply, isDuplicateError, clearDuplicateError } = useApply()

	const jobs = data?.content ?? []
	const totalPages = data?.totalPages ?? 0
	const totalElements = data?.totalElements ?? 0

	const filteredJobs = searchQuery
		? jobs.filter(
				job =>
					job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
					job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
			)
		: jobs

	const handleApply = (jobPostingId: number) => {
		if (!resume) {
			navigate('/resumes/new')
			return
		}
		apply({ resumeId: resume.id, jobPostingId })
	}

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
		setPage(0)
	}

	return (
		<div className='w-full max-w-7xl mx-auto pb-24'>
			{/* 히어로 섹션 */}
			<div className='relative overflow-hidden rounded-[40px] bg-hs-deep-green mx-6 mt-8 px-10 py-14 mb-12'>
				<div className='absolute top-0 right-0 w-96 h-96 bg-hs-yellow/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none' />
				<div className='absolute bottom-0 left-20 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 pointer-events-none' />

				<div className='relative z-10'>
					<div className='inline-flex items-center gap-2 bg-hs-yellow/15 text-hs-yellow text-sm font-bold px-4 py-2 rounded-full mb-5'>
						<Sparkles size={14} />
						AI 기반 채용 매칭
					</div>
					<h1 className='text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3'>
						나에게 딱 맞는 <span className='text-hs-yellow'>커리어</span>를 찾아보세요
					</h1>
					<p className='text-white/50 text-base font-medium'>AI 분석으로 합격 확률이 높은 공고를 추천해 드립니다.</p>
				</div>
			</div>

			<div className='px-6'>
				{/* 검색 필터 */}
				<JobFilterBar
					categories={[]}
					selectedCategory='all'
					onSelectCategory={() => {}}
					searchQuery={searchQuery}
					onSearchChange={handleSearchChange}
				/>

				{/* 결과 카운트 */}
				<div className='flex items-center justify-between mb-8'>
					<p className='text-slate-500 font-medium'>
						{isLoading ? (
							<span className='text-slate-300'>불러오는 중...</span>
						) : (
							<>
								<span className='text-hs-deep-green font-black text-lg'>{totalElements}</span>개의 공고
							</>
						)}
					</p>
					{searchQuery && (
						<button
							onClick={() => handleSearchChange('')}
							className='text-sm text-slate-400 font-bold hover:text-hs-deep-green transition-colors underline underline-offset-4'
						>
							검색 초기화
						</button>
					)}
				</div>

				{/* 공고 그리드 */}
				{isLoading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: PAGE_SIZE }).map((_, i) => (
							<div key={i} className='bg-white rounded-3xl p-7 border border-slate-100 h-64 animate-pulse'>
								<div className='flex gap-3 mb-5'>
									<div className='w-11 h-11 rounded-2xl bg-slate-100 shrink-0' />
									<div className='h-4 w-28 rounded bg-slate-100 self-center' />
								</div>
								<div className='h-5 w-3/4 rounded bg-slate-100 mb-3' />
								<div className='h-4 w-1/2 rounded bg-slate-100' />
							</div>
						))}
					</div>
				) : filteredJobs.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredJobs.map(job => (
							<PublicJobCard key={job.id} job={job} onApply={handleApply} />
						))}
					</div>
				) : (
					<div className='text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-hs-yellow/10'>
						<div className='w-16 h-16 bg-hs-cream rounded-3xl flex items-center justify-center mx-auto mb-4'>
							<Building2 size={28} className='text-hs-deep-green/30' />
						</div>
						<p className='text-xl font-black text-slate-300'>검색 결과가 없습니다</p>
						<p className='text-slate-400 font-medium mt-1 text-sm'>다른 키워드로 시도해보세요</p>
						<button
							onClick={() => handleSearchChange('')}
							className='mt-6 px-6 py-3 bg-hs-deep-green text-white font-bold rounded-full text-sm hover:bg-hs-deep-green/90 transition-colors'
						>
							전체 공고 보기
						</button>
					</div>
				)}

				{/* 페이지네이션 */}
				{!isLoading && totalPages > 1 && (
					<div className='flex items-center justify-center gap-3 mt-14'>
						<button
							onClick={() => setPage(p => p - 1)}
							disabled={page === 0}
							className='w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-hs-yellow/40 hover:text-hs-deep-green transition-all disabled:opacity-30 disabled:pointer-events-none'
						>
							<ChevronLeft size={18} />
						</button>

						<div className='flex gap-1.5'>
							{Array.from({ length: totalPages }).map((_, i) => (
								<button
									key={i}
									onClick={() => setPage(i)}
									className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
										i === page
											? 'bg-hs-deep-green text-white shadow-lg shadow-hs-deep-green/25'
											: 'text-slate-400 hover:bg-hs-cream hover:text-hs-deep-green'
									}`}
								>
									{i + 1}
								</button>
							))}
						</div>

						<button
							onClick={() => setPage(p => p + 1)}
							disabled={page === totalPages - 1}
							className='w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-hs-yellow/40 hover:text-hs-deep-green transition-all disabled:opacity-30 disabled:pointer-events-none'
						>
							<ChevronRight size={18} />
						</button>
					</div>
				)}
			</div>

			<ConfirmDialog
				open={isDuplicateError}
				title='이미 지원한 공고예요'
				description='같은 공고에는 중복으로 지원할 수 없습니다.'
				confirmLabel='확인'
				confirmVariant='primary'
				onConfirm={clearDuplicateError}
			/>
		</div>
	)
}
