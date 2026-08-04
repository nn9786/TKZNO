import type {
  CreateSupplierRequest,
  SupplierDto,
  SupplierDtoPagedResult,
  UpdateDisplayOrderRequest,
  UpdateSupplierRequest,
} from '@/api/@types'
import { apiClient, axiosClient } from '@/utils/apiClient'

export type SearchSupplierParams = {
  keyword?: string
  code?: string
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
  sortKey?: string
  sortDirection?: string
}

export const searchSuppliers = (params: SearchSupplierParams): Promise<SupplierDtoPagedResult> =>
  apiClient.Supplier.Search.$get({
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

export const getSupplier = (sid: number): Promise<SupplierDto> => apiClient.Supplier.Get._sid(sid).$get()

export const createSupplier = (req: CreateSupplierRequest): Promise<SupplierDto> =>
  apiClient.Supplier.Create.$post({ body: req })

export const updateSupplier = (sid: number, req: UpdateSupplierRequest): Promise<SupplierDto> =>
  apiClient.Supplier.Update._sid(sid).$put({ body: req })

export const deleteSupplier = (sid: number, version: string): Promise<void> =>
  apiClient.Supplier.Delete._sid(sid).$delete({ query: { version } })

export const updateSupplierDisplayOrder = (req: UpdateDisplayOrderRequest): Promise<void> =>
  apiClient.Supplier.UpdateDisplayOrder.$put({ body: req })

/** CSVはBlobで返るためaspidaの型付きクライアントを使わず、生のaxiosClientで直接取得する。 */
export const downloadSuppliersCsv = (language: string): Promise<Blob> =>
  axiosClient
    .get('/api/v1/Supplier/DownloadCsv', { params: { language }, responseType: 'blob' })
    .then((res) => res.data as Blob)
