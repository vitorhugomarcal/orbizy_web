import client from '@kubb/plugin-client/clients/axios'
import type {
  GetItensByItemIdQueryResponse,
  GetItensByItemIdPathParams,
  GetItensByItemId401,
  GetItensByItemId404,
} from '../models/ItensController/GetItensByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetItensByItemIdUrl(itemId: GetItensByItemIdPathParams['itemId']) {
  return `https://api.orbizy.app/itens/${itemId}` as const
}

/**
 * @description Get a item by id
 * {@link /itens/:itemId}
 */
export async function getItensByItemId(itemId: GetItensByItemIdPathParams['itemId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetItensByItemIdQueryResponse, ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>, unknown>({
    method: 'GET',
    url: getGetItensByItemIdUrl(itemId).toString(),
    ...requestConfig,
  })
  return res.data
}