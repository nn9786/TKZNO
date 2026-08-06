import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods_1sji0um } from './Create'
import type { Methods as Methods_17hurie } from './Delete/_sid@number'
import type { Methods as Methods_qck396 } from './DownloadCsv'
import type { Methods as Methods_1r7tdnd } from './Get/_sid@number'
import type { Methods as Methods_1k9kxxu } from './Search'
import type { Methods as Methods_1xjp1rg } from './Update/_sid@number'
import type { Methods as Methods_g9enst } from './UpdatePassword/_sid@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/User/Create'
  const PATH1 = '/api/v1/User/Delete'
  const PATH2 = '/api/v1/User/DownloadCsv'
  const PATH3 = '/api/v1/User/Get'
  const PATH4 = '/api/v1/User/Search'
  const PATH5 = '/api/v1/User/Update'
  const PATH6 = '/api/v1/User/UpdatePassword'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    Create: {
      /**
       * @returns OK
       */
      post: (option: { body: Methods_1sji0um['post']['reqBody']; config?: T | undefined }) =>
        fetch<Methods_1sji0um['post']['resBody'], BasicHeaders, Methods_1sji0um['post']['status']>(
          prefix,
          PATH0,
          POST,
          option
        ).json(),
      /**
       * @returns OK
       */
      $post: (option: { body: Methods_1sji0um['post']['reqBody']; config?: T | undefined }) =>
        fetch<Methods_1sji0um['post']['resBody'], BasicHeaders, Methods_1sji0um['post']['status']>(
          prefix,
          PATH0,
          POST,
          option
        )
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    Delete: {
      _sid: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          delete: (option: { query: Methods_17hurie['delete']['query']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_17hurie['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option: { query: Methods_17hurie['delete']['query']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_17hurie['delete']['status']>(prefix, prefix1, DELETE, option)
              .send()
              .then((r) => r.body),
          $path: (option?: { method: 'delete'; query: Methods_17hurie['delete']['query'] } | undefined) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        }
      },
    },
    DownloadCsv: {
      get: (option?: { query?: Methods_qck396['get']['query'] | undefined; config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_qck396['get']['status']>(prefix, PATH2, GET, option).send(),
      $get: (option?: { query?: Methods_qck396['get']['query'] | undefined; config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_qck396['get']['status']>(prefix, PATH2, GET, option)
          .send()
          .then((r) => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_qck396['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    Get: {
      _sid: (val1: number) => {
        const prefix1 = `${PATH3}/${val1}`

        return {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1r7tdnd['get']['resBody'], BasicHeaders, Methods_1r7tdnd['get']['status']>(
              prefix,
              prefix1,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1r7tdnd['get']['resBody'], BasicHeaders, Methods_1r7tdnd['get']['status']>(
              prefix,
              prefix1,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
    },
    Search: {
      /**
       * @returns OK
       */
      get: (option?: { query?: Methods_1k9kxxu['get']['query'] | undefined; config?: T | undefined } | undefined) =>
        fetch<Methods_1k9kxxu['get']['resBody'], BasicHeaders, Methods_1k9kxxu['get']['status']>(
          prefix,
          PATH4,
          GET,
          option
        ).json(),
      /**
       * @returns OK
       */
      $get: (option?: { query?: Methods_1k9kxxu['get']['query'] | undefined; config?: T | undefined } | undefined) =>
        fetch<Methods_1k9kxxu['get']['resBody'], BasicHeaders, Methods_1k9kxxu['get']['status']>(
          prefix,
          PATH4,
          GET,
          option
        )
          .json()
          .then((r) => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1k9kxxu['get']['query'] } | undefined) =>
        `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    Update: {
      _sid: (val1: number) => {
        const prefix1 = `${PATH5}/${val1}`

        return {
          /**
           * @returns OK
           */
          put: (option: { body: Methods_1xjp1rg['put']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_1xjp1rg['put']['resBody'], BasicHeaders, Methods_1xjp1rg['put']['status']>(
              prefix,
              prefix1,
              PUT,
              option
            ).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_1xjp1rg['put']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_1xjp1rg['put']['resBody'], BasicHeaders, Methods_1xjp1rg['put']['status']>(
              prefix,
              prefix1,
              PUT,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
    },
    UpdatePassword: {
      _sid: (val1: number) => {
        const prefix1 = `${PATH6}/${val1}`

        return {
          /**
           * @returns OK
           */
          put: (option: { body: Methods_g9enst['put']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_g9enst['put']['resBody'], BasicHeaders, Methods_g9enst['put']['status']>(
              prefix,
              prefix1,
              PUT,
              option
            ).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_g9enst['put']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_g9enst['put']['resBody'], BasicHeaders, Methods_g9enst['put']['status']>(
              prefix,
              prefix1,
              PUT,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
