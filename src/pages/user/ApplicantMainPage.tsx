import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Briefcase, Sparkles, ChevronRight, FileText, TrendingUp, Bell, PenLine, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { PublicJobCard } from '@/components/job/PublicJobCard'
import { cn } from '@/utils/cn'
import { useMyResume, type ResumeDisplayData } from '@/hooks/user/useMyResume'
import { useJobList } from '@/hooks/user/useJobList'
import { useApply } from '@/hooks/user/useApply'

const STATS = [
	{ label: '지원한 공고', value: '5', unit: '건', icon: <Briefcase size={18} /> },
	{ label: 'AI 분석 완료', value: '3', unit: '회', icon: <Sparkles size={18} /> },
]

export default function ApplicantMainPage() {
	const navigate = useNavigate()
	const { isLoading, hasResume, resume } = useMyResume()
	const { data: jobData, isLoading: isJobsLoading } = useJobList(0, 3)
	const { mutate: apply } = useApply()
	const recommendedJobs = jobData?.content ?? []

	const handleApply = (jobPostingId: number) => {
		if (!resume) {
			navigate('/resumes/new')
			return
		}
		apply({ resumeId: resume.id, jobPostingId })
	}

	return (
		<div className='min-h-screen bg-slate-50/50'>
			{/* 히어로 섹션 */}
			<div className='bg-linear-to-br from-hs-deep-green via-hs-deep-green to-[#1e4a2a] relative overflow-hidden'>
				<div className='absolute inset-0 pointer-events-none'>
					<div className='absolute top-0 right-0 w-96 h-96 rounded-full bg-hs-yellow/5 translate-x-32 -translate-y-32' />
					<div className='absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-hs-yellow/5 translate-y-24' />
				</div>

				<div className='container mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-16 relative'>
					<div className='flex flex-col lg:flex-row lg:items-end justify-between'>
						<div className='space-y-3'>
							<div className='inline-flex items-center gap-2 bg-hs-yellow/15 text-hs-yellow text-sm font-bold px-3 py-1.5 rounded-full border border-hs-yellow/20'>
								<Bell size={13} />
								오늘 새로운 채용 공고 12건이 올라왔어요
							</div>
							<h1 className='text-3xl lg:text-4xl font-black text-white tracking-tight'>
								반가워요! 👋
								<br />
								<span className='text-hs-yellow'>성공적인 커리어</span>를 설계해보세요.
							</h1>
							<p className='text-slate-400 font-medium'>
								하이어스코프 AI가 당신의 이력서를 분석하고 합격 가능성을 높여드릴게요.
							</p>
						</div>

						<div className='flex gap-4'>
							{STATS.map(stat => (
								<div
									key={stat.label}
									className='bg-white/8 border border-white/10 rounded-2xl px-5 py-4 text-center backdrop-blur-sm min-w-[90px]'
								>
									<div className='text-hs-yellow/70 flex justify-center mb-1'>{stat.icon}</div>
									<div className='text-2xl font-black text-white'>
										{stat.value}
										<span className='text-sm font-bold text-slate-400 ml-0.5'>{stat.unit}</span>
									</div>
									<div className='text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap'>
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto max-w-7xl px-6 lg:px-12 py-10 space-y-12'>
				{/* 퀵 액션 + 이력서 카드 */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<JobExploreCard onExplore={() => navigate('/jobs')} />
					<ResumeCard
						isLoading={isLoading}
						hasResume={hasResume}
						resume={resume}
						onEdit={() => resume && navigate(`/resumes/${resume.id}/edit`)}
						onCreate={() => navigate('/resumes/new')}
					/>
				</div>

				{/* 실시간 인기 채용 공고 */}
				<section className='space-y-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h2 className='text-xl font-black text-hs-deep-green flex items-center gap-2.5'>
								<TrendingUp size={20} className='text-hs-yellow' />
								최신 채용 공고
							</h2>
							<p className='text-sm text-slate-400 mt-0.5 font-medium'>지금 막 올라온 채용 공고예요</p>
						</div>
						<button
							onClick={() => navigate('/jobs')}
							className='flex items-center gap-1 text-slate-400 text-sm font-bold hover:text-hs-deep-green transition-colors group'
						>
							전체 보기
							<ChevronRight size={16} className='group-hover:translate-x-0.5 transition-transform' />
						</button>
					</div>

					{isJobsLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className='bg-white rounded-3xl p-7 border border-slate-100 h-56 animate-pulse'>
									<div className='flex gap-3 mb-5'>
										<div className='w-11 h-11 rounded-2xl bg-slate-100 shrink-0' />
										<div className='h-4 w-24 rounded bg-slate-100 self-center' />
									</div>
									<div className='h-5 w-3/4 rounded bg-slate-100 mb-3' />
									<div className='h-4 w-1/2 rounded bg-slate-100' />
								</div>
							))}
						</div>
					) : recommendedJobs.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
							{recommendedJobs.map(job => (
								<PublicJobCard key={job.id} job={job} onApply={handleApply} />
							))}
						</div>
					) : (
						<div className='text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm'>
							<p className='text-slate-400 font-medium text-sm'>등록된 채용 공고가 없어요</p>
						</div>
					)}
				</section>

				{/* 최근 분석 리포트 */}
				<section className='space-y-6'>
					<div>
						<h2 className='text-xl font-black text-hs-deep-green flex items-center gap-2.5'>
							<Sparkles size={20} className='text-hs-yellow' />
							최근 분석 리포트
						</h2>
						<p className='text-sm text-slate-400 mt-0.5 font-medium'>AI가 분석한 나의 이력서 결과</p>
					</div>

					<div className='bg-white rounded-2xl border border-slate-100 shadow-sm'>
						<div className='flex flex-col items-center justify-center py-20 px-6 text-center'>
							<div className='w-16 h-16 bg-hs-yellow/10 rounded-2xl flex items-center justify-center mb-4'>
								<Sparkles size={28} className='text-hs-yellow' />
							</div>
							<p className='text-slate-700 font-bold text-base mb-1'>아직 분석 결과가 없어요</p>
							<p className='text-slate-400 text-sm mb-6'>채용 공고에 지원하면 AI가 자동으로 분석을 시작해요</p>
							<Button
								onClick={() => navigate('/jobs')}
								className='px-6 py-2.5 font-bold rounded-xl shadow-sm shadow-hs-yellow/20'
							>
								공고 보러 가기
							</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

/* ── 공통 카드 셸 ── */
interface ActionCardProps {
	icon: ReactNode
	iconTone: 'yellow' | 'deep-green' | 'muted'
	title: string
	subtitle?: ReactNode
	badge?: ReactNode
	description?: ReactNode
	children?: ReactNode
	action: ReactNode
	dashed?: boolean
	topAccent?: number
}

const ICON_TONES = {
	yellow: 'bg-hs-yellow/15 text-hs-yellow',
	'deep-green': 'bg-hs-deep-green/8 text-hs-deep-green',
	muted: 'bg-slate-100 text-slate-400',
} as const

function ActionCard({
	icon,
	iconTone,
	title,
	subtitle,
	badge,
	description,
	children,
	action,
	dashed = false,
	topAccent,
}: ActionCardProps) {
	return (
		<div
			className={cn(
				'bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col',
				dashed ? 'border border-dashed border-slate-200' : 'border border-slate-100'
			)}
		>
			{topAccent !== undefined && (
				<div className='h-1 bg-slate-100'>
					<div className='h-full bg-hs-yellow transition-all' style={{ width: `${topAccent}%` }} />
				</div>
			)}

			<div className='p-6 flex flex-col flex-1'>
				<div className='flex items-start justify-between mb-4'>
					<div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', ICON_TONES[iconTone])}>
						{icon}
					</div>
					{badge}
				</div>

				<h3 className='text-lg font-extrabold text-hs-deep-green mb-0.5'>{title}</h3>
				{subtitle && <div className='text-xs text-slate-400 font-medium mb-3'>{subtitle}</div>}
				{description && <p className='text-sm text-slate-500 leading-relaxed mb-4'>{description}</p>}

				{children && <div className='mb-5 flex-1'>{children}</div>}
				{!children && <div className='flex-1' />}

				{action}
			</div>
		</div>
	)
}

/* ── 채용 공고 탐색 카드 ── */
function JobExploreCard({ onExplore }: { onExplore: () => void }) {
	return (
		<ActionCard
			icon={<Briefcase size={22} />}
			iconTone='yellow'
			title='채용 공고 탐색'
			badge={
				<span className='text-xs font-extrabold text-hs-yellow bg-hs-yellow/10 px-2.5 py-1 rounded-full border border-hs-yellow/20'>
					오늘 신규 12건
				</span>
			}
			description='공고에 지원하면 AI가 자동으로 이력서를 분석하고 예상 질문을 만들어드려요.'
			action={
				<Button className='w-full font-bold rounded-xl py-5 shadow-sm shadow-hs-yellow/20' onClick={onExplore}>
					공고 탐색하기
				</Button>
			}
		/>
	)
}

/* ── 이력서 카드 분기 (로딩 / 없음 / 있음) ── */
interface ResumeCardProps {
	isLoading: boolean
	hasResume: boolean | null
	resume: ResumeDisplayData | null
	onEdit: () => void
	onCreate: () => void
}

function ResumeCard({ isLoading, hasResume, resume, onEdit, onCreate }: ResumeCardProps) {
	if (isLoading || hasResume === null) return <ResumeSkeletonCard />
	if (!hasResume || !resume) return <ResumeEmptyCard onCreate={onCreate} />
	return <ResumeStatusCard resume={resume} onEdit={onEdit} />
}

/* ── 이력서 로딩 스켈레톤 ── */
function ResumeSkeletonCard() {
	return (
		<div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4 animate-pulse'>
			<div className='flex items-start justify-between'>
				<div className='w-11 h-11 rounded-xl bg-slate-100' />
				<div className='w-16 h-6 rounded-full bg-slate-100' />
			</div>
			<div className='h-5 w-24 rounded bg-slate-100' />
			<div className='h-3 w-32 rounded bg-slate-100' />
			<div className='flex-1 rounded-xl bg-slate-50 h-24' />
			<div className='h-12 rounded-xl bg-slate-100' />
		</div>
	)
}

/* ── 이력서 없음 카드 ── */
function ResumeEmptyCard({ onCreate }: { onCreate: () => void }) {
	return (
		<ActionCard
			dashed
			icon={<FileText size={22} />}
			iconTone='muted'
			title='내 이력서'
			badge={<span className='text-xs font-extrabold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full'>미작성</span>}
			description={
				<>
					아직 작성된 이력서가 없어요.
					<br />
					지금 이력서를 작성하고 채용 공고에 지원해보세요
				</>
			}
			action={
				<Button className='w-full font-bold rounded-xl py-5 flex items-center gap-2' onClick={onCreate}>
					<PenLine size={15} />
					이력서 작성하기
				</Button>
			}
		/>
	)
}

/* ── 이력서 있음 카드 ── */
function ResumeStatusCard({ resume, onEdit }: { resume: ResumeDisplayData; onEdit: () => void }) {
	const done = resume.sections.filter(s => s.done).length
	const total = resume.sections.length

	return (
		<ActionCard
			topAccent={resume.completionRate}
			icon={<FileText size={22} />}
			iconTone='deep-green'
			title='내 이력서'
			subtitle={
				<span className='flex items-center gap-1'>
					<Clock size={11} />
					마지막 수정 {resume.updatedAt}
				</span>
			}
			badge={
				<span className='text-xs font-extrabold text-hs-yellow bg-hs-yellow/10 px-2.5 py-1 rounded-full border border-hs-yellow/20'>
					{resume.completionRate}% 완성
				</span>
			}
			action={
				<Button className='w-full font-bold rounded-xl py-5 flex items-center gap-2' onClick={onEdit}>
					<PenLine size={15} />
					이력서 수정하기
				</Button>
			}
		>
			<div className='bg-slate-50 rounded-xl px-4 py-3'>
				<p className='text-xs font-bold text-slate-400 mb-2'>
					섹션 작성 현황 ({done}/{total})
				</p>
				<div className='grid grid-cols-2 gap-y-1.5 gap-x-2'>
					{resume.sections.map(s => (
						<div key={s.label} className='flex items-center gap-1.5 text-xs font-medium'>
							{s.done ? (
								<CheckCircle2 size={13} className='text-hs-green shrink-0' />
							) : (
								<div className='w-[13px] h-[13px] rounded-full border-2 border-slate-200 shrink-0' />
							)}
							<span className={s.done ? 'text-slate-600' : 'text-slate-400'}>{s.label}</span>
						</div>
					))}
				</div>
			</div>
		</ActionCard>
	)
}
