import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key'

export const api = axios.create({
	baseURL: `https://kwung.site/`,
	withCredentials: true,
})

api.interceptors.response.use(
	res => res,
	err => {
		if (axios.isAxiosError(err) && err.response?.status === 401) {
			localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
			window.location.href = '/auth/select'
		}
		return Promise.reject(err)
	}
)
