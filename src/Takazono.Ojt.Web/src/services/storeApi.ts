import type {
  CreateStoreRequest,
  StoreDto,
  StoreDtoPagedResult,
  UpdateDisplayOrderRequest,
  UpdateStoreRequest,
} from '@/api/@types'
import { apiClient, axiosClient } from '@/utils/apiClient'

export type SearchStoreParams = {
  keyword?: string
  code?: string
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
  sortKey?: string
  sortDirection?: string
}

export const searchStores = (params: SearchStoreParams): Promise<StoreDtoPagedResult> =>
  apiClient.Store.Search.$get({
    query: {
      Keyword: params.keyword,
      Code: params.code,
      IncludeInactive: params.includeInactive,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SortKey: params.sortKey,
      SortDirection: params.sortDirection,
    },
  })

export const getStore = (sid: number): Promise<StoreDto> => apiClient.Store.Get._sid(sid).$get()

/** ページングなし全件取得（有効なもののみ）。他マスタからの店舗選択セレクトボックス向け。 */
export const getAllStores = (): Promise<StoreDto[]> => apiClient.Store.GetAll.$get()

export const createStore = (req: CreateStoreRequest): Promise<StoreDto> => apiClient.Store.Create.$post({ body: req })

export const updateStore = (sid: number, req: UpdateStoreRequest): Promise<StoreDto> =>
  apiClient.Store.Update._sid(sid).$put({ body: req })

export const deleteStore = (sid: number, version: string): Promise<void> =>
  apiClient.Store.Delete._sid(sid).$delete({ query: { version } })

export const updateStoreDisplayOrder = (req: UpdateDisplayOrderRequest): Promise<void> =>
  apiClient.Store.UpdateDisplayOrder.$put({ body: req })

/** CSVはBlobで返るためaspidaの型付きクライアントを使わず、生のaxiosClientで直接取得する。 */
export const downloadStoresCsv = (language: string): Promise<Blob> =>
  axiosClient
    .get('/api/v1/Store/DownloadCsv', { params: { language }, responseType: 'blob' })
    .then((res) => res.data as Blob)
