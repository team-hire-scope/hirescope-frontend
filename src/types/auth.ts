export type UserRole = 'APPLICANT' | 'HR'

// 공통 API 응답 래퍼
export interface ApiResponse<T> {
	success: boolean
	code: string
	message: string
	data: T
}

// 로그인
export interface RequestLoginDto {
	email: string
	password: string
}

export interface ResponseLoginDto {
	userId: number
	email: string
	name: string
	role: UserRole
}

// 회원가입
export interface RequestSignupDto {
	email: string
	password: string
	name: string
	role: UserRole
}

export interface ResponseSignupDto {
	userId: number
	email: string
	name: string
	role: UserRole
}

// 인증된 사용자 상태
export interface AuthUser {
	userId: number
	email: string
	name: string
	role: UserRole
}
