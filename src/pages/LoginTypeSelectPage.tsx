import { Link } from 'react-router'
import { Button } from '../components/company/common/Button'

const LoginTypeSelectPage = () => {
	return (
		<div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center'>
			<div className='w-full rounded-xl border border-hs-cream bg-white p-8 shadow-sm'>
				<h2 className='text-2xl font-semibold text-hs-deep-green'>로그인 유형 선택</h2>
				<p className='mt-2 text-sm text-black'>서비스 이용 유형을 선택해주세요.</p>
				<div className='mt-6 grid grid-cols-2 gap-4'>
					<div className='rounded-lg border border-hs-cream bg-white p-4'>
						<h3 className='text-base font-semibold text-black'>구직자 로그인</h3>
						<p className='mt-1 text-sm text-black'>개인 계정으로 공고 탐색 및 지원</p>
						<Button className='mt-4 w-full' variant='secondary' disabled>
							준비중
						</Button>
					</div>
					<div className='rounded-lg border border-hs-cream bg-white p-4'>
						<h3 className='text-base font-semibold text-black'>회사 로그인</h3>
						<p className='mt-1 text-sm text-black'>기업 계정으로 채용 공고 및 지원자 관리</p>
						<Link to='/auth'>
							<Button className='mt-4 w-full'>회사 로그인</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginTypeSelectPage
