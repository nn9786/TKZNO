import type {
  CreateCustomerRequest,
  CustomerDto,
  CustomerDtoPagedResult,
  UpdateCustomerRequest,
  UpdateDisplayOrderRequest,
} from '@/api/@types'
import { apiClient } from '@/utils/apiClient'

export type SearchCustomerParams = {
  includeInactive?: boolean
  pageNumber?: number
  pageSize?: number
  sortKey?: string
  sortDirection?: string
}

export const searchCustomers = (params: SearchCustomerParams): Promise<CustomerDtoPagedResult> =>
  apiClient.Customer.Search.$get({
    query: {
      IncludeInactive: params.includeInactive,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SortKey: params.sortKey,
      SortDirection: params.sortDirection,
    },
  })

export const getCustomer = (sid: number): Promise<CustomerDto> => apiClient.Customer.Get._sid(sid).$get()

export const createCustomer = (req: CreateCustomerRequest): Promise<CustomerDto> =>
  apiClient.Customer.Create.$post({ body: req })

export const updateCustomer = (sid: number, req: UpdateCustomerRequest): Promise<CustomerDto> =>
  apiClient.Customer.Update._sid(sid).$put({ body: req })

export const deleteCustomer = (sid: number, version: string): Promise<void> =>
  apiClient.Customer.Delete._sid(sid).$delete({ query: { version } })

export const updateCustomerDisplayOrder = (req: UpdateDisplayOrderRequest): Promise<void> =>
  apiClient.Customer.UpdateDisplayOrder.$put({ body: req })
