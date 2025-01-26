import client from '@kubb/plugin-client/clients/axios'
import type { GetSignoutQueryResponse } from '../models/AuthController/GetSignout.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetSignoutUrl() {
  return `https://api.orbizy.app/signout` as const
}

/**
 * @description Desconecta o usuário
 * {@link /signout}
 */
export async function getSignout(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSignoutQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetSignoutUrl().toString(),
    ...requestConfig,
  })
  return res.data
}