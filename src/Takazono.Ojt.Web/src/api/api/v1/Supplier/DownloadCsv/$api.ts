import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods_by08hd } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/Supplier/DownloadCsv'
  const GET = 'GET'

  return {
    get: (option?: { query?: Methods_by08hd['get']['query'] | undefined; config?: T | undefined } | undefined) =>
      fetch<void, BasicHeaders, Methods_by08hd['get']['status']>(prefix, PATH0, GET, option).send(),
    $get: (option?: { query?: Methods_by08hd['get']['query'] | undefined; config?: T | undefined } | undefined) =>
      fetch<void, BasicHeaders, Methods_by08hd['get']['status']>(prefix, PATH0, GET, option)
        .send()
        .then((r) => r.body),
    $path: (option?: { method?: 'get' | undefined; query: Methods_by08hd['get']['query'] } | undefined) =>
      `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
