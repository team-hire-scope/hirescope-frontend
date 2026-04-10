import { http, HttpResponse } from 'msw'

export const handlers = [
	// 예시: GET /api/user 요청이 오면 가짜 유저 데이터를 반환
	http.get('/api/user', () => {
		return HttpResponse.json({
			id: 1,
			name: 'User',
			role: 'admin',
		})
	}),
]
