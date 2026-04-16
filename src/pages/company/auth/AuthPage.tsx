import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { isAxiosError } from 'axios'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { login } from '../../../api/auth'

const COMPANY_AUTH_KEY = 'companyAuthName'

const AuthPage = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isPending, setIsPending] = useState(false)

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault()
		if (!email.trim() || !password.trim()) return

		setErrorMessage('')
		setIsPending(true)

		try {
			const result = await login({
				email: email.trim(),
				password: password.trim(),
			})

			window.localStorage.setItem(COMPANY_AUTH_KEY, JSON.stringify(result.name))
			window.dispatchEvent(new Event('storage'))
			navigate('/company-main', { replace: true })
		} catch (error) {
			const message =
				isAxiosError(error) && error.response?.data?.message
					? error.response.data.message
					: '이메일 또는 비밀번호를 확인해주세요'
			setErrorMessage(message)
		} finally {
			setIsPending(false)
		}
	}

	return (
		<div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center'>
			<div className='mx-auto w-full max-w-md rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-1 text-xl font-semibold text-hs-deep-green'>기업 계정 로그인</h2>
				<p className='mb-6 text-sm text-black'>이메일과 비밀번호로 빠르게 로그인하세요.</p>
				<form className='space-y-4' onSubmit={handleLogin}>
					<Input
						id='email'
						label='이메일'
						type='email'
						placeholder='company@hirescope.kr'
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<Input
						id='password'
						label='비밀번호'
						type='password'
						placeholder='********'
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>

					{errorMessage && (
						<p className='rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600'>{errorMessage}</p>
					)}

					<Button type='submit' className='w-full' disabled={isPending}>
						{isPending ? '로그인 중...' : '로그인'}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AuthPage
