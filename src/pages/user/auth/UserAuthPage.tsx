import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'

const USER_AUTH_KEY = 'userAuthName'

const UserAuthPage = () => {
	const navigate = useNavigate()
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = (event: FormEvent) => {
		event.preventDefault()
		if (!userName.trim() || !password.trim()) return
		window.localStorage.setItem(USER_AUTH_KEY, JSON.stringify(userName.trim()))
		// 같은 탭에서의 상태 업데이트를 위해 storage 이벤트 강제 발생
		window.dispatchEvent(new Event('storage'))
		// replace: true를 사용하여 뒤로가기 방지
		navigate('/applicant-main', { replace: true })
	}

	return (
		<div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center'>
			<div className='mx-auto w-full max-w-md rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-1 text-xl font-semibold text-hs-deep-green'>지원자 로그인</h2>
				<p className='mb-6 text-sm text-black'>이름과 비밀번호로 빠르게 로그인하세요.</p>
				<form className='space-y-4' onSubmit={handleLogin}>
					<Input
						id='user-name'
						label='이름'
						type='text'
						placeholder='홍길동'
						value={userName}
						onChange={event => setUserName(event.target.value)}
					/>
					<Input
						id='password'
						label='비밀번호'
						type='password'
						placeholder='********'
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
					<Button type='submit' className='w-full'>
						로그인
					</Button>
				</form>
			</div>
		</div>
	)
}

export default UserAuthPage
