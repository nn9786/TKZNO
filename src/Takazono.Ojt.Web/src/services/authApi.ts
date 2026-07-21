import type { LoginRequest, LoginResponse } from '@/api/@types'
import { apiClient } from '@/utils/apiClient'

export const login = (req: LoginRequest): Promise<LoginResponse> => apiClient.Auth.Login.$post({ body: req })
