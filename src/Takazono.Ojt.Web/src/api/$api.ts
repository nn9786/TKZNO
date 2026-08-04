import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods_1f3exhz } from './api/v1/Auth/Login'
import type { Methods as Methods_1adn4qg } from './api/v1/Customer/Create'
import type { Methods as Methods_61g8d4 } from './api/v1/Customer/Delete/_sid@number'
import type { Methods as Methods_1wyt7kr } from './api/v1/Customer/Get/_sid@number'
import type { Methods as Methods_qu6ea8 } from './api/v1/Customer/Search'
import type { Methods as Methods_dhfala } from './api/v1/Customer/Update/_sid@number'
import type { Methods as Methods_1fk94pb } from './api/v1/Customer/UpdateDisplayOrder'
import type { Methods as Methods_1ksobz1 } from './api/v1/Store/Create'
import type { Methods as Methods_y71wmt } from './api/v1/Store/Delete/_sid@number'
import type { Methods as Methods_ac138j } from './api/v1/Store/DownloadCsv'
import type { Methods as Methods_1mpth1k } from './api/v1/Store/Get/_sid@number'
import type { Methods as Methods_lhbmky } from './api/v1/Store/GetAll'
import type { Methods as Methods_umxi3t } from './api/v1/Store/Search'
import type { Methods as Methods_11xsh9b } from './api/v1/Store/Update/_sid@number'
import type { Methods as Methods_nbmemq } from './api/v1/Store/UpdateDisplayOrder'
import type { Methods as Methods_17dy5y8 } from './api/v1/Supplier/Create'
import type { Methods as Methods_vubn0g } from './api/v1/Supplier/Delete/_sid@number'
import type { Methods as Methods_1dlbqn8 } from './api/v1/Supplier/DownloadCsv'
import type { Methods as Methods_e4cw5f } from './api/v1/Supplier/Get/_sid@number'
import type { Methods as Methods_ed6tbc } from './api/v1/Supplier/Search'
import type { Methods as Methods_y03yae } from './api/v1/Supplier/Update/_sid@number'
import type { Methods as Methods_191ai6v } from './api/v1/Supplier/UpdateDisplayOrder'
import type { Methods as Methods_qwc3fm } from './api/v1/Unit/Create'
import type { Methods as Methods_6h96d6 } from './api/v1/Unit/Delete/_sid@number'
import type { Methods as Methods_13g9pq } from './api/v1/Unit/DownloadCsv'
import type { Methods as Methods_xs8bnh } from './api/v1/Unit/Get/_sid@number'
import type { Methods as Methods_1jysz3t } from './api/v1/Unit/GetAll'
import type { Methods as Methods_vgm9s6 } from './api/v1/Unit/Search'
import type { Methods as Methods_1cutk5s } from './api/v1/Unit/Update/_sid@number'
import type { Methods as Methods_a1rcdl } from './api/v1/Unit/UpdateDisplayOrder'
import type { Methods as Methods_w0hie1 } from './api/v1/User/Create'
import type { Methods as Methods_156u69t } from './api/v1/User/Delete/_sid@number'
import type { Methods as Methods_1u5f2z3 } from './api/v1/User/DownloadCsv'
import type { Methods as Methods_14x63ys } from './api/v1/User/Get/_sid@number'
import type { Methods as Methods_n7skut } from './api/v1/User/Search'
import type { Methods as Methods_11p2ybv } from './api/v1/User/Update/_sid@number'
import type { Methods as Methods_1ljzxa2 } from './api/v1/User/UpdatePassword/_sid@number'

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
    api: {
      v1: {
        Auth: {
          Login: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1f3exhz['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1f3exhz['post']['resBody'], BasicHeaders, Methods_1f3exhz['post']['status']>(
                prefix,
                PATH0,
                POST,
                option
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1f3exhz['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1f3exhz['post']['resBody'], BasicHeaders, Methods_1f3exhz['post']['status']>(
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
            post: (option: { body: Methods_1adn4qg['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1adn4qg['post']['resBody'], BasicHeaders, Methods_1adn4qg['post']['status']>(
                prefix,
                PATH1,
                POST,
                option
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1adn4qg['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1adn4qg['post']['resBody'], BasicHeaders, Methods_1adn4qg['post']['status']>(
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
            _sid: (val4: number) => {
              const prefix4 = `${PATH2}/${val4}`

              return {
                delete: (option: { query: Methods_61g8d4['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_61g8d4['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                $delete: (option: { query: Methods_61g8d4['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_61g8d4['delete']['status']>(prefix, prefix4, DELETE, option)
                    .send()
                    .then((r) => r.body),
                $path: (option?: { method: 'delete'; query: Methods_61g8d4['delete']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              }
            },
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH3}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1wyt7kr['get']['resBody'], BasicHeaders, Methods_1wyt7kr['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1wyt7kr['get']['resBody'], BasicHeaders, Methods_1wyt7kr['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          Search: {
            /**
             * @returns OK
             */
            get: (
              option?: { query?: Methods_qu6ea8['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_qu6ea8['get']['resBody'], BasicHeaders, Methods_qu6ea8['get']['status']>(
                prefix,
                PATH4,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?: { query?: Methods_qu6ea8['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_qu6ea8['get']['resBody'], BasicHeaders, Methods_qu6ea8['get']['status']>(
                prefix,
                PATH4,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_qu6ea8['get']['query'] } | undefined) =>
              `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH5}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_dhfala['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_dhfala['put']['resBody'], BasicHeaders, Methods_dhfala['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_dhfala['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_dhfala['put']['resBody'], BasicHeaders, Methods_dhfala['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          UpdateDisplayOrder: {
            put: (option: { body: Methods_1fk94pb['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_1fk94pb['put']['status']>(prefix, PATH6, PUT, option).send(),
            $put: (option: { body: Methods_1fk94pb['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_1fk94pb['put']['status']>(prefix, PATH6, PUT, option)
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
            post: (option: { body: Methods_1ksobz1['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1ksobz1['post']['resBody'], BasicHeaders, Methods_1ksobz1['post']['status']>(
                prefix,
                PATH7,
                POST,
                option
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1ksobz1['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1ksobz1['post']['resBody'], BasicHeaders, Methods_1ksobz1['post']['status']>(
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
            _sid: (val4: number) => {
              const prefix4 = `${PATH8}/${val4}`

              return {
                delete: (option: { query: Methods_y71wmt['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_y71wmt['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                $delete: (option: { query: Methods_y71wmt['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_y71wmt['delete']['status']>(prefix, prefix4, DELETE, option)
                    .send()
                    .then((r) => r.body),
                $path: (option?: { method: 'delete'; query: Methods_y71wmt['delete']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              }
            },
          },
          DownloadCsv: {
            get: (
              option?: { query?: Methods_ac138j['get']['query'] | undefined; config?: T | undefined } | undefined
            ) => fetch<void, BasicHeaders, Methods_ac138j['get']['status']>(prefix, PATH9, GET, option).send(),
            $get: (
              option?: { query?: Methods_ac138j['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<void, BasicHeaders, Methods_ac138j['get']['status']>(prefix, PATH9, GET, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_ac138j['get']['query'] } | undefined) =>
              `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH10}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1mpth1k['get']['resBody'], BasicHeaders, Methods_1mpth1k['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1mpth1k['get']['resBody'], BasicHeaders, Methods_1mpth1k['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          GetAll: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_lhbmky['get']['resBody'], BasicHeaders, Methods_lhbmky['get']['status']>(
                prefix,
                PATH11,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_lhbmky['get']['resBody'], BasicHeaders, Methods_lhbmky['get']['status']>(
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
            get: (
              option?: { query?: Methods_umxi3t['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_umxi3t['get']['resBody'], BasicHeaders, Methods_umxi3t['get']['status']>(
                prefix,
                PATH12,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?: { query?: Methods_umxi3t['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_umxi3t['get']['resBody'], BasicHeaders, Methods_umxi3t['get']['status']>(
                prefix,
                PATH12,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_umxi3t['get']['query'] } | undefined) =>
              `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH13}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_11xsh9b['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_11xsh9b['put']['resBody'], BasicHeaders, Methods_11xsh9b['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_11xsh9b['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_11xsh9b['put']['resBody'], BasicHeaders, Methods_11xsh9b['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          UpdateDisplayOrder: {
            put: (option: { body: Methods_nbmemq['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_nbmemq['put']['status']>(prefix, PATH14, PUT, option).send(),
            $put: (option: { body: Methods_nbmemq['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_nbmemq['put']['status']>(prefix, PATH14, PUT, option)
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
            post: (option: { body: Methods_17dy5y8['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_17dy5y8['post']['resBody'], BasicHeaders, Methods_17dy5y8['post']['status']>(
                prefix,
                PATH15,
                POST,
                option
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_17dy5y8['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_17dy5y8['post']['resBody'], BasicHeaders, Methods_17dy5y8['post']['status']>(
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
            _sid: (val4: number) => {
              const prefix4 = `${PATH16}/${val4}`

              return {
                delete: (option: { query: Methods_vubn0g['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_vubn0g['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                $delete: (option: { query: Methods_vubn0g['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_vubn0g['delete']['status']>(prefix, prefix4, DELETE, option)
                    .send()
                    .then((r) => r.body),
                $path: (option?: { method: 'delete'; query: Methods_vubn0g['delete']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              }
            },
          },
          DownloadCsv: {
            get: (
              option?: { query?: Methods_1dlbqn8['get']['query'] | undefined; config?: T | undefined } | undefined
            ) => fetch<void, BasicHeaders, Methods_1dlbqn8['get']['status']>(prefix, PATH17, GET, option).send(),
            $get: (
              option?: { query?: Methods_1dlbqn8['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<void, BasicHeaders, Methods_1dlbqn8['get']['status']>(prefix, PATH17, GET, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1dlbqn8['get']['query'] } | undefined) =>
              `${prefix}${PATH17}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH18}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_e4cw5f['get']['resBody'], BasicHeaders, Methods_e4cw5f['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_e4cw5f['get']['resBody'], BasicHeaders, Methods_e4cw5f['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          Search: {
            /**
             * @returns OK
             */
            get: (
              option?: { query?: Methods_ed6tbc['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_ed6tbc['get']['resBody'], BasicHeaders, Methods_ed6tbc['get']['status']>(
                prefix,
                PATH19,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?: { query?: Methods_ed6tbc['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_ed6tbc['get']['resBody'], BasicHeaders, Methods_ed6tbc['get']['status']>(
                prefix,
                PATH19,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_ed6tbc['get']['query'] } | undefined) =>
              `${prefix}${PATH19}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH20}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_y03yae['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_y03yae['put']['resBody'], BasicHeaders, Methods_y03yae['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_y03yae['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_y03yae['put']['resBody'], BasicHeaders, Methods_y03yae['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          UpdateDisplayOrder: {
            put: (option: { body: Methods_191ai6v['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_191ai6v['put']['status']>(prefix, PATH21, PUT, option).send(),
            $put: (option: { body: Methods_191ai6v['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_191ai6v['put']['status']>(prefix, PATH21, PUT, option)
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
            post: (option: { body: Methods_qwc3fm['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_qwc3fm['post']['resBody'], BasicHeaders, Methods_qwc3fm['post']['status']>(
                prefix,
                PATH22,
                POST,
                option
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_qwc3fm['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_qwc3fm['post']['resBody'], BasicHeaders, Methods_qwc3fm['post']['status']>(
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
            _sid: (val4: number) => {
              const prefix4 = `${PATH23}/${val4}`

              return {
                delete: (option: { query: Methods_6h96d6['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_6h96d6['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                $delete: (option: { query: Methods_6h96d6['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_6h96d6['delete']['status']>(prefix, prefix4, DELETE, option)
                    .send()
                    .then((r) => r.body),
                $path: (option?: { method: 'delete'; query: Methods_6h96d6['delete']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              }
            },
          },
          DownloadCsv: {
            get: (
              option?: { query?: Methods_13g9pq['get']['query'] | undefined; config?: T | undefined } | undefined
            ) => fetch<void, BasicHeaders, Methods_13g9pq['get']['status']>(prefix, PATH24, GET, option).send(),
            $get: (
              option?: { query?: Methods_13g9pq['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<void, BasicHeaders, Methods_13g9pq['get']['status']>(prefix, PATH24, GET, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_13g9pq['get']['query'] } | undefined) =>
              `${prefix}${PATH24}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH25}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_xs8bnh['get']['resBody'], BasicHeaders, Methods_xs8bnh['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_xs8bnh['get']['resBody'], BasicHeaders, Methods_xs8bnh['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          GetAll: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1jysz3t['get']['resBody'], BasicHeaders, Methods_1jysz3t['get']['status']>(
                prefix,
                PATH26,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1jysz3t['get']['resBody'], BasicHeaders, Methods_1jysz3t['get']['status']>(
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
            get: (
              option?: { query?: Methods_vgm9s6['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_vgm9s6['get']['resBody'], BasicHeaders, Methods_vgm9s6['get']['status']>(
                prefix,
                PATH27,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?: { query?: Methods_vgm9s6['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_vgm9s6['get']['resBody'], BasicHeaders, Methods_vgm9s6['get']['status']>(
                prefix,
                PATH27,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_vgm9s6['get']['query'] } | undefined) =>
              `${prefix}${PATH27}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH28}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_1cutk5s['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_1cutk5s['put']['resBody'], BasicHeaders, Methods_1cutk5s['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_1cutk5s['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_1cutk5s['put']['resBody'], BasicHeaders, Methods_1cutk5s['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          UpdateDisplayOrder: {
            put: (option: { body: Methods_a1rcdl['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_a1rcdl['put']['status']>(prefix, PATH29, PUT, option).send(),
            $put: (option: { body: Methods_a1rcdl['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_a1rcdl['put']['status']>(prefix, PATH29, PUT, option)
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
            post: (option: { body: Methods_w0hie1['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_w0hie1['post']['resBody'], BasicHeaders, Methods_w0hie1['post']['status']>(
                prefix,
                PATH30,
                POST,
                option
              ).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_w0hie1['post']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_w0hie1['post']['resBody'], BasicHeaders, Methods_w0hie1['post']['status']>(
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
            _sid: (val4: number) => {
              const prefix4 = `${PATH31}/${val4}`

              return {
                delete: (option: { query: Methods_156u69t['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_156u69t['delete']['status']>(
                    prefix,
                    prefix4,
                    DELETE,
                    option
                  ).send(),
                $delete: (option: { query: Methods_156u69t['delete']['query']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_156u69t['delete']['status']>(prefix, prefix4, DELETE, option)
                    .send()
                    .then((r) => r.body),
                $path: (option?: { method: 'delete'; query: Methods_156u69t['delete']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              }
            },
          },
          DownloadCsv: {
            get: (
              option?: { query?: Methods_1u5f2z3['get']['query'] | undefined; config?: T | undefined } | undefined
            ) => fetch<void, BasicHeaders, Methods_1u5f2z3['get']['status']>(prefix, PATH32, GET, option).send(),
            $get: (
              option?: { query?: Methods_1u5f2z3['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<void, BasicHeaders, Methods_1u5f2z3['get']['status']>(prefix, PATH32, GET, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1u5f2z3['get']['query'] } | undefined) =>
              `${prefix}${PATH32}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH33}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_14x63ys['get']['resBody'], BasicHeaders, Methods_14x63ys['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_14x63ys['get']['resBody'], BasicHeaders, Methods_14x63ys['get']['status']>(
                    prefix,
                    prefix4,
                    GET,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          Search: {
            /**
             * @returns OK
             */
            get: (
              option?: { query?: Methods_n7skut['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_n7skut['get']['resBody'], BasicHeaders, Methods_n7skut['get']['status']>(
                prefix,
                PATH34,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (
              option?: { query?: Methods_n7skut['get']['query'] | undefined; config?: T | undefined } | undefined
            ) =>
              fetch<Methods_n7skut['get']['resBody'], BasicHeaders, Methods_n7skut['get']['status']>(
                prefix,
                PATH34,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_n7skut['get']['query'] } | undefined) =>
              `${prefix}${PATH34}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH35}/${val4}`

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_11p2ybv['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_11p2ybv['put']['resBody'], BasicHeaders, Methods_11p2ybv['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  ).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_11p2ybv['put']['reqBody']; config?: T | undefined }) =>
                  fetch<Methods_11p2ybv['put']['resBody'], BasicHeaders, Methods_11p2ybv['put']['status']>(
                    prefix,
                    prefix4,
                    PUT,
                    option
                  )
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
          UpdatePassword: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH36}/${val4}`

              return {
                put: (option: { body: Methods_1ljzxa2['put']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_1ljzxa2['put']['status']>(prefix, prefix4, PUT, option).send(),
                $put: (option: { body: Methods_1ljzxa2['put']['reqBody']; config?: T | undefined }) =>
                  fetch<void, BasicHeaders, Methods_1ljzxa2['put']['status']>(prefix, prefix4, PUT, option)
                    .send()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix4}`,
              }
            },
          },
        },
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
