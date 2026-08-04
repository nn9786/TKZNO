import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods_1yn3668 } from './v1/Auth/Login'
import type { Methods as Methods_53cf7x } from './v1/Customer/Create'
import type { Methods as Methods_12lid51 } from './v1/Customer/Delete/_sid@number'
import type { Methods as Methods_1qdzos8 } from './v1/Customer/Get/_sid@number'
import type { Methods as Methods_onfvrt } from './v1/Customer/Search'
import type { Methods as Methods_itfqi7 } from './v1/Customer/Update/_sid@number'
import type { Methods as Methods_4i25vm } from './v1/Customer/UpdateDisplayOrder'
import type { Methods as Methods_xizo8u } from './v1/Store/Create'
import type { Methods as Methods_1fkfriu } from './v1/Store/Delete/_sid@number'
import type { Methods as Methods_6lxi7e } from './v1/Store/DownloadCsv'
import type { Methods as Methods_njw8p5 } from './v1/Store/Get/_sid@number'
import type { Methods as Methods_agq6px } from './v1/Store/GetAll'
import type { Methods as Methods_ghm2iq } from './v1/Store/Search'
import type { Methods as Methods_ytdsl8 } from './v1/Store/Update/_sid@number'
import type { Methods as Methods_8lup79 } from './v1/Store/UpdateDisplayOrder'
import type { Methods as Methods_1gku6it } from './v1/Supplier/Create'
import type { Methods as Methods_1ykybb1 } from './v1/Supplier/Delete/_sid@number'
import type { Methods as Methods_321z2z } from './v1/Supplier/DownloadCsv'
import type { Methods as Methods_dbkjv4 } from './v1/Supplier/Get/_sid@number'
import type { Methods as Methods_1odysn5 } from './v1/Supplier/Search'
import type { Methods as Methods_1n8lq7r } from './v1/Supplier/Update/_sid@number'
import type { Methods as Methods_1jwb2re } from './v1/Supplier/UpdateDisplayOrder'
import type { Methods as Methods_ilut5v } from './v1/Unit/Create'
import type { Methods as Methods_co3tc3 } from './v1/Unit/Delete/_sid@number'
import type { Methods as Methods_1w8v64h } from './v1/Unit/DownloadCsv'
import type { Methods as Methods_zrp26m } from './v1/Unit/Get/_sid@number'
import type { Methods as Methods_14unp58 } from './v1/Unit/GetAll'
import type { Methods as Methods_1p703ez } from './v1/Unit/Search'
import type { Methods as Methods_yhqbql } from './v1/Unit/Update/_sid@number'
import type { Methods as Methods_1g3hoeo } from './v1/Unit/UpdateDisplayOrder'
import type { Methods as Methods_h7bp4g } from './v1/User/Create'
import type { Methods as Methods_1nv0yk0 } from './v1/User/Delete/_sid@number'
import type { Methods as Methods_az9elw } from './v1/User/DownloadCsv'
import type { Methods as Methods_5ydq37 } from './v1/User/Get/_sid@number'
import type { Methods as Methods_1x20gvs } from './v1/User/Search'
import type { Methods as Methods_194ho92 } from './v1/User/Update/_sid@number'
import type { Methods as Methods_9vi3bv } from './v1/User/UpdatePassword/_sid@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/Auth/Login'
  const PATH1 = '/api/v1/Customer/Create'
  const PATH2 = '/api/v1/Customer/Delete'
  const PATH3 = '/api/v1/Customer/Get'
  const PATH4 = '/api/v1/Customer/Search'
  const PATH5 = '/api/v1/Customer/Update'
  const PATH6 = '/api/v1/Customer/UpdateDisplayOrder'
  const PATH7 = '/api/v1/Store/Create'
  const PATH8 = '/api/v1/Store/Delete'
  const PATH9 = '/api/v1/Store/DownloadCsv'
  const PATH10 = '/api/v1/Store/Get'
  const PATH11 = '/api/v1/Store/GetAll'
  const PATH12 = '/api/v1/Store/Search'
  const PATH13 = '/api/v1/Store/Update'
  const PATH14 = '/api/v1/Store/UpdateDisplayOrder'
  const PATH15 = '/api/v1/Supplier/Create'
  const PATH16 = '/api/v1/Supplier/Delete'
  const PATH17 = '/api/v1/Supplier/DownloadCsv'
  const PATH18 = '/api/v1/Supplier/Get'
  const PATH19 = '/api/v1/Supplier/Search'
  const PATH20 = '/api/v1/Supplier/Update'
  const PATH21 = '/api/v1/Supplier/UpdateDisplayOrder'
  const PATH22 = '/api/v1/Unit/Create'
  const PATH23 = '/api/v1/Unit/Delete'
  const PATH24 = '/api/v1/Unit/DownloadCsv'
  const PATH25 = '/api/v1/Unit/Get'
  const PATH26 = '/api/v1/Unit/GetAll'
  const PATH27 = '/api/v1/Unit/Search'
  const PATH28 = '/api/v1/Unit/Update'
  const PATH29 = '/api/v1/Unit/UpdateDisplayOrder'
  const PATH30 = '/api/v1/User/Create'
  const PATH31 = '/api/v1/User/Delete'
  const PATH32 = '/api/v1/User/DownloadCsv'
  const PATH33 = '/api/v1/User/Get'
  const PATH34 = '/api/v1/User/Search'
  const PATH35 = '/api/v1/User/Update'
  const PATH36 = '/api/v1/User/UpdatePassword'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    v1: {
      Auth: {
        Login: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_1yn3668['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_1yn3668['post']['resBody'], BasicHeaders, Methods_1yn3668['post']['status']>(
              prefix,
              PATH0,
              POST,
              option
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_1yn3668['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_1yn3668['post']['resBody'], BasicHeaders, Methods_1yn3668['post']['status']>(
              prefix,
              PATH0,
              POST,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH0}`,
        },
      },
      Customer: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_53cf7x['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_53cf7x['post']['resBody'], BasicHeaders, Methods_53cf7x['post']['status']>(
              prefix,
              PATH1,
              POST,
              option
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_53cf7x['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_53cf7x['post']['resBody'], BasicHeaders, Methods_53cf7x['post']['status']>(
              prefix,
              PATH1,
              POST,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH1}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH2}/${val3}`

            return {
              delete: (option: { query: Methods_12lid51['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_12lid51['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option: { query: Methods_12lid51['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_12lid51['delete']['status']>(prefix, prefix3, DELETE, option)
                  .send()
                  .then((r) => r.body),
              $path: (option?: { method: 'delete'; query: Methods_12lid51['delete']['query'] } | undefined) =>
                `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
            }
          },
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH3}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1qdzos8['get']['resBody'], BasicHeaders, Methods_1qdzos8['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1qdzos8['get']['resBody'], BasicHeaders, Methods_1qdzos8['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_onfvrt['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_onfvrt['get']['resBody'], BasicHeaders, Methods_onfvrt['get']['status']>(
              prefix,
              PATH4,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_onfvrt['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_onfvrt['get']['resBody'], BasicHeaders, Methods_onfvrt['get']['status']>(
              prefix,
              PATH4,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_onfvrt['get']['query'] } | undefined) =>
            `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH5}/${val3}`

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_itfqi7['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_itfqi7['put']['resBody'], BasicHeaders, Methods_itfqi7['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_itfqi7['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_itfqi7['put']['resBody'], BasicHeaders, Methods_itfqi7['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        UpdateDisplayOrder: {
          put: (option: { body: Methods_4i25vm['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_4i25vm['put']['status']>(prefix, PATH6, PUT, option).send(),
          $put: (option: { body: Methods_4i25vm['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_4i25vm['put']['status']>(prefix, PATH6, PUT, option)
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH6}`,
        },
      },
      Store: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_xizo8u['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_xizo8u['post']['resBody'], BasicHeaders, Methods_xizo8u['post']['status']>(
              prefix,
              PATH7,
              POST,
              option
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_xizo8u['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_xizo8u['post']['resBody'], BasicHeaders, Methods_xizo8u['post']['status']>(
              prefix,
              PATH7,
              POST,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH7}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH8}/${val3}`

            return {
              delete: (option: { query: Methods_1fkfriu['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_1fkfriu['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option: { query: Methods_1fkfriu['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_1fkfriu['delete']['status']>(prefix, prefix3, DELETE, option)
                  .send()
                  .then((r) => r.body),
              $path: (option?: { method: 'delete'; query: Methods_1fkfriu['delete']['query'] } | undefined) =>
                `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
            }
          },
        },
        DownloadCsv: {
          get: (option?: { query?: Methods_6lxi7e['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_6lxi7e['get']['status']>(prefix, PATH9, GET, option).send(),
          $get: (option?: { query?: Methods_6lxi7e['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_6lxi7e['get']['status']>(prefix, PATH9, GET, option)
              .send()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_6lxi7e['get']['query'] } | undefined) =>
            `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH10}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_njw8p5['get']['resBody'], BasicHeaders, Methods_njw8p5['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_njw8p5['get']['resBody'], BasicHeaders, Methods_njw8p5['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        GetAll: {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_agq6px['get']['resBody'], BasicHeaders, Methods_agq6px['get']['status']>(
              prefix,
              PATH11,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_agq6px['get']['resBody'], BasicHeaders, Methods_agq6px['get']['status']>(
              prefix,
              PATH11,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH11}`,
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_ghm2iq['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_ghm2iq['get']['resBody'], BasicHeaders, Methods_ghm2iq['get']['status']>(
              prefix,
              PATH12,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_ghm2iq['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_ghm2iq['get']['resBody'], BasicHeaders, Methods_ghm2iq['get']['status']>(
              prefix,
              PATH12,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_ghm2iq['get']['query'] } | undefined) =>
            `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH13}/${val3}`

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_ytdsl8['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_ytdsl8['put']['resBody'], BasicHeaders, Methods_ytdsl8['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_ytdsl8['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_ytdsl8['put']['resBody'], BasicHeaders, Methods_ytdsl8['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        UpdateDisplayOrder: {
          put: (option: { body: Methods_8lup79['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_8lup79['put']['status']>(prefix, PATH14, PUT, option).send(),
          $put: (option: { body: Methods_8lup79['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_8lup79['put']['status']>(prefix, PATH14, PUT, option)
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH14}`,
        },
      },
      Supplier: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_1gku6it['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_1gku6it['post']['resBody'], BasicHeaders, Methods_1gku6it['post']['status']>(
              prefix,
              PATH15,
              POST,
              option
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_1gku6it['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_1gku6it['post']['resBody'], BasicHeaders, Methods_1gku6it['post']['status']>(
              prefix,
              PATH15,
              POST,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH15}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH16}/${val3}`

            return {
              delete: (option: { query: Methods_1ykybb1['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_1ykybb1['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option: { query: Methods_1ykybb1['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_1ykybb1['delete']['status']>(prefix, prefix3, DELETE, option)
                  .send()
                  .then((r) => r.body),
              $path: (option?: { method: 'delete'; query: Methods_1ykybb1['delete']['query'] } | undefined) =>
                `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
            }
          },
        },
        DownloadCsv: {
          get: (option?: { query?: Methods_321z2z['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_321z2z['get']['status']>(prefix, PATH17, GET, option).send(),
          $get: (option?: { query?: Methods_321z2z['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_321z2z['get']['status']>(prefix, PATH17, GET, option)
              .send()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_321z2z['get']['query'] } | undefined) =>
            `${prefix}${PATH17}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH18}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_dbkjv4['get']['resBody'], BasicHeaders, Methods_dbkjv4['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_dbkjv4['get']['resBody'], BasicHeaders, Methods_dbkjv4['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_1odysn5['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_1odysn5['get']['resBody'], BasicHeaders, Methods_1odysn5['get']['status']>(
              prefix,
              PATH19,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?: { query?: Methods_1odysn5['get']['query'] | undefined; config?: T | undefined } | undefined
          ) =>
            fetch<Methods_1odysn5['get']['resBody'], BasicHeaders, Methods_1odysn5['get']['status']>(
              prefix,
              PATH19,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1odysn5['get']['query'] } | undefined) =>
            `${prefix}${PATH19}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH20}/${val3}`

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_1n8lq7r['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_1n8lq7r['put']['resBody'], BasicHeaders, Methods_1n8lq7r['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_1n8lq7r['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_1n8lq7r['put']['resBody'], BasicHeaders, Methods_1n8lq7r['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        UpdateDisplayOrder: {
          put: (option: { body: Methods_1jwb2re['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1jwb2re['put']['status']>(prefix, PATH21, PUT, option).send(),
          $put: (option: { body: Methods_1jwb2re['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1jwb2re['put']['status']>(prefix, PATH21, PUT, option)
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH21}`,
        },
      },
      Unit: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_ilut5v['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_ilut5v['post']['resBody'], BasicHeaders, Methods_ilut5v['post']['status']>(
              prefix,
              PATH22,
              POST,
              option
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_ilut5v['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_ilut5v['post']['resBody'], BasicHeaders, Methods_ilut5v['post']['status']>(
              prefix,
              PATH22,
              POST,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH22}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH23}/${val3}`

            return {
              delete: (option: { query: Methods_co3tc3['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_co3tc3['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option: { query: Methods_co3tc3['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_co3tc3['delete']['status']>(prefix, prefix3, DELETE, option)
                  .send()
                  .then((r) => r.body),
              $path: (option?: { method: 'delete'; query: Methods_co3tc3['delete']['query'] } | undefined) =>
                `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
            }
          },
        },
        DownloadCsv: {
          get: (option?: { query?: Methods_1w8v64h['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_1w8v64h['get']['status']>(prefix, PATH24, GET, option).send(),
          $get: (
            option?: { query?: Methods_1w8v64h['get']['query'] | undefined; config?: T | undefined } | undefined
          ) =>
            fetch<void, BasicHeaders, Methods_1w8v64h['get']['status']>(prefix, PATH24, GET, option)
              .send()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1w8v64h['get']['query'] } | undefined) =>
            `${prefix}${PATH24}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH25}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_zrp26m['get']['resBody'], BasicHeaders, Methods_zrp26m['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_zrp26m['get']['resBody'], BasicHeaders, Methods_zrp26m['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        GetAll: {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_14unp58['get']['resBody'], BasicHeaders, Methods_14unp58['get']['status']>(
              prefix,
              PATH26,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_14unp58['get']['resBody'], BasicHeaders, Methods_14unp58['get']['status']>(
              prefix,
              PATH26,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH26}`,
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_1p703ez['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_1p703ez['get']['resBody'], BasicHeaders, Methods_1p703ez['get']['status']>(
              prefix,
              PATH27,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?: { query?: Methods_1p703ez['get']['query'] | undefined; config?: T | undefined } | undefined
          ) =>
            fetch<Methods_1p703ez['get']['resBody'], BasicHeaders, Methods_1p703ez['get']['status']>(
              prefix,
              PATH27,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1p703ez['get']['query'] } | undefined) =>
            `${prefix}${PATH27}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH28}/${val3}`

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_yhqbql['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_yhqbql['put']['resBody'], BasicHeaders, Methods_yhqbql['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_yhqbql['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_yhqbql['put']['resBody'], BasicHeaders, Methods_yhqbql['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        UpdateDisplayOrder: {
          put: (option: { body: Methods_1g3hoeo['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1g3hoeo['put']['status']>(prefix, PATH29, PUT, option).send(),
          $put: (option: { body: Methods_1g3hoeo['put']['reqBody']; config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1g3hoeo['put']['status']>(prefix, PATH29, PUT, option)
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH29}`,
        },
      },
      User: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_h7bp4g['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_h7bp4g['post']['resBody'], BasicHeaders, Methods_h7bp4g['post']['status']>(
              prefix,
              PATH30,
              POST,
              option
            ).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_h7bp4g['post']['reqBody']; config?: T | undefined }) =>
            fetch<Methods_h7bp4g['post']['resBody'], BasicHeaders, Methods_h7bp4g['post']['status']>(
              prefix,
              PATH30,
              POST,
              option
            )
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH30}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH31}/${val3}`

            return {
              delete: (option: { query: Methods_1nv0yk0['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_1nv0yk0['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option: { query: Methods_1nv0yk0['delete']['query']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_1nv0yk0['delete']['status']>(prefix, prefix3, DELETE, option)
                  .send()
                  .then((r) => r.body),
              $path: (option?: { method: 'delete'; query: Methods_1nv0yk0['delete']['query'] } | undefined) =>
                `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
            }
          },
        },
        DownloadCsv: {
          get: (option?: { query?: Methods_az9elw['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_az9elw['get']['status']>(prefix, PATH32, GET, option).send(),
          $get: (option?: { query?: Methods_az9elw['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_az9elw['get']['status']>(prefix, PATH32, GET, option)
              .send()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_az9elw['get']['query'] } | undefined) =>
            `${prefix}${PATH32}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH33}/${val3}`

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_5ydq37['get']['resBody'], BasicHeaders, Methods_5ydq37['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_5ydq37['get']['resBody'], BasicHeaders, Methods_5ydq37['get']['status']>(
                  prefix,
                  prefix3,
                  GET,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_1x20gvs['get']['query'] | undefined; config?: T | undefined } | undefined) =>
            fetch<Methods_1x20gvs['get']['resBody'], BasicHeaders, Methods_1x20gvs['get']['status']>(
              prefix,
              PATH34,
              GET,
              option
            ).json(),
          /**
           * @returns OK
           */
          $get: (
            option?: { query?: Methods_1x20gvs['get']['query'] | undefined; config?: T | undefined } | undefined
          ) =>
            fetch<Methods_1x20gvs['get']['resBody'], BasicHeaders, Methods_1x20gvs['get']['status']>(
              prefix,
              PATH34,
              GET,
              option
            )
              .json()
              .then((r) => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1x20gvs['get']['query'] } | undefined) =>
            `${prefix}${PATH34}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH35}/${val3}`

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_194ho92['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_194ho92['put']['resBody'], BasicHeaders, Methods_194ho92['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                ).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_194ho92['put']['reqBody']; config?: T | undefined }) =>
                fetch<Methods_194ho92['put']['resBody'], BasicHeaders, Methods_194ho92['put']['status']>(
                  prefix,
                  prefix3,
                  PUT,
                  option
                )
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
        UpdatePassword: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH36}/${val3}`

            return {
              put: (option: { body: Methods_9vi3bv['put']['reqBody']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_9vi3bv['put']['status']>(prefix, prefix3, PUT, option).send(),
              $put: (option: { body: Methods_9vi3bv['put']['reqBody']; config?: T | undefined }) =>
                fetch<void, BasicHeaders, Methods_9vi3bv['put']['status']>(prefix, prefix3, PUT, option)
                  .send()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix3}`,
            }
          },
        },
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
