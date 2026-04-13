import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/company/common/Button'
import { Input } from '../../../components/company/common/Input'

const COMPANY_AUTH_KEY = 'companyAuthName'

const AuthPage = () => {
	const navigate = useNavigate()
	const [companyName, setCompanyName] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = (event: FormEvent) => {
		event.preventDefault()
		if (!companyName.trim() || !password.trim()) return
		window.localStorage.setItem(COMPANY_AUTH_KEY, JSON.stringify(companyName.trim()))
		window.dispatchEvent(new Event('company-auth-updated'))
		navigate('/settings/company')
	}

	return (
		<div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center'>
			<div className='mx-auto w-full max-w-md rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-1 text-xl font-semibold text-hs-deep-green'>기업 계정 로그인</h2>
				<p className='mb-6 text-sm text-black'>회사명과 비밀번호로 빠르게 로그인하세요.</p>
				<form className='space-y-4' onSubmit={handleLogin}>
					<Input
						id='company-name'
						label='회사명'
						type='text'
						placeholder='하이어스코프'
						value={companyName}
						onChange={event => setCompanyName(event.target.value)}
					/>
					<Input
						id='password'
						label='비밀번호'
						type='password'
						placeholder='********'
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
					<Button className='w-full'>로그인</Button>
				</form>
			</div>
		</div>
	)
}

export default AuthPage
