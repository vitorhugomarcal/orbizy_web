import client from '@kubb/plugin-client/clients/axios'
import type {
  GetClientsByClientIdQueryResponse,
  GetClientsByClientIdPathParams,
  GetClientsByClientId400,
  GetClientsByClientId401,
  GetClientsByClientId404,
} from '../models/ClientsController/GetClientsByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetClientsByClientIdUrl(clientId: GetClientsByClientIdPathParams['clientId']) {
  return `https://api.orbizy.app/clients/${clientId}` as const
}

/**
 * @description Retrieve client by ID
 * {@link /clients/:clientId}
 */
export async function getClientsByClientId(
  clientId: GetClientsByClientIdPathParams['clientId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetClientsByClientIdQueryResponse,
    ResponseErrorConfig<GetClientsByClientId400 | GetClientsByClientId401 | GetClientsByClientId404>,
    unknown
  >({ method: 'GET', url: getGetClientsByClientIdUrl(clientId).toString(), ...requestConfig })
  return res.data
}