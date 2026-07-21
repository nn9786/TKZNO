import type { CreateUnitRequest, UnitDto, UnitDtoPagedResult, UpdateDisplayOrderRequest, UpdateUnitRequest } from '@/api/@types'
import { apiClient } from '@/utils/apiClient'

export type SearchUnitParams = {
  keyword?: string
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
}

export const searchUnits = (params: SearchUnitParams): Promise<UnitDtoPagedResult> =>
  apiClient.Unit.Search.$get({
    query: {
      Keyword: params.keyword,
      IncludeInactive: params.includeInactive,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
    },
  })

export const getUnit = (sid: number): Promise<UnitDto> => apiClient.Unit.Get._sid(sid).$get()

export const createUnit = (req: CreateUnitRequest): Promise<UnitDto> => apiClient.Unit.Create.$post({ body: req })

export const updateUnit = (sid: number, req: UpdateUnitRequest): Promise<UnitDto> =>
  apiClient.Unit.Update._sid(sid).$put({ body: req })

export const deleteUnit = (sid: number): Promise<void> => apiClient.Unit.Delete._sid(sid).$delete()

export const updateUnitDisplayOrder = (req: UpdateDisplayOrderRequest): Promise<void> =>
  apiClient.Unit.UpdateDisplayOrder.$put({ body: req })
