/* eslint-disable */
import type { DefineMethods } from 'aspida'

export type Methods = DefineMethods<{
  get: {
    query?:
      | {
          language?: string | undefined
        }
      | undefined

    status: 200
  }
}>
