import client from '@kubb/plugin-client/clients/axios'
import type { GetMeQueryResponse } from '../models/GetMe.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetMeUrl() {
  return `https://api.orbizy.app/me` as const
}

/**
 * {@link /me}
 */
export async function getMe(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetMeQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: getGetMeUrl().toString(), ...requestConfig })
  return res.data
}