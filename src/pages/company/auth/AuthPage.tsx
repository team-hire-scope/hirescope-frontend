import { Button } from '../../../components/company/common/Button'
import { Input } from '../../../components/company/common/Input'

const AuthPage = () => {
	return (
		<div className='mx-auto flex min-h-[calc(100vh-3rem)] max-w-md items-center'>
			<div className='w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
				<h2 className='mb-1 text-xl font-semibold text-slate-900'>기업 계정 로그인</h2>
				<p className='mb-6 text-sm text-slate-600'>HireScope 계정으로 로그인하거나 가입하세요.</p>
				<form className='space-y-4'>
					<Input id='email' label='이메일' type='email' placeholder='company@email.com' />
					<Input id='password' label='비밀번호' type='password' placeholder='********' />
					<Button className='w-full'>로그인</Button>
				</form>
			</div>
		</div>
	)
}

export default AuthPage
