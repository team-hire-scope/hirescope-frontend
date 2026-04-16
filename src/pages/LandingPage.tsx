import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'
import { useAuthContext } from '../contexts/AuthContext'

const strengths = [
	{
		title: '채용 과정 통합 관리',
		description: '공고 등록부터 지원자 확인, 상태 업데이트까지 한 화면 흐름으로 관리할 수 있습니다.',
	},
	{
		title: 'AI 기반 지원자 분석',
		description: '지원자의 강점과 적합도를 주요 기준으로 요약해 빠른 의사결정을 돕습니다.',
	},
	{
		title: '팀 협업에 맞춘 대시보드',
		description: 'HR 담당자와 실무자가 같은 데이터를 보며 채용 진행 상황을 명확하게 공유할 수 있습니다.',
	},
]

const LandingPage = () => {
	const navigate = useNavigate()
	const { user } = useAuthContext()

	useEffect(() => {
		if (user?.role === 'HR') {
			navigate('/company-main', { replace: true })
		} else if (user?.role === 'APPLICANT') {
			navigate('/applicant-main', { replace: true })
		}
	}, [user, navigate])

	return (
		<section className='w-full space-y-8'>
			<div className='rounded-2xl border border-hs-cream bg-white p-10 shadow-sm'>
				<Badge variant='info'>HireScope</Badge>
				<h2 className='mt-4 text-4xl font-bold leading-tight text-hs-deep-green'>
					하이어스코프는 채용의 시작과 끝을
					<br />더 빠르고 정확하게 연결합니다.
				</h2>
				<p className='mt-4 max-w-3xl text-base text-black'>
					하이어스코프는 HR 팀이 채용 공고 작성, 지원자 검토, 평가 리포트 확인까지 모든 과정을 효율적으로 운영할 수
					있도록 설계된 채용 운영 플랫폼입니다.
				</p>
				<div className='mt-6 flex gap-3'>
					<Link to='/jobs'>
						<Button>채용 공고 보기</Button>
					</Link>
					<Link to='/company-main'>
						<Button variant='secondary'>기업 정보 설정</Button>
					</Link>
				</div>
			</div>

			<div className='grid w-full grid-cols-3 gap-4'>
				{strengths.map(item => (
					<article key={item.title} className='rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
						<h3 className='text-lg font-semibold text-hs-deep-green'>{item.title}</h3>
						<p className='mt-2 text-sm leading-6 text-black'>{item.description}</p>
					</article>
				))}
			</div>
		</section>
	)
}

export default LandingPage
