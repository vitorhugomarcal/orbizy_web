import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteClientRemoveByClientIdMutationResponse,
  DeleteClientRemoveByClientIdPathParams,
  DeleteClientRemoveByClientId400,
  DeleteClientRemoveByClientId401,
} from "../models/'ClientsController/DeleteClientRemoveByClientId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteClientRemoveByClientIdUrl(clientId: DeleteClientRemoveByClientIdPathParams['clientId']) {
  return `https://api.orbizy.app/client/remove/${clientId}` as const
}

/**
 * @description Remove a client
 * {@link /client/remove/:clientId}
 */
export async function deleteClientRemoveByClientId(
  clientId: DeleteClientRemoveByClientIdPathParams['clientId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteClientRemoveByClientIdMutationResponse,
    ResponseErrorConfig<DeleteClientRemoveByClientId400 | DeleteClientRemoveByClientId401>,
    unknown
  >({ method: 'DELETE', url: getDeleteClientRemoveByClientIdUrl(clientId).toString(), ...requestConfig })
  return res.data
}