import { createContext, useContext } from 'react'
import type { AuthUser } from '../types/auth'

interface AuthContextValue {
	user: AuthUser | null
	setUser: (user: AuthUser | null) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuthContext = (): AuthContextValue => {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
	return ctx
}
