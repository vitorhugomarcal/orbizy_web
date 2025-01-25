import client from '@kubb/plugin-client/clients/axios'
import type { DeleteClientRemoveByClientIdMutationResponse, DeleteClientRemoveByClientIdPathParams } from '../models/DeleteClientRemoveByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteClientRemoveByClientIdUrl(clientId: DeleteClientRemoveByClientIdPathParams['clientId']) {
  return `https://api.orbizy.app/client/remove/${clientId}` as const
}

/**
 * {@link /client/remove/:clientId}
 */
export async function deleteClientRemoveByClientId(
  clientId: DeleteClientRemoveByClientIdPathParams['clientId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteClientRemoveByClientIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteClientRemoveByClientIdUrl(clientId).toString(),
    ...requestConfig,
  })
  return res.data
}