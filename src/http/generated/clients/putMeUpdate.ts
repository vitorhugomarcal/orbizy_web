import client from '@kubb/plugin-client/clients/axios'
import type { PutMeUpdateMutationRequest, PutMeUpdateMutationResponse } from '../models/PutMeUpdate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutMeUpdateUrl() {
  return `https://api.orbizy.app/me/update` as const
}

/**
 * {@link /me/update}
 */
export async function putMeUpdate(
  data?: PutMeUpdateMutationRequest,
  config: Partial<RequestConfig<PutMeUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutMeUpdateMutationResponse, ResponseErrorConfig<Error>, PutMeUpdateMutationRequest>({
    method: 'PUT',
    url: getPutMeUpdateUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}