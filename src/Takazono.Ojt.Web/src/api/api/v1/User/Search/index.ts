/* eslint-disable */
import type { DefineMethods } from 'aspida'
import type * as Types from '../../../../@types'

export type Methods = DefineMethods<{
  get: {
    query?:
      | {
          Keyword?: string | undefined
          UserName?: string | undefined
          IncludeInactive?: boolean | undefined
          PageNumber?: number | undefined
          PageSize?: number | undefined
          SortKey?: string | undefined
          SortDirection?: string | undefined
        }
      | undefined

    status: 200
    /** OK */
    resBody: Types.UserDtoPagedResult
  }
}>
