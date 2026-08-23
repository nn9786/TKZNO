import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods_o98sx6 } from './_sid@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/Store/Update'
  const PUT = 'PUT'

  return {
    _sid: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * @returns OK
         */
        put: (option: { body: Methods_o98sx6['put']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_o98sx6['put']['resBody'], BasicHeaders, Methods_o98sx6['put']['status']>(
            prefix,
            prefix0,
            PUT,
            option
          ).json(),
        /**
         * @returns OK
         */
        $put: (option: { body: Methods_o98sx6['put']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_o98sx6['put']['resBody'], BasicHeaders, Methods_o98sx6['put']['status']>(
            prefix,
            prefix0,
            PUT,
            option
          )
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
