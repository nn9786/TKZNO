import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1yn3668 } from './v1/Auth/Login';
import type { Methods as Methods_xizo8u } from './v1/Store/Create';
import type { Methods as Methods_1fkfriu } from './v1/Store/Delete/_sid@number';
import type { Methods as Methods_njw8p5 } from './v1/Store/Get/_sid@number';
import type { Methods as Methods_ghm2iq } from './v1/Store/Search';
import type { Methods as Methods_ytdsl8 } from './v1/Store/Update/_sid@number';
import type { Methods as Methods_8lup79 } from './v1/Store/UpdateDisplayOrder';
import type { Methods as Methods_ilut5v } from './v1/Unit/Create';
import type { Methods as Methods_co3tc3 } from './v1/Unit/Delete/_sid@number';
import type { Methods as Methods_zrp26m } from './v1/Unit/Get/_sid@number';
import type { Methods as Methods_1p703ez } from './v1/Unit/Search';
import type { Methods as Methods_yhqbql } from './v1/Unit/Update/_sid@number';
import type { Methods as Methods_1g3hoeo } from './v1/Unit/UpdateDisplayOrder';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/v1/Auth/Login';
  const PATH1 = '/api/v1/Store/Create';
  const PATH2 = '/api/v1/Store/Delete';
  const PATH3 = '/api/v1/Store/Get';
  const PATH4 = '/api/v1/Store/Search';
  const PATH5 = '/api/v1/Store/Update';
  const PATH6 = '/api/v1/Store/UpdateDisplayOrder';
  const PATH7 = '/api/v1/Unit/Create';
  const PATH8 = '/api/v1/Unit/Delete';
  const PATH9 = '/api/v1/Unit/Get';
  const PATH10 = '/api/v1/Unit/Search';
  const PATH11 = '/api/v1/Unit/Update';
  const PATH12 = '/api/v1/Unit/UpdateDisplayOrder';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    v1: {
      Auth: {
        Login: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_1yn3668['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1yn3668['post']['resBody'], BasicHeaders, Methods_1yn3668['post']['status']>(prefix, PATH0, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_1yn3668['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1yn3668['post']['resBody'], BasicHeaders, Methods_1yn3668['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`,
        },
      },
      Store: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_xizo8u['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xizo8u['post']['resBody'], BasicHeaders, Methods_xizo8u['post']['status']>(prefix, PATH1, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_xizo8u['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xizo8u['post']['resBody'], BasicHeaders, Methods_xizo8u['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH1}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH2}/${val3}`;

            return {
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods_1fkfriu['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods_1fkfriu['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH3}/${val3}`;

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_njw8p5['get']['resBody'], BasicHeaders, Methods_njw8p5['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_njw8p5['get']['resBody'], BasicHeaders, Methods_njw8p5['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_ghm2iq['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_ghm2iq['get']['resBody'], BasicHeaders, Methods_ghm2iq['get']['status']>(prefix, PATH4, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_ghm2iq['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_ghm2iq['get']['resBody'], BasicHeaders, Methods_ghm2iq['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_ghm2iq['get']['query'] } | undefined) =>
            `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH5}/${val3}`;

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_ytdsl8['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_ytdsl8['put']['resBody'], BasicHeaders, Methods_ytdsl8['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_ytdsl8['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_ytdsl8['put']['resBody'], BasicHeaders, Methods_ytdsl8['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
        },
        UpdateDisplayOrder: {
          put: (option: { body: Methods_8lup79['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_8lup79['put']['status']>(prefix, PATH6, PUT, option).send(),
          $put: (option: { body: Methods_8lup79['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_8lup79['put']['status']>(prefix, PATH6, PUT, option).send().then(r => r.body),
          $path: () => `${prefix}${PATH6}`,
        },
      },
      Unit: {
        Create: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_ilut5v['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_ilut5v['post']['resBody'], BasicHeaders, Methods_ilut5v['post']['status']>(prefix, PATH7, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_ilut5v['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_ilut5v['post']['resBody'], BasicHeaders, Methods_ilut5v['post']['status']>(prefix, PATH7, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH7}`,
        },
        Delete: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH8}/${val3}`;

            return {
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods_co3tc3['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods_co3tc3['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
        },
        Get: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH9}/${val3}`;

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_zrp26m['get']['resBody'], BasicHeaders, Methods_zrp26m['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_zrp26m['get']['resBody'], BasicHeaders, Methods_zrp26m['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
        },
        Search: {
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_1p703ez['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1p703ez['get']['resBody'], BasicHeaders, Methods_1p703ez['get']['status']>(prefix, PATH10, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_1p703ez['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1p703ez['get']['resBody'], BasicHeaders, Methods_1p703ez['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1p703ez['get']['query'] } | undefined) =>
            `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        Update: {
          _sid: (val3: number) => {
            const prefix3 = `${PATH11}/${val3}`;

            return {
              /**
               * @returns OK
               */
              put: (option: { body: Methods_yhqbql['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_yhqbql['put']['resBody'], BasicHeaders, Methods_yhqbql['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_yhqbql['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_yhqbql['put']['resBody'], BasicHeaders, Methods_yhqbql['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
        },
        UpdateDisplayOrder: {
          put: (option: { body: Methods_1g3hoeo['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1g3hoeo['put']['status']>(prefix, PATH12, PUT, option).send(),
          $put: (option: { body: Methods_1g3hoeo['put']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods_1g3hoeo['put']['status']>(prefix, PATH12, PUT, option).send().then(r => r.body),
          $path: () => `${prefix}${PATH12}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
