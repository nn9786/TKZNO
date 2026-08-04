import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods_o98sx6 } from './_sid@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/Unit/Delete'
  const DELETE = 'DELETE'

  return {
    _sid: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        delete: (option: { query: Methods_o98sx6['delete']['query']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_o98sx6['delete']['status']>(prefix, prefix0, DELETE, option).send(),
        $delete: (option: { query: Methods_o98sx6['delete']['query']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_o98sx6['delete']['status']>(prefix, prefix0, DELETE, option)
            .send()
            .then((r) => r.body),
        $path: (option?: { method: 'delete'; query: Methods_o98sx6['delete']['query'] } | undefined) =>
          `${prefix}${prefix0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      }
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
