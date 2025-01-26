import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteItensEstimateRemoveByItemIdMutationResponse,
  DeleteItensEstimateRemoveByItemIdPathParams,
  DeleteItensEstimateRemoveByItemId401,
  DeleteItensEstimateRemoveByItemId404,
} from "../models/'EstimateItemController/DeleteItensEstimateRemoveByItemId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteItensEstimateRemoveByItemIdUrl(itemId: DeleteItensEstimateRemoveByItemIdPathParams['itemId']) {
  return `https://api.orbizy.app/itens/estimate/remove/${itemId}` as const
}

/**
 * @description Remove an estimate item
 * {@link /itens/estimate/remove/:itemId}
 */
export async function deleteItensEstimateRemoveByItemId(
  itemId: DeleteItensEstimateRemoveByItemIdPathParams['itemId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteItensEstimateRemoveByItemIdMutationResponse,
    ResponseErrorConfig<DeleteItensEstimateRemoveByItemId401 | DeleteItensEstimateRemoveByItemId404>,
    unknown
  >({ method: 'DELETE', url: getDeleteItensEstimateRemoveByItemIdUrl(itemId).toString(), ...requestConfig })
  return res.data
}