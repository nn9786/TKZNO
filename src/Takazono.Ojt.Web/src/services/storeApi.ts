import type { CreateStoreRequest, StoreDto, StoreDtoPagedResult, UpdateDisplayOrderRequest, UpdateStoreRequest } from '@/api/@types'
import { apiClient } from '@/utils/apiClient'

export type SearchStoreParams = {
  keyword?: string
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
}

export const searchStores = (params: SearchStoreParams): Promise<StoreDtoPagedResult> =>
  apiClient.Store.Search.$get({
    query: {
      Keyword: params.keyword,
      IncludeInactive: params.includeInactive,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
    },
  })

export const getStore = (sid: number): Promise<StoreDto> => apiClient.Store.Get._sid(sid).$get()

export const createStore = (req: CreateStoreRequest): Promise<StoreDto> => apiClient.Store.Create.$post({ body: req })

export const updateStore = (sid: number, req: UpdateStoreRequest): Promise<StoreDto> =>
  apiClient.Store.Update._sid(sid).$put({ body: req })

export const deleteStore = (sid: number): Promise<void> => apiClient.Store.Delete._sid(sid).$delete()

export const updateStoreDisplayOrder = (req: UpdateDisplayOrderRequest): Promise<void> =>
  apiClient.Store.UpdateDisplayOrder.$put({ body: req })
