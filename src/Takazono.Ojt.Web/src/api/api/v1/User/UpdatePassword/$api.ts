import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods_o98sx6 } from './_sid@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/v1/User/UpdatePassword'
  const PUT = 'PUT'

  return {
    _sid: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        put: (option: { body: Methods_o98sx6['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_o98sx6['put']['status']>(prefix, prefix0, PUT, option).send(),
        $put: (option: { body: Methods_o98sx6['put']['reqBody']; config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_o98sx6['put']['status']>(prefix, prefix0, PUT, option)
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      }
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
