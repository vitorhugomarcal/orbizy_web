import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsQueryResponse } from '../models/GetClients.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetClientsUrl() {
  return `https://api.orbizy.app/clients` as const
}

/**
 * {@link /clients}
 */
export async function getClients(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetClientsUrl().toString(),
    ...requestConfig,
  })
  return res.data
}