import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { CheckCircle2, ChevronRight, MessageSquare, ArrowLeft, RefreshCw, Trophy, BrainCircuit } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import type { AIAnalysisResult } from '@/types/resume'

// Mock Data
const MOCK_RESULT: AIAnalysisResult = {
	id: 'res-123',
	analysisRequestId: 'req-456',
	summary:
		'지원자님의 이력서와 해당 프론트엔드 공고를 분석한 결과, React와 TypeScript 실무 역량이 매우 뛰어남을 확인했습니다. 특히 프로젝트 내의 로딩 성능 최적화 경험이 해당 회사에서 높게 평가받을 것으로 보입니다.',
	score: 88,
	questions: [
		{
			id: 'q1',
			category: 'technical',
			question:
				'React의 Reconciliation(재조정) 과정에 대해 설명하고, 프로젝트에서 성능 최적화를 위해 어떤 노력을 했는지 말씀해주세요.',
			intent: 'React의 내부 동작 원리에 대한 깊은 이해도와 실무 최적화 능력을 검증하고자 합니다.',
		},
		{
			id: 'q2',
			category: 'experience',
			question: '하이어스코프 프로젝트에서 프론트엔드 리드로서 팀원들과 기술적 충돌이 있었을 때 어떻게 해결하셨나요?',
			intent: '협업 시 문제 해결 능력과 커뮤니케이션 스타일을 파악하기 위함입니다.',
		},
		{
			id: 'q3',
			category: 'personality',
			question: '새로운 기술을 학습할 때 본인만의 속도 조절 방법이나 노하우가 있다면 무엇인가요?',
			intent: '지속적인 성장 가능성과 학습 태도를 평가하고자 합니다.',
		},
		{
			id: 'q4',
			category: 'technical',
			question: 'TypeScript의 제네릭(Generic)을 사용하여 재사용 가능한 컴포넌트를 설계한 구체적인 사례를 들어주세요.',
			intent: '타입 안정성을 고려한 설계 능력과 추상화 실력을 확인합니다.',
		},
	],
}

export default function AnalysisResultPage() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	// 분석 중임을 연출하기 위한 딜레이
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 3000)
		return () => clearTimeout(timer)
	}, [])

	if (isLoading) return <LoadingSpinner />

	return (
		<div className='w-full max-w-5xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700'>
			{/* 상단 네비게이션 */}
			<button
				onClick={() => navigate('/jobs')}
				className='flex items-center gap-2 text-slate-400 font-bold hover:text-hs-deep-green transition-colors'
			>
				<ArrowLeft size={18} />
				공고 목록으로 돌아가기
			</button>

			{/* 헤더 분석 리포트 요약 */}
			<section className='bg-hs-deep-green text-white rounded-[40px] p-10 lg:p-14 shadow-2xl relative overflow-hidden'>
				<div className='absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-hs-yellow/10 rounded-full blur-[100px]' />

				<div className='relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center'>
					<div className='lg:col-span-3 space-y-6'>
						<div className='inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-hs-yellow font-bold text-sm'>
							<BrainCircuit size={18} />
							AI 커리어 컨설팅 분석 결과
						</div>
						<h1 className='text-4xl font-black tracking-tight leading-tight'>
							이력서 분석 결과 <br />
							합격 확률{' '}
							<span className='text-hs-yellow underline decoration-4 underline-offset-8'>
								{MOCK_RESULT.score}%
							</span>{' '}
							입니다!
						</h1>
						<p className='text-lg text-white/80 leading-relaxed font-medium'>{MOCK_RESULT.summary}</p>
					</div>
					<div className='flex flex-col items-center justify-center p-8 bg-white/10 rounded-[32px] border border-white/10'>
						<div className='relative flex items-center justify-center h-32 w-32'>
							<svg className='h-full w-full' viewBox='0 0 100 100'>
								<circle
									className='text-white/20'
									strokeWidth='8'
									stroke='currentColor'
									fill='transparent'
									r='42'
									cx='50'
									cy='50'
								/>
								<circle
									className='text-hs-yellow'
									strokeWidth='8'
									strokeDasharray={42 * 2 * Math.PI}
									strokeDashoffset={42 * 2 * Math.PI * (1 - (MOCK_RESULT.score || 0) / 100)}
									strokeLinecap='round'
									stroke='currentColor'
									fill='transparent'
									r='42'
									cx='50'
									cy='50'
								/>
							</svg>
							<div className='absolute inset-0 flex items-center justify-center'>
								<span className='text-3xl font-black'>{MOCK_RESULT.score}</span>
							</div>
						</div>
						<p className='mt-4 font-bold text-white/60'>AI 예상 점수</p>
					</div>
				</div>
			</section>

			{/* 예상 면접 질문 리스트 */}
			<section className='space-y-8'>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-black text-hs-deep-green flex items-center gap-3'>
						<MessageSquare className='text-hs-yellow' />
						맞춤형 예상 면접 질문
					</h2>
					<Button variant='secondary' className='rounded-full gap-2 border-slate-200'>
						<RefreshCw size={16} />
						질문 다시 생성
					</Button>
				</div>

				<div className='grid grid-cols-1 gap-6'>
					{MOCK_RESULT.questions.map((q, idx) => (
						<div
							key={q.id}
							className='group bg-white rounded-3xl p-8 border border-hs-yellow/10 transition-all hover:border-hs-yellow/40 hover:shadow-xl'
						>
							<div className='flex items-start gap-6'>
								<div className='flex items-center justify-center h-12 w-12 bg-hs-cream rounded-2xl text-hs-deep-green font-black text-xl shrink-0'>
									{idx + 1}
								</div>
								<div className='space-y-4 flex-1'>
									<div className='flex items-center justify-between'>
										<Badge
											variant={
												q.category === 'technical'
													? 'success'
													: q.category === 'experience'
														? 'warning'
														: 'info'
											}
											className='px-4 py-1.5'
										>
											{q.category === 'technical'
												? '직무 역량'
												: q.category === 'experience'
													? '경험/협업'
													: '인성/태도'}
										</Badge>
									</div>
									<h4 className='text-xl font-bold text-hs-deep-green leading-snug'>{q.question}</h4>
									{q.intent && (
										<div className='bg-slate-50 rounded-2xl p-5 border border-slate-100'>
											<p className='text-sm text-slate-500 font-medium flex items-center gap-2'>
												<CheckCircle2 size={16} className='text-hs-green' />
												출제 의도: {q.intent}
											</p>
										</div>
									)}
								</div>
								<button className='self-center p-3 rounded-full bg-slate-50 text-slate-400 group-hover:bg-hs-yellow group-hover:text-hs-deep-green transition-all'>
									<ChevronRight size={24} />
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* 하단 배너 */}
			<section className='bg-hs-cream/30 rounded-[40px] p-12 flex flex-col items-center text-center space-y-6 border border-hs-yellow/10'>
				<div className='w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-2'>
					<Trophy size={40} className='text-hs-yellow' />
				</div>
				<h3 className='text-2xl font-black text-hs-deep-green'>면접 준비를 모두 마치셨나요?</h3>
				<p className='text-slate-500 font-medium max-w-lg'>
					예상 질문에 대한 본인만의 답변을 작성하고 연습해보세요. <br />
					하이어스코프가 지원자님의 성공적인 이직을 응원합니다!
				</p>
				<Button className='px-12 py-5 rounded-full font-black text-lg'>실전 면접 연습하기</Button>
			</section>
		</div>
	)
}
