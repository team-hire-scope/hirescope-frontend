import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { isAxiosError } from 'axios'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { useLogin } from '../../../hooks/user/useLogin'

const schema = z.object({
	email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
	password: z.string().min(1, '비밀번호를 입력해주세요'),
})

type FormValues = z.infer<typeof schema>

const AuthPage = () => {
	const { mutate: loginMutate, isPending } = useLogin()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	})

	const onSubmit = (values: FormValues) => {
		loginMutate(values, {
			onError: err => {
				const message =
					isAxiosError(err) && err.response?.data?.message
						? err.response.data.message
						: '이메일 또는 비밀번호를 확인해주세요'
				setError('root', { message })
			},
		})
	}

	return (
		<div className='mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center'>
			<div className='mx-auto w-full max-w-md rounded-xl border border-hs-cream bg-white p-6 shadow-sm'>
				<h2 className='mb-1 text-xl font-semibold text-hs-deep-green'>기업 계정 로그인</h2>
				<p className='mb-6 text-sm text-slate-500'>이메일과 비밀번호로 로그인하세요.</p>

				<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
					<Input
						id='email'
						label='이메일'
						type='email'
						placeholder='company@hirescope.kr'
						error={errors.email?.message}
						{...register('email')}
					/>
					<Input
						id='password'
						label='비밀번호'
						type='password'
						placeholder='비밀번호를 입력하세요'
						error={errors.password?.message}
						{...register('password')}
					/>

					{errors.root && (
						<p className='rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600'>{errors.root.message}</p>
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
