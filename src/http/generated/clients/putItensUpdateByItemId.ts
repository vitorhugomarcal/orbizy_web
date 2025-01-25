import client from '@kubb/plugin-client/clients/axios'
import type {
  PutItensUpdateByItemIdMutationRequest,
  PutItensUpdateByItemIdMutationResponse,
  PutItensUpdateByItemIdPathParams,
} from '../models/PutItensUpdateByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutItensUpdateByItemIdUrl(itemId: PutItensUpdateByItemIdPathParams['itemId']) {
  return `https://api.orbizy.app/itens/update/${itemId}` as const
}

/**
 * {@link /itens/update/:itemId}
 */
export async function putItensUpdateByItemId(
  itemId: PutItensUpdateByItemIdPathParams['itemId'],
  data?: PutItensUpdateByItemIdMutationRequest,
  config: Partial<RequestConfig<PutItensUpdateByItemIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutItensUpdateByItemIdMutationResponse, ResponseErrorConfig<Error>, PutItensUpdateByItemIdMutationRequest>({
    method: 'PUT',
    url: getPutItensUpdateByItemIdUrl(itemId).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}