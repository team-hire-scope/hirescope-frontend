import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { login } from '../../api/auth'
import { useAuthContext } from '../../contexts/AuthContext'
import type { RequestLoginDto } from '../../types/auth'

export const useLogin = () => {
	const navigate = useNavigate()
	const { setUser } = useAuthContext()

	return useMutation({
		mutationFn: (payload: RequestLoginDto) => login(payload),
		onSuccess: data => {
			setUser(data)
			navigate(data.role === 'HR' ? '/company-main' : '/applicant-main', { replace: true })
		},
	})
}
