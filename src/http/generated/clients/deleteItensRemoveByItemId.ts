import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteItensRemoveByItemIdMutationResponse,
  DeleteItensRemoveByItemIdPathParams,
  DeleteItensRemoveByItemId401,
  DeleteItensRemoveByItemId404,
} from '../models/ItensController/DeleteItensRemoveByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteItensRemoveByItemIdUrl(itemId: DeleteItensRemoveByItemIdPathParams['itemId']) {
  return `https://api.orbizy.app/itens/remove/${itemId}` as const
}

/**
 * @description Remove a item
 * {@link /itens/remove/:itemId}
 */
export async function deleteItensRemoveByItemId(
  itemId: DeleteItensRemoveByItemIdPathParams['itemId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteItensRemoveByItemIdMutationResponse,
    ResponseErrorConfig<DeleteItensRemoveByItemId401 | DeleteItensRemoveByItemId404>,
    unknown
  >({ method: 'DELETE', url: getDeleteItensRemoveByItemIdUrl(itemId).toString(), ...requestConfig })
  return res.data
}