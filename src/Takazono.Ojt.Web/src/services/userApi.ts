import type {
  CreateUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
  UserDto,
  UserDtoPagedResult,
} from '@/api/@types'
import { apiClient, axiosClient } from '@/utils/apiClient'

export type SearchUserParams = {
  keyword?: string
  userName?: string
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
  sortKey?: string
  sortDirection?: string
}

export const searchUsers = (params: SearchUserParams): Promise<UserDtoPagedResult> =>
  apiClient.User.Search.$get({
    query: {
      Keyword: params.keyword,
      UserName: params.userName,
      IncludeInactive: params.includeInactive,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SortKey: params.sortKey,
      SortDirection: params.sortDirection,
    },
  })

export const getUser = (sid: number): Promise<UserDto> => apiClient.User.Get._sid(sid).$get()

export const createUser = (req: CreateUserRequest): Promise<UserDto> => apiClient.User.Create.$post({ body: req })

export const updateUser = (sid: number, req: UpdateUserRequest): Promise<UserDto> =>
  apiClient.User.Update._sid(sid).$put({ body: req })

export const updateUserPassword = (sid: number, req: UpdateUserPasswordRequest): Promise<void> =>
  apiClient.User.UpdatePassword._sid(sid).$put({ body: req })

export const deleteUser = (sid: number, version: string): Promise<void> =>
  apiClient.User.Delete._sid(sid).$delete({ query: { version } })

/** CSVはBlobで返るためaspidaの型付きクライアントを使わず、生のaxiosClientで直接取得する。 */
export const downloadUsersCsv = (language: string): Promise<Blob> =>
  axiosClient
    .get('/api/v1/User/DownloadCsv', { params: { language }, responseType: 'blob' })
    .then((res) => res.data as Blob)
