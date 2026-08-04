import type {
  CreateUnitRequest,
  UnitDto,
  UnitDtoPagedResult,
  UpdateDisplayOrderRequest,
  UpdateUnitRequest,
} from '@/api/@types'
import { apiClient, axiosClient } from '@/utils/apiClient'

export type SearchUnitParams = {
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
  sortKey?: string
  sortDirection?: string
}

export const searchUnits = (params: SearchUnitParams): Promise<UnitDtoPagedResult> =>
  apiClient.Unit.Search.$get({
    query: {
      IncludeInactive: params.includeInactive,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SortKey: params.sortKey,
      SortDirection: params.sortDirection,
    },
  })

export const getUnit = (sid: number): Promise<UnitDto> => apiClient.Unit.Get._sid(sid).$get()

/** ページングなし全件取得(有効なもののみ)。他マスタからの単位選択セレクトボックス向け。 */
export const getAllUnits = (): Promise<UnitDto[]> => apiClient.Unit.GetAll.$get()

export const createUnit = (req: CreateUnitRequest): Promise<UnitDto> => apiClient.Unit.Create.$post({ body: req })

export const updateUnit = (sid: number, req: UpdateUnitRequest): Promise<UnitDto> =>
  apiClient.Unit.Update._sid(sid).$put({ body: req })

export const deleteUnit = (sid: number, version: string): Promise<void> =>
  apiClient.Unit.Delete._sid(sid).$delete({ query: { version } })

export const updateUnitDisplayOrder = (req: UpdateDisplayOrderRequest): Promise<void> =>
  apiClient.Unit.UpdateDisplayOrder.$put({ body: req })

/** CSVはBlobで返るためaspidaの型付きクライアントを使わず、生のaxiosClientで直接取得する。 */
export const downloadUnitsCsv = (language: string): Promise<Blob> =>
  axiosClient
    .get('/api/v1/Unit/DownloadCsv', { params: { language }, responseType: 'blob' })
    .then((res) => res.data as Blob)
