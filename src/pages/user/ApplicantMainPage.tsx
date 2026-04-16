import { useNavigate } from 'react-router'
import { Briefcase, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'
import { QuickActionCard } from '@/components/user/dashboard/QuickActionCard'

export default function ApplicantMainPage() {
	const navigate = useNavigate()

	return (
		<div className='container mx-auto max-w-5xl p-6 lg:p-12 space-y-12'>
			<header className='space-y-3'>
				<h1 className='text-4xl font-black text-hs-deep-green tracking-tight'>반가워요! 👋</h1>
				<p className='text-lg text-slate-500 font-medium'>
					하이어스코프와 함께 나만의{' '}
					<span className='text-hs-yellow underline underline-offset-4'>성공적인 커리어</span>를 설계해보세요.
				</p>
			</header>

			{/* 퀵 액션 카드 그리드 */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* 채용 공고 탐색 */}
				<QuickActionCard
					title='채용 공고 탐색'
					description='나의 기술 스택에 딱 맞는 채용 공고를 필터링하여 찾아보세요.'
					icon={<Briefcase size={24} />}
					className='bg-hs-cream/10 border-hs-yellow/10'
				>
					<Button className='w-full py-6 font-bold shadow-lg shadow-hs-yellow/10' onClick={() => navigate('/jobs')}>
						공고 탐색하기
					</Button>
				</QuickActionCard>

				{/* 내 이력서 관리 */}
				<QuickActionCard
					title='내 이력서 관리'
					description='작성 중이거나 완료된 이력서가 여기에 표시됩니다.'
					icon={<Search size={24} />}
					iconBgColor='bg-hs-deep-green/10'
					iconColor='text-hs-deep-green'
				>
					<div className='flex gap-2'>
						<Button variant='secondary' className='flex-1 py-6 font-bold' onClick={() => navigate('/resumes')}>
							목록
						</Button>
						<Button className='flex-1 py-6 font-bold' onClick={() => navigate('/resumes/new')}>
							새 작성
						</Button>
					</div>
				</QuickActionCard>

				{/* AI 면접 분석 */}
				<QuickActionCard
					title='AI 면접 분석'
					description='이력서와 JD를 분석하여 예상 질문을 생성하고 합격률을 높이세요.'
					icon={<Sparkles size={24} />}
					iconBgColor='bg-white/10'
					iconColor='text-hs-yellow'
					className='bg-hs-deep-green text-white'
				>
					<Button
						className='w-full py-6 bg-white text-hs-deep-green font-bold border-none hover:bg-white hover:text-hs-deep-green'
						onClick={() => navigate('/analysis/request')}
					>
						분석 시작하기
					</Button>
				</QuickActionCard>
			</div>

			<ResumeSectionCard title='최근 분석 리포트'>
				<div className='text-center py-16 border-2 border-dashed border-hs-yellow/20 rounded-[32px] bg-white'>
					<p className='text-slate-400 font-bold'>아직 분석 결과가 없습니다. 이력서를 작성하고 공고에 지원해보세요!</p>
				</div>
			</ResumeSectionCard>
		</div>
	)
}
