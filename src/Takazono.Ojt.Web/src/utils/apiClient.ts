import aspida from '@aspida/axios'
import axios from 'axios'

import api from '@/api/$api'

const BASE_URL = 'http://localhost:4211'

const axiosClient = axios.create({ baseURL: BASE_URL, timeout: 30000 })

/** redux-persistがlocalStorageに保存したJSONからJWTを取り出す（バックエンドへのAccept-Language送出は行わない、§2.9参照）。 */
const readToken = (): string | null => {
  const raw = localStorage.getItem('persist:root')
  if (!raw) return null
  try {
    const persisted = JSON.parse(raw) as Record<string, string>
    const auth = persisted.auth ? (JSON.parse(persisted.auth) as { token: string | null }) : null
    return auth?.token ?? null
  } catch {
    return null
  }
}

axiosClient.interceptors.request.use((config) => {
  const token = readToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiClient = api(aspida(axiosClient)).api.v1
