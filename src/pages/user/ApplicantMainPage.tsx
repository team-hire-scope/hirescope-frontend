import { useNavigate } from 'react-router'
import { Button } from '@/components/common/Button'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'

export default function ApplicantMainPage() {
	const navigate = useNavigate()

	return (
		<div className='container mx-auto max-w-4xl p-6 space-y-8'>
			<header className='space-y-2'>
				<h1 className='text-3xl font-bold text-hs-deep-green'>반가워요! 👋</h1>
				<p className='text-slate-600'>HireScope와 함께 완벽한 면접 준비를 시작해보세요.</p>
			</header>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<ResumeSectionCard title='내 이력서' className='flex flex-col h-full'>
					<p className='text-sm text-slate-500 mb-4'>작성 중이거나 완료된 이력서가 여기에 표시됩니다.</p>
					<div className='mt-auto flex gap-2'>
						<Button className='w-full' onClick={() => navigate('/resumes')}>
							목록 보기
						</Button>
						<Button variant='secondary' className='w-full' onClick={() => navigate('/resumes/new')}>
							새로 작성
						</Button>
					</div>
				</ResumeSectionCard>

				<ResumeSectionCard title='AI 면접 분석' className='flex flex-col h-full'>
					<p className='text-sm text-slate-500 mb-4'>이력서와 JD를 분석하여 예상 질문을 생성합니다.</p>
					<div className='mt-auto'>
						<Button
							className='w-full bg-hs-green text-white hover:bg-hs-deep-green'
							onClick={() => navigate('/analysis/request')}
						>
							분석 시작하기
						</Button>
					</div>
				</ResumeSectionCard>
			</div>

			<ResumeSectionCard title='최근 분석 결과'>
				<div className='text-center py-10 border-2 border-dashed border-hs-yellow/20 rounded-lg'>
					<p className='text-slate-400'>아직 분석 결과가 없습니다.</p>
				</div>
			</ResumeSectionCard>
		</div>
	)
}
