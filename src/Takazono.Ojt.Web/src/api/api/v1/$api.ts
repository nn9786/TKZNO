import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods_15qj4y2 } from './Auth/Login'
import type { Methods as Methods_1ygrjx3 } from './Customer/Create'
import type { Methods as Methods_12aasmf } from './Customer/Delete/_sid@number'
import type { Methods as Methods_1srqanm } from './Customer/Get/_sid@number'
import type { Methods as Methods_1458qn } from './Customer/Search'
import type { Methods as Methods_19d5xht } from './Customer/Update/_sid@number'
import type { Methods as Methods_16xhe04 } from './Customer/UpdateDisplayOrder'
import type { Methods as Methods_d6z9ns } from './Store/Create'
import type { Methods as Methods_gbbfag } from './Store/Delete/_sid@number'
import type { Methods as Methods_1wttcak } from './Store/DownloadCsv'
import type { Methods as Methods_1hfktu3 } from './Store/Get/_sid@number'
import type { Methods as Methods_1yxv9n } from './Store/GetAll'
import type { Methods as Methods_1ci0mbk } from './Store/Search'
import type { Methods as Methods_jpyqge } from './Store/Update/_sid@number'
import type { Methods as Methods_151ad8f } from './Store/UpdateDisplayOrder'
import type { Methods as Methods_1o4krb } from './Supplier/Create'
import type { Methods as Methods_1lkeg9z } from './Supplier/Delete/_sid@number'
import type { Methods as Methods_178k76d } from './Supplier/DownloadCsv'
import type { Methods as Methods_1l15j3m } from './Supplier/Get/_sid@number'
import type { Methods as Methods_3cmbjz } from './Supplier/Search'
import type { Methods as Methods_1sn9l5d } from './Supplier/Update/_sid@number'
import type { Methods as Methods_1q7l1no } from './Supplier/UpdateDisplayOrder'
import type { Methods as Methods_15c4ks9 } from './Unit/Create'
import type { Methods as Methods_1s4kyox } from './Unit/Delete/_sid@number'
import type { Methods as Methods_xpl5rj } from './Unit/DownloadCsv'
import type { Methods as Methods_otxgtw } from './Unit/Get/_sid@number'
import type { Methods as Methods_4qr3hq } from './Unit/GetAll'
import type { Methods as Methods_1l5ox2t } from './Unit/Search'
import type { Methods as Methods_13ss8tn } from './Unit/Update/_sid@number'
import type { Methods as Methods_5t00pa } from './Unit/UpdateDisplayOrder'
import type { Methods as Methods_ul5xiq } from './User/Create'
import type { Methods as Methods_123e4bu } from './User/Delete/_sid@number'
import type { Methods as Methods_1q873y } from './User/DownloadCsv'
import type { Methods as Methods_1lm5jm5 } from './User/Get/_sid@number'
import type { Methods as Methods_1xgfaja } from './User/Search'
import type { Methods as Methods_1ns4tog } from './User/Update/_sid@number'
import type { Methods as Methods_11wi29l } from './User/UpdatePassword/_sid@number'

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
    Auth: {
      Login: {
        /**
         * @returns OK
         */
        post: (option: { body: Methods_15qj4y2['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_15qj4y2['post']['resBody'], BasicHeaders, Methods_15qj4y2['post']['status']>(
            prefix,
            PATH0,
            POST,
            option
          ).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_15qj4y2['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_15qj4y2['post']['resBody'], BasicHeaders, Methods_15qj4y2['post']['status']>(
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
        post: (option: { body: Methods_1ygrjx3['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_1ygrjx3['post']['resBody'], BasicHeaders, Methods_1ygrjx3['post']['status']>(
            prefix,
            PATH1,
            POST,
            option
          ).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_1ygrjx3['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_1ygrjx3['post']['resBody'], BasicHeaders, Methods_1ygrjx3['post']['status']>(
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
        _sid: (val2: number) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            delete: (option: { query: Methods_12aasmf['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_12aasmf['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option: { query: Methods_12aasmf['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_12aasmf['delete']['status']>(prefix, prefix2, DELETE, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method: 'delete'; query: Methods_12aasmf['delete']['query'] } | undefined) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          }
        },
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH3}/${val2}`

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1srqanm['get']['resBody'], BasicHeaders, Methods_1srqanm['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1srqanm['get']['resBody'], BasicHeaders, Methods_1srqanm['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      Search: {
        /**
         * @returns OK
         */
        get: (option?: { query?: Methods_1458qn['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1458qn['get']['resBody'], BasicHeaders, Methods_1458qn['get']['status']>(
            prefix,
            PATH4,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_1458qn['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1458qn['get']['resBody'], BasicHeaders, Methods_1458qn['get']['status']>(
            prefix,
            PATH4,
            GET,
            option
          )
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1458qn['get']['query'] } | undefined) =>
          `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH5}/${val2}`

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_19d5xht['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_19d5xht['put']['resBody'], BasicHeaders, Methods_19d5xht['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              ).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_19d5xht['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_19d5xht['put']['resBody'], BasicHeaders, Methods_19d5xht['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      UpdateDisplayOrder: {
        put: (option: { body: Methods_16xhe04['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_16xhe04['put']['status']>(prefix, PATH6, PUT, option).send(),
        $put: (option: { body: Methods_16xhe04['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_16xhe04['put']['status']>(prefix, PATH6, PUT, option)
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
        post: (option: { body: Methods_d6z9ns['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_d6z9ns['post']['resBody'], BasicHeaders, Methods_d6z9ns['post']['status']>(
            prefix,
            PATH7,
            POST,
            option
          ).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_d6z9ns['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_d6z9ns['post']['resBody'], BasicHeaders, Methods_d6z9ns['post']['status']>(
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
        _sid: (val2: number) => {
          const prefix2 = `${PATH8}/${val2}`

          return {
            delete: (option: { query: Methods_gbbfag['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_gbbfag['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option: { query: Methods_gbbfag['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_gbbfag['delete']['status']>(prefix, prefix2, DELETE, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method: 'delete'; query: Methods_gbbfag['delete']['query'] } | undefined) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          }
        },
      },
      DownloadCsv: {
        get: (option?: { query?: Methods_1wttcak['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_1wttcak['get']['status']>(prefix, PATH9, GET, option).send(),
        $get: (option?: { query?: Methods_1wttcak['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_1wttcak['get']['status']>(prefix, PATH9, GET, option)
            .send()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1wttcak['get']['query'] } | undefined) =>
          `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH10}/${val2}`

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1hfktu3['get']['resBody'], BasicHeaders, Methods_1hfktu3['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1hfktu3['get']['resBody'], BasicHeaders, Methods_1hfktu3['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      GetAll: {
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1yxv9n['get']['resBody'], BasicHeaders, Methods_1yxv9n['get']['status']>(
            prefix,
            PATH11,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1yxv9n['get']['resBody'], BasicHeaders, Methods_1yxv9n['get']['status']>(
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
        get: (option?: { query?: Methods_1ci0mbk['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1ci0mbk['get']['resBody'], BasicHeaders, Methods_1ci0mbk['get']['status']>(
            prefix,
            PATH12,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_1ci0mbk['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1ci0mbk['get']['resBody'], BasicHeaders, Methods_1ci0mbk['get']['status']>(
            prefix,
            PATH12,
            GET,
            option
          )
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1ci0mbk['get']['query'] } | undefined) =>
          `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH13}/${val2}`

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_jpyqge['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_jpyqge['put']['resBody'], BasicHeaders, Methods_jpyqge['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              ).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_jpyqge['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_jpyqge['put']['resBody'], BasicHeaders, Methods_jpyqge['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      UpdateDisplayOrder: {
        put: (option: { body: Methods_151ad8f['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_151ad8f['put']['status']>(prefix, PATH14, PUT, option).send(),
        $put: (option: { body: Methods_151ad8f['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_151ad8f['put']['status']>(prefix, PATH14, PUT, option)
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
        post: (option: { body: Methods_1o4krb['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_1o4krb['post']['resBody'], BasicHeaders, Methods_1o4krb['post']['status']>(
            prefix,
            PATH15,
            POST,
            option
          ).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_1o4krb['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_1o4krb['post']['resBody'], BasicHeaders, Methods_1o4krb['post']['status']>(
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
        _sid: (val2: number) => {
          const prefix2 = `${PATH16}/${val2}`

          return {
            delete: (option: { query: Methods_1lkeg9z['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_1lkeg9z['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option: { query: Methods_1lkeg9z['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_1lkeg9z['delete']['status']>(prefix, prefix2, DELETE, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method: 'delete'; query: Methods_1lkeg9z['delete']['query'] } | undefined) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          }
        },
      },
      DownloadCsv: {
        get: (option?: { query?: Methods_178k76d['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_178k76d['get']['status']>(prefix, PATH17, GET, option).send(),
        $get: (option?: { query?: Methods_178k76d['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_178k76d['get']['status']>(prefix, PATH17, GET, option)
            .send()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_178k76d['get']['query'] } | undefined) =>
          `${prefix}${PATH17}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH18}/${val2}`

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1l15j3m['get']['resBody'], BasicHeaders, Methods_1l15j3m['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1l15j3m['get']['resBody'], BasicHeaders, Methods_1l15j3m['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      Search: {
        /**
         * @returns OK
         */
        get: (option?: { query?: Methods_3cmbjz['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_3cmbjz['get']['resBody'], BasicHeaders, Methods_3cmbjz['get']['status']>(
            prefix,
            PATH19,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_3cmbjz['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_3cmbjz['get']['resBody'], BasicHeaders, Methods_3cmbjz['get']['status']>(
            prefix,
            PATH19,
            GET,
            option
          )
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_3cmbjz['get']['query'] } | undefined) =>
          `${prefix}${PATH19}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH20}/${val2}`

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_1sn9l5d['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1sn9l5d['put']['resBody'], BasicHeaders, Methods_1sn9l5d['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              ).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_1sn9l5d['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1sn9l5d['put']['resBody'], BasicHeaders, Methods_1sn9l5d['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      UpdateDisplayOrder: {
        put: (option: { body: Methods_1q7l1no['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1q7l1no['put']['status']>(prefix, PATH21, PUT, option).send(),
        $put: (option: { body: Methods_1q7l1no['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1q7l1no['put']['status']>(prefix, PATH21, PUT, option)
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
        post: (option: { body: Methods_15c4ks9['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_15c4ks9['post']['resBody'], BasicHeaders, Methods_15c4ks9['post']['status']>(
            prefix,
            PATH22,
            POST,
            option
          ).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_15c4ks9['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_15c4ks9['post']['resBody'], BasicHeaders, Methods_15c4ks9['post']['status']>(
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
        _sid: (val2: number) => {
          const prefix2 = `${PATH23}/${val2}`

          return {
            delete: (option: { query: Methods_1s4kyox['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_1s4kyox['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option: { query: Methods_1s4kyox['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_1s4kyox['delete']['status']>(prefix, prefix2, DELETE, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method: 'delete'; query: Methods_1s4kyox['delete']['query'] } | undefined) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          }
        },
      },
      DownloadCsv: {
        get: (option?: { query?: Methods_xpl5rj['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_xpl5rj['get']['status']>(prefix, PATH24, GET, option).send(),
        $get: (option?: { query?: Methods_xpl5rj['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_xpl5rj['get']['status']>(prefix, PATH24, GET, option)
            .send()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_xpl5rj['get']['query'] } | undefined) =>
          `${prefix}${PATH24}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH25}/${val2}`

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_otxgtw['get']['resBody'], BasicHeaders, Methods_otxgtw['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_otxgtw['get']['resBody'], BasicHeaders, Methods_otxgtw['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      GetAll: {
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_4qr3hq['get']['resBody'], BasicHeaders, Methods_4qr3hq['get']['status']>(
            prefix,
            PATH26,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_4qr3hq['get']['resBody'], BasicHeaders, Methods_4qr3hq['get']['status']>(
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
        get: (option?: { query?: Methods_1l5ox2t['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1l5ox2t['get']['resBody'], BasicHeaders, Methods_1l5ox2t['get']['status']>(
            prefix,
            PATH27,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_1l5ox2t['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1l5ox2t['get']['resBody'], BasicHeaders, Methods_1l5ox2t['get']['status']>(
            prefix,
            PATH27,
            GET,
            option
          )
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1l5ox2t['get']['query'] } | undefined) =>
          `${prefix}${PATH27}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH28}/${val2}`

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_13ss8tn['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_13ss8tn['put']['resBody'], BasicHeaders, Methods_13ss8tn['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              ).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_13ss8tn['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_13ss8tn['put']['resBody'], BasicHeaders, Methods_13ss8tn['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      UpdateDisplayOrder: {
        put: (option: { body: Methods_5t00pa['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_5t00pa['put']['status']>(prefix, PATH29, PUT, option).send(),
        $put: (option: { body: Methods_5t00pa['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_5t00pa['put']['status']>(prefix, PATH29, PUT, option)
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
        post: (option: { body: Methods_ul5xiq['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_ul5xiq['post']['resBody'], BasicHeaders, Methods_ul5xiq['post']['status']>(
            prefix,
            PATH30,
            POST,
            option
          ).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_ul5xiq['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_ul5xiq['post']['resBody'], BasicHeaders, Methods_ul5xiq['post']['status']>(
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
        _sid: (val2: number) => {
          const prefix2 = `${PATH31}/${val2}`

          return {
            delete: (option: { query: Methods_123e4bu['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_123e4bu['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option: { query: Methods_123e4bu['delete']['query']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_123e4bu['delete']['status']>(prefix, prefix2, DELETE, option)
                .send()
                .then((r) => r.body),
            $path: (option?: { method: 'delete'; query: Methods_123e4bu['delete']['query'] } | undefined) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          }
        },
      },
      DownloadCsv: {
        get: (option?: { query?: Methods_1q873y['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_1q873y['get']['status']>(prefix, PATH32, GET, option).send(),
        $get: (option?: { query?: Methods_1q873y['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_1q873y['get']['status']>(prefix, PATH32, GET, option)
            .send()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1q873y['get']['query'] } | undefined) =>
          `${prefix}${PATH32}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH33}/${val2}`

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1lm5jm5['get']['resBody'], BasicHeaders, Methods_1lm5jm5['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              ).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1lm5jm5['get']['resBody'], BasicHeaders, Methods_1lm5jm5['get']['status']>(
                prefix,
                prefix2,
                GET,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      Search: {
        /**
         * @returns OK
         */
        get: (option?: { query?: Methods_1xgfaja['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1xgfaja['get']['resBody'], BasicHeaders, Methods_1xgfaja['get']['status']>(
            prefix,
            PATH34,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_1xgfaja['get']['query'] | undefined; config?: T | undefined } | undefined) =>
          fetch<Methods_1xgfaja['get']['resBody'], BasicHeaders, Methods_1xgfaja['get']['status']>(
            prefix,
            PATH34,
            GET,
            option
          )
            .json()
            .then((r) => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1xgfaja['get']['query'] } | undefined) =>
          `${prefix}${PATH34}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH35}/${val2}`

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_1ns4tog['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1ns4tog['put']['resBody'], BasicHeaders, Methods_1ns4tog['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              ).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_1ns4tog['put']['reqBody']; config?: T | undefined }) =>
              fetch<Methods_1ns4tog['put']['resBody'], BasicHeaders, Methods_1ns4tog['put']['status']>(
                prefix,
                prefix2,
                PUT,
                option
              )
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
      UpdatePassword: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH36}/${val2}`

          return {
            put: (option: { body: Methods_11wi29l['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_11wi29l['put']['status']>(prefix, prefix2, PUT, option).send(),
            $put: (option: { body: Methods_11wi29l['put']['reqBody']; config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_11wi29l['put']['status']>(prefix, prefix2, PUT, option)
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          }
        },
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
