import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_o98sx6 } from './_sid@number';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/v1/Store/Get';
  const GET = 'GET';

  return {
    _sid: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_o98sx6['get']['resBody'], BasicHeaders, Methods_o98sx6['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_o98sx6['get']['resBody'], BasicHeaders, Methods_o98sx6['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${prefix0}`,
      };
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
