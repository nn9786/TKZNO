import aspida from '@aspida/axios'
import axios, { isAxiosError } from 'axios'

import api from '@/api/$api'
import { ROUTE } from '@/constants/route'
import { loggedOut } from '@/store/slice/authSlice'
import { store } from '@/store/store'

const BASE_URL = 'http://localhost:4211'

export const SESSION_EXPIRED_STORAGE_KEY = 'ojt:sessionExpired'

/** CSVダウンロード等、aspidaの型付きクライアントを経由しない生のリクエスト（blobレスポンス等）に使う。 */
export const axiosClient = axios.create({ baseURL: BASE_URL, timeout: 30000 })

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

/** JWTの期限切れ等でAPIが401を返したら、ログイン状態を破棄してログイン画面へ強制的に戻す（Takazono.Oliveの自動ログアウト処理を、教材の簡素なSnackbar方式に合わせて踏襲）。 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const isSessionExpired = isAxiosError(error) && error.response?.status === 401
    if (isSessionExpired && window.location.pathname !== ROUTE.LOGIN) {
      store.dispatch(loggedOut())
      sessionStorage.setItem(SESSION_EXPIRED_STORAGE_KEY, '1')
      window.location.href = ROUTE.LOGIN
    }
    return Promise.reject(error)
  }
)

export const apiClient = api(aspida(axiosClient)).api.v1
