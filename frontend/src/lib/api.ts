import axios from 'axios'
import { getErrorMessage } from './utils'

export const API_URL = 'http://localhost:8000/api'
export const TOKEN_KEY = 'picklepass_token'

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const UNAUTHORIZED_EVENT = 'picklepass:unauthorized'

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth()
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    }
    return Promise.reject(error)
  },
)

export function storeToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
}

export function onUnauthorized(handler: () => void) {
  window.addEventListener(UNAUTHORIZED_EVENT, handler)
  return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler)
}

export { getErrorMessage }