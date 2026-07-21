import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1f3exhz } from './api/v1/Auth/Login';
import type { Methods as Methods_1ksobz1 } from './api/v1/Store/Create';
import type { Methods as Methods_y71wmt } from './api/v1/Store/Delete/_sid@number';
import type { Methods as Methods_1mpth1k } from './api/v1/Store/Get/_sid@number';
import type { Methods as Methods_umxi3t } from './api/v1/Store/Search';
import type { Methods as Methods_11xsh9b } from './api/v1/Store/Update/_sid@number';
import type { Methods as Methods_nbmemq } from './api/v1/Store/UpdateDisplayOrder';
import type { Methods as Methods_qwc3fm } from './api/v1/Unit/Create';
import type { Methods as Methods_6h96d6 } from './api/v1/Unit/Delete/_sid@number';
import type { Methods as Methods_xs8bnh } from './api/v1/Unit/Get/_sid@number';
import type { Methods as Methods_vgm9s6 } from './api/v1/Unit/Search';
import type { Methods as Methods_1cutk5s } from './api/v1/Unit/Update/_sid@number';
import type { Methods as Methods_a1rcdl } from './api/v1/Unit/UpdateDisplayOrder';

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
    api: {
      v1: {
        Auth: {
          Login: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1f3exhz['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1f3exhz['post']['resBody'], BasicHeaders, Methods_1f3exhz['post']['status']>(prefix, PATH0, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1f3exhz['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1f3exhz['post']['resBody'], BasicHeaders, Methods_1f3exhz['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH0}`,
          },
        },
        Store: {
          Create: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1ksobz1['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1ksobz1['post']['resBody'], BasicHeaders, Methods_1ksobz1['post']['status']>(prefix, PATH1, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1ksobz1['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1ksobz1['post']['resBody'], BasicHeaders, Methods_1ksobz1['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH1}`,
          },
          Delete: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH2}/${val4}`;

              return {
                delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods_y71wmt['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                $delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods_y71wmt['delete']['status']>(prefix, prefix4, DELETE, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH3}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1mpth1k['get']['resBody'], BasicHeaders, Methods_1mpth1k['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1mpth1k['get']['resBody'], BasicHeaders, Methods_1mpth1k['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          Search: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_umxi3t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_umxi3t['get']['resBody'], BasicHeaders, Methods_umxi3t['get']['status']>(prefix, PATH4, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_umxi3t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_umxi3t['get']['resBody'], BasicHeaders, Methods_umxi3t['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_umxi3t['get']['query'] } | undefined) =>
              `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH5}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_11xsh9b['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_11xsh9b['put']['resBody'], BasicHeaders, Methods_11xsh9b['put']['status']>(prefix, prefix4, PUT, option).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_11xsh9b['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_11xsh9b['put']['resBody'], BasicHeaders, Methods_11xsh9b['put']['status']>(prefix, prefix4, PUT, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          UpdateDisplayOrder: {
            put: (option: { body: Methods_nbmemq['put']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_nbmemq['put']['status']>(prefix, PATH6, PUT, option).send(),
            $put: (option: { body: Methods_nbmemq['put']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_nbmemq['put']['status']>(prefix, PATH6, PUT, option).send().then(r => r.body),
            $path: () => `${prefix}${PATH6}`,
          },
        },
        Unit: {
          Create: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_qwc3fm['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_qwc3fm['post']['resBody'], BasicHeaders, Methods_qwc3fm['post']['status']>(prefix, PATH7, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_qwc3fm['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_qwc3fm['post']['resBody'], BasicHeaders, Methods_qwc3fm['post']['status']>(prefix, PATH7, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH7}`,
          },
          Delete: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH8}/${val4}`;

              return {
                delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods_6h96d6['delete']['status']>(prefix, prefix4, DELETE, option).send(),
                $delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<void, BasicHeaders, Methods_6h96d6['delete']['status']>(prefix, prefix4, DELETE, option).send().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          Get: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH9}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_xs8bnh['get']['resBody'], BasicHeaders, Methods_xs8bnh['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_xs8bnh['get']['resBody'], BasicHeaders, Methods_xs8bnh['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          Search: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_vgm9s6['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_vgm9s6['get']['resBody'], BasicHeaders, Methods_vgm9s6['get']['status']>(prefix, PATH10, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_vgm9s6['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_vgm9s6['get']['resBody'], BasicHeaders, Methods_vgm9s6['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_vgm9s6['get']['query'] } | undefined) =>
              `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          Update: {
            _sid: (val4: number) => {
              const prefix4 = `${PATH11}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_1cutk5s['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1cutk5s['put']['resBody'], BasicHeaders, Methods_1cutk5s['put']['status']>(prefix, prefix4, PUT, option).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_1cutk5s['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1cutk5s['put']['resBody'], BasicHeaders, Methods_1cutk5s['put']['status']>(prefix, prefix4, PUT, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          UpdateDisplayOrder: {
            put: (option: { body: Methods_a1rcdl['put']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_a1rcdl['put']['status']>(prefix, PATH12, PUT, option).send(),
            $put: (option: { body: Methods_a1rcdl['put']['reqBody'], config?: T | undefined }) =>
              fetch<void, BasicHeaders, Methods_a1rcdl['put']['status']>(prefix, PATH12, PUT, option).send().then(r => r.body),
            $path: () => `${prefix}${PATH12}`,
          },
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
