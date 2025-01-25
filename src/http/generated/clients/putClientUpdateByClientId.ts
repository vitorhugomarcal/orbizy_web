import client from '@kubb/plugin-client/clients/axios'
import type {
  PutClientUpdateByClientIdMutationRequest,
  PutClientUpdateByClientIdMutationResponse,
  PutClientUpdateByClientIdPathParams,
} from '../models/PutClientUpdateByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutClientUpdateByClientIdUrl(clientId: PutClientUpdateByClientIdPathParams['clientId']) {
  return `https://api.orbizy.app/client/update/${clientId}` as const
}

/**
 * {@link /client/update/:clientId}
 */
export async function putClientUpdateByClientId(
  clientId: PutClientUpdateByClientIdPathParams['clientId'],
  data?: PutClientUpdateByClientIdMutationRequest,
  config: Partial<RequestConfig<PutClientUpdateByClientIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutClientUpdateByClientIdMutationResponse, ResponseErrorConfig<Error>, PutClientUpdateByClientIdMutationRequest>({
    method: 'PUT',
    url: getPutClientUpdateByClientIdUrl(clientId).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}