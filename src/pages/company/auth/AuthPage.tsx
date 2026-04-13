import { Button } from '../../../components/company/common/Button'
import { Input } from '../../../components/company/common/Input'

const AuthPage = () => {
	return (
		<div className='flex min-h-screen w-full items-center justify-center bg-white px-10'>
			<div className='w-full max-w-md rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-1 text-xl font-semibold text-hs-deep-green'>기업 계정 로그인</h2>
				<p className='mb-6 text-sm text-black'>회사명과 비밀번호로 빠르게 로그인하세요.</p>
				<form className='space-y-4'>
					<Input id='company-name' label='회사명' type='text' placeholder='하이어스코프' />
					<Input id='password' label='비밀번호' type='password' placeholder='********' />
					<Button className='w-full'>로그인</Button>
				</form>
			</div>
		</div>
	)
}

export default AuthPage
