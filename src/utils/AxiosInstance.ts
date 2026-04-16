import axios from 'axios'

export const api = axios.create({
	baseURL: `https://kwung.site/`,
	withCredentials: true,
})
