import client from '@kubb/plugin-client/clients/axios'
import type { DeleteItensRemoveByItemIdMutationResponse, DeleteItensRemoveByItemIdPathParams } from '../models/DeleteItensRemoveByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteItensRemoveByItemIdUrl(itemId: DeleteItensRemoveByItemIdPathParams['itemId']) {
  return `https://api.orbizy.app/itens/remove/${itemId}` as const
}

/**
 * {@link /itens/remove/:itemId}
 */
export async function deleteItensRemoveByItemId(
  itemId: DeleteItensRemoveByItemIdPathParams['itemId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteItensRemoveByItemIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteItensRemoveByItemIdUrl(itemId).toString(),
    ...requestConfig,
  })
  return res.data
}