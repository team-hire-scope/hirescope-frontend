import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { AuthUser } from '../types/auth'
import { LOCAL_STORAGE_KEY } from '../constants/key'

const getStoredUser = (): AuthUser | null => {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY.USER)
		return raw ? (JSON.parse(raw) as AuthUser) : null
	} catch {
		return null
	}
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUserState] = useState<AuthUser | null>(getStoredUser)

	const setUser = (next: AuthUser | null) => {
		if (next) {
			localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(next))
		} else {
			localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
		}
		setUserState(next)
	}

	return <AuthContext value={{ user, setUser }}>{children}</AuthContext>
}
