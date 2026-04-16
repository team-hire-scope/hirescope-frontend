import { useNavigate } from 'react-router'
import { Button } from '@/components/common/Button'
import { ResumeSectionCard } from '@/components/common/ResumeSectionCard'

export default function CompanyMainPage() {
	const navigate = useNavigate()

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

			<ResumeSectionCard title='최근 지원자 현황'>
				<div className='rounded-lg border-2 border-dashed border-hs-yellow/20 py-10 text-center'>
					<p className='text-slate-400'>아직 최근 지원자 현황이 없습니다.</p>
				</div>
			</ResumeSectionCard>
		</div>
	)
}
