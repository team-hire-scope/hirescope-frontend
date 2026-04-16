import { useParams, useNavigate } from 'react-router'
import { ArrowLeft, BrainCircuit, MessageSquare, Lightbulb, BookOpen, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useAnalysisResult } from '@/hooks/user/useAnalysisResult'

export default function AnalysisResultPage() {
	const { analysisId } = useParams<{ analysisId: string }>()
	const navigate = useNavigate()

	const { data, isLoading, isError } = useAnalysisResult(analysisId ?? '')

	const isPending = !data || data.status === 'PENDING' || data.status === 'PROCESSING'

	if (isLoading || isPending) {
		return (
			<div className='w-full max-w-2xl mx-auto py-24 px-6 flex flex-col items-center text-center gap-8'>
				<div className='relative'>
					<div className='w-24 h-24 bg-hs-deep-green rounded-[32px] flex items-center justify-center shadow-2xl shadow-hs-deep-green/20'>
						<BrainCircuit size={40} className='text-hs-yellow' />
					</div>
					<div className='absolute -top-1 -right-1 w-6 h-6 bg-hs-yellow rounded-full flex items-center justify-center'>
						<Loader2 size={14} className='text-hs-deep-green animate-spin' />
					</div>
				</div>

				<div className='space-y-3'>
					<h1 className='text-3xl font-black text-hs-deep-green tracking-tight'>AI가 분석 중이에요</h1>
					<p className='text-slate-500 font-medium leading-relaxed'>
						이력서와 채용 공고를 정밀 분석하고 있습니다.
						<br />
						잠시만 기다려주세요.
					</p>
				</div>

				<div className='w-full bg-hs-cream/60 rounded-3xl p-6 border border-hs-yellow/10 space-y-4'>
					{['직무 적합도 분석 중', '경력 일관성 검토 중', '면접 예상 질문 생성 중'].map((step, i) => (
						<div key={i} className='flex items-center gap-3'>
							<div className='w-5 h-5 rounded-full border-2 border-hs-yellow/30 flex items-center justify-center shrink-0'>
								<Loader2
									size={12}
									className='text-hs-yellow animate-spin'
									style={{ animationDelay: `${i * 0.3}s` }}
								/>
							</div>
							<span className='text-sm font-medium text-slate-500'>{step}</span>
						</div>
					))}
				</div>

				<p className='text-xs text-slate-400 font-medium'>
					분석이 완료되면 자동으로 결과가 표시됩니다. (30초마다 자동 갱신)
				</p>

				<Button variant='secondary' className='rounded-full gap-2' onClick={() => navigate('/jobs')}>
					<ArrowLeft size={16} />
					공고 목록으로 돌아가기
				</Button>
			</div>
		)
	}

	if (isError || data.status === 'FAILED') {
		return (
			<div className='w-full max-w-2xl mx-auto py-24 px-6 flex flex-col items-center text-center gap-6'>
				<div className='w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center'>
					<AlertCircle size={36} className='text-red-400' />
				</div>
				<div className='space-y-2'>
					<h1 className='text-2xl font-black text-hs-deep-green'>분석에 실패했습니다</h1>
					<p className='text-slate-500 font-medium'>잠시 후 다시 시도해주세요.</p>
				</div>
				<Button variant='secondary' className='rounded-full gap-2' onClick={() => navigate('/jobs')}>
					<ArrowLeft size={16} />
					공고 목록으로 돌아가기
				</Button>
			</div>
		)
	}

	return (
		<div className='w-full max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700'>
			{/* 상단 네비게이션 */}
			<button
				onClick={() => navigate('/jobs')}
				className='flex items-center gap-2 text-slate-400 font-bold hover:text-hs-deep-green transition-colors'
			>
				<ArrowLeft size={18} />
				공고 목록으로 돌아가기
			</button>

			{/* 헤더 */}
			<section className='bg-hs-deep-green text-white rounded-[40px] p-10 lg:p-14 shadow-2xl relative overflow-hidden'>
				<div className='absolute right-[-10%] top-[-20%] w-96 h-96 bg-hs-yellow/10 rounded-full blur-[100px] pointer-events-none' />
				<div className='relative z-10 space-y-5'>
					<div className='inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-hs-yellow font-bold text-sm'>
						<BrainCircuit size={16} />
						AI 면접 질문 분석 완료
					</div>
					<h1 className='text-3xl lg:text-4xl font-black tracking-tight leading-tight'>
						맞춤형 면접 질문을 <br />
						<span className='text-hs-yellow'>준비했어요</span>
					</h1>
					{data.summary && (
						<p className='text-white/75 text-base font-medium leading-relaxed max-w-2xl'>{data.summary}</p>
					)}
				</div>
			</section>

			{/* 면접 질문 리스트 */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-black text-hs-deep-green flex items-center gap-3'>
					<MessageSquare className='text-hs-yellow' size={24} />
					예상 면접 질문 ({data.interviewQuestions.length}개)
				</h2>

				<div className='grid grid-cols-1 gap-5'>
					{data.interviewQuestions.map((q, idx) => (
						<div
							key={idx}
							className='group bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all hover:border-hs-yellow/30 hover:shadow-xl hover:shadow-hs-deep-green/5'
						>
							{/* 질문 헤더 */}
							<div className='flex items-start gap-5 p-8 pb-5'>
								<div className='w-11 h-11 bg-hs-deep-green rounded-2xl flex items-center justify-center shrink-0 text-hs-yellow font-black text-base'>
									{idx + 1}
								</div>
								<h3 className='text-lg font-bold text-hs-deep-green leading-snug pt-1.5'>{q.question}</h3>
							</div>

							{/* 출제 의도 */}
							{q.intent && (
								<div className='mx-8 mb-4 bg-slate-50 rounded-2xl px-5 py-4 flex items-start gap-3 border border-slate-100'>
									<Lightbulb size={16} className='text-hs-yellow shrink-0 mt-0.5' />
									<div>
										<p className='text-xs font-black text-slate-400 uppercase tracking-wider mb-1'>
											출제 의도
										</p>
										<p className='text-sm text-slate-600 font-medium leading-relaxed'>{q.intent}</p>
									</div>
								</div>
							)}

							{/* 답변 가이드 */}
							{q.answer_guide && (
								<div className='mx-8 mb-8 bg-hs-cream/50 rounded-2xl px-5 py-4 flex items-start gap-3 border border-hs-yellow/10'>
									<BookOpen size={16} className='text-hs-deep-green/60 shrink-0 mt-0.5' />
									<div>
										<p className='text-xs font-black text-hs-deep-green/40 uppercase tracking-wider mb-1'>
											답변 가이드
										</p>
										<p className='text-sm text-slate-600 font-medium leading-relaxed'>{q.answer_guide}</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</section>

			{/* 하단 배너 */}
			<section className='bg-hs-cream/40 rounded-[40px] p-10 flex flex-col items-center text-center space-y-4 border border-hs-yellow/10'>
				<div className='w-16 h-16 bg-hs-deep-green rounded-3xl flex items-center justify-center shadow-xl mb-1'>
					<MessageSquare size={28} className='text-hs-yellow' />
				</div>
				<h3 className='text-xl font-black text-hs-deep-green'>면접 준비를 시작해보세요</h3>
				<p className='text-slate-500 font-medium max-w-sm text-sm leading-relaxed'>
					위 질문들을 참고해 본인만의 답변을 준비해보세요.
					<br />
					하이어스코프가 응원합니다!
				</p>
				<Button className='px-10 py-4 rounded-full font-black mt-2' onClick={() => navigate('/applicant-main')}>
					메인으로 돌아가기
				</Button>
			</section>
		</div>
	)
}
