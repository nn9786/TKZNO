import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods_17f7zyn } from './Login'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/Auth/Login'
  const POST = 'POST'

  return {
    Login: {
      /**
       * @returns OK
       */
      post: (option: { body: Methods_17f7zyn['post']['reqBody']; config?: T | undefined }) =>
        fetch<Methods_17f7zyn['post']['resBody'], BasicHeaders, Methods_17f7zyn['post']['status']>(
          prefix,
          PATH0,
          POST,
          option
        ).json(),
      /**
       * @returns OK
       */
      $post: (option: { body: Methods_17f7zyn['post']['reqBody']; config?: T | undefined }) =>
        fetch<Methods_17f7zyn['post']['resBody'], BasicHeaders, Methods_17f7zyn['post']['status']>(
          prefix,
          PATH0,
          POST,
          option
        )
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
