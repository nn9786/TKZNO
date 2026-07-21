import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_15qj4y2 } from './Auth/Login';
import type { Methods as Methods_d6z9ns } from './Store/Create';
import type { Methods as Methods_gbbfag } from './Store/Delete/_sid@number';
import type { Methods as Methods_1hfktu3 } from './Store/Get/_sid@number';
import type { Methods as Methods_1ci0mbk } from './Store/Search';
import type { Methods as Methods_jpyqge } from './Store/Update/_sid@number';
import type { Methods as Methods_151ad8f } from './Store/UpdateDisplayOrder';
import type { Methods as Methods_15c4ks9 } from './Unit/Create';
import type { Methods as Methods_1s4kyox } from './Unit/Delete/_sid@number';
import type { Methods as Methods_otxgtw } from './Unit/Get/_sid@number';
import type { Methods as Methods_1l5ox2t } from './Unit/Search';
import type { Methods as Methods_13ss8tn } from './Unit/Update/_sid@number';
import type { Methods as Methods_5t00pa } from './Unit/UpdateDisplayOrder';

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
    Auth: {
      Login: {
        /**
         * @returns OK
         */
        post: (option: { body: Methods_15qj4y2['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_15qj4y2['post']['resBody'], BasicHeaders, Methods_15qj4y2['post']['status']>(prefix, PATH0, POST, option).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_15qj4y2['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_15qj4y2['post']['resBody'], BasicHeaders, Methods_15qj4y2['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
    Store: {
      Create: {
        /**
         * @returns OK
         */
        post: (option: { body: Methods_d6z9ns['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_d6z9ns['post']['resBody'], BasicHeaders, Methods_d6z9ns['post']['status']>(prefix, PATH1, POST, option).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_d6z9ns['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_d6z9ns['post']['resBody'], BasicHeaders, Methods_d6z9ns['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      Delete: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH2}/${val2}`;

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_gbbfag['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_gbbfag['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH3}/${val2}`;

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1hfktu3['get']['resBody'], BasicHeaders, Methods_1hfktu3['get']['status']>(prefix, prefix2, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1hfktu3['get']['resBody'], BasicHeaders, Methods_1hfktu3['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      Search: {
        /**
         * @returns OK
         */
        get: (option?: { query?: Methods_1ci0mbk['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1ci0mbk['get']['resBody'], BasicHeaders, Methods_1ci0mbk['get']['status']>(prefix, PATH4, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_1ci0mbk['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1ci0mbk['get']['resBody'], BasicHeaders, Methods_1ci0mbk['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1ci0mbk['get']['query'] } | undefined) =>
          `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH5}/${val2}`;

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_jpyqge['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_jpyqge['put']['resBody'], BasicHeaders, Methods_jpyqge['put']['status']>(prefix, prefix2, PUT, option).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_jpyqge['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_jpyqge['put']['resBody'], BasicHeaders, Methods_jpyqge['put']['status']>(prefix, prefix2, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      UpdateDisplayOrder: {
        put: (option: { body: Methods_151ad8f['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_151ad8f['put']['status']>(prefix, PATH6, PUT, option).send(),
        $put: (option: { body: Methods_151ad8f['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_151ad8f['put']['status']>(prefix, PATH6, PUT, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH6}`,
      },
    },
    Unit: {
      Create: {
        /**
         * @returns OK
         */
        post: (option: { body: Methods_15c4ks9['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_15c4ks9['post']['resBody'], BasicHeaders, Methods_15c4ks9['post']['status']>(prefix, PATH7, POST, option).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_15c4ks9['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_15c4ks9['post']['resBody'], BasicHeaders, Methods_15c4ks9['post']['status']>(prefix, PATH7, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH7}`,
      },
      Delete: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH8}/${val2}`;

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1s4kyox['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1s4kyox['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      Get: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH9}/${val2}`;

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_otxgtw['get']['resBody'], BasicHeaders, Methods_otxgtw['get']['status']>(prefix, prefix2, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_otxgtw['get']['resBody'], BasicHeaders, Methods_otxgtw['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      Search: {
        /**
         * @returns OK
         */
        get: (option?: { query?: Methods_1l5ox2t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1l5ox2t['get']['resBody'], BasicHeaders, Methods_1l5ox2t['get']['status']>(prefix, PATH10, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { query?: Methods_1l5ox2t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1l5ox2t['get']['resBody'], BasicHeaders, Methods_1l5ox2t['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1l5ox2t['get']['query'] } | undefined) =>
          `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      Update: {
        _sid: (val2: number) => {
          const prefix2 = `${PATH11}/${val2}`;

          return {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_13ss8tn['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_13ss8tn['put']['resBody'], BasicHeaders, Methods_13ss8tn['put']['status']>(prefix, prefix2, PUT, option).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_13ss8tn['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_13ss8tn['put']['resBody'], BasicHeaders, Methods_13ss8tn['put']['status']>(prefix, prefix2, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      UpdateDisplayOrder: {
        put: (option: { body: Methods_5t00pa['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_5t00pa['put']['status']>(prefix, PATH12, PUT, option).send(),
        $put: (option: { body: Methods_5t00pa['put']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_5t00pa['put']['status']>(prefix, PATH12, PUT, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH12}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
