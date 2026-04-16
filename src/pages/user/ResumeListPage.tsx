import { useNavigate } from 'react-router'
import { FileText, PenLine, Clock, CheckCircle2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/common/Button'

interface Resume {
	id: string
	updatedAt: string
	completionRate: number
	name: string
	sections: { label: string; done: boolean }[]
}

// 실제 연동 시 API로 교체. 이력서 있을 때는 아래 객체를 사용
const MOCK_RESUME: Resume | null = null
// const MOCK_RESUME = {
// 	id: 'resume-1',
// 	updatedAt: '2024.04.10',
// 	completionRate: 80,
// 	name: '김하이어',
// 	sections: [
// 		{ label: '기본 정보', done: true },
// 		{ label: '학력', done: true },
// 		{ label: '경력', done: true },
// 		{ label: '기술 스택', done: true },
// 		{ label: '프로젝트', done: false },
// 		{ label: '자격증', done: false },
// 	],
// }

export default function ResumeListPage() {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen bg-slate-50/50'>
			<div className='container mx-auto max-w-2xl px-6 py-12'>
				{/* 헤더 */}
				<div className='mb-10'>
					<h1 className='text-2xl font-black text-hs-deep-green tracking-tight'>내 이력서</h1>
					<p className='text-sm text-slate-400 mt-1 font-medium'>이력서는 계정당 1개만 작성할 수 있어요.</p>
				</div>

				{MOCK_RESUME ? (
					/* 이력서 있음 */
					<ResumeCard resume={MOCK_RESUME} onEdit={() => navigate(`/resumes/${MOCK_RESUME.id}/edit`)} />
				) : (
					/* 이력서 없음 */
					<EmptyResume onCreate={() => navigate('/resumes/new')} />
				)}
			</div>
		</div>
	)
}

function EmptyResume({ onCreate }: { onCreate: () => void }) {
	return (
		<div className='bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center'>
			<div className='w-16 h-16 bg-hs-deep-green/8 rounded-2xl flex items-center justify-center mx-auto mb-5'>
				<FileText size={28} className='text-hs-deep-green/50' />
			</div>
			<p className='text-slate-700 font-bold text-base mb-1'>아직 작성된 이력서가 없어요</p>
			<p className='text-slate-400 text-sm mb-8 leading-relaxed'>
				이력서를 작성하면 AI 분석을 통해
				<br />
				합격 가능성을 높일 수 있어요.
			</p>
			<Button onClick={onCreate} className='px-8 py-2.5 font-bold rounded-xl shadow-sm shadow-hs-yellow/20'>
				지금 이력서 작성하기
			</Button>
		</div>
	)
}

function ResumeCard({ resume, onEdit }: { resume: Resume; onEdit: () => void }) {
	const doneSections = resume.sections.filter(s => s.done).length
	const totalSections = resume.sections.length

	return (
		<div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
			{/* 완성도 바 */}
			<div className='h-1.5 bg-slate-100'>
				<div className='h-full bg-hs-yellow rounded-full transition-all' style={{ width: `${resume.completionRate}%` }} />
			</div>

			<div className='p-8'>
				{/* 상단 정보 */}
				<div className='flex items-start justify-between mb-6'>
					<div className='flex items-center gap-3.5'>
						<div className='w-12 h-12 bg-hs-deep-green/8 rounded-xl flex items-center justify-center'>
							<FileText size={22} className='text-hs-deep-green' />
						</div>
						<div>
							<p className='font-black text-hs-deep-green text-lg'>{resume.name}의 이력서</p>
							<div className='flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5'>
								<Clock size={12} />
								마지막 수정 {resume.updatedAt}
							</div>
						</div>
					</div>
					<span className='text-sm font-extrabold text-hs-yellow bg-hs-yellow/10 px-3 py-1 rounded-full border border-hs-yellow/20'>
						{resume.completionRate}% 완성
					</span>
				</div>

				{/* 섹션 완성 현황 */}
				<div className='bg-slate-50 rounded-xl p-5 mb-6'>
					<p className='text-xs font-bold text-slate-400 mb-3'>
						섹션 작성 현황 ({doneSections}/{totalSections})
					</p>
					<div className='grid grid-cols-2 gap-2'>
						{resume.sections.map(section => (
							<div key={section.label} className='flex items-center gap-2 text-sm font-medium'>
								{section.done ? (
									<CheckCircle2 size={15} className='text-hs-green shrink-0' />
								) : (
									<div className='w-[15px] h-[15px] rounded-full border-2 border-slate-200 shrink-0' />
								)}
								<span className={section.done ? 'text-slate-700' : 'text-slate-400'}>{section.label}</span>
							</div>
						))}
					</div>
				</div>

				{/* 액션 */}
				<Button onClick={onEdit} className='w-full font-bold rounded-xl py-5 flex items-center gap-2'>
					<PenLine size={16} />
					이력서 수정하기
					<ChevronRight size={16} className='ml-auto' />
				</Button>
			</div>
		</div>
	)
}
