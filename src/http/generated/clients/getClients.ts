import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsQueryResponse, GetClients401, GetClients404 } from "../models/'ClientsController/GetClients.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetClientsUrl() {
  return `https://api.orbizy.app/clients` as const
}

/**
 * @description Retrieve all clients
 * {@link /clients}
 */
export async function getClients(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsQueryResponse, ResponseErrorConfig<GetClients401 | GetClients404>, unknown>({
    method: 'GET',
    url: getGetClientsUrl().toString(),
    ...requestConfig,
  })
  return res.data
}