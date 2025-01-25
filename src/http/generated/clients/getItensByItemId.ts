import client from '@kubb/plugin-client/clients/axios'
import type { GetItensByItemIdQueryResponse, GetItensByItemIdPathParams } from '../models/GetItensByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetItensByItemIdUrl(itemId: GetItensByItemIdPathParams['itemId']) {
  return `https://api.orbizy.app/itens/${itemId}` as const
}

/**
 * {@link /itens/:itemId}
 */
export async function getItensByItemId(itemId: GetItensByItemIdPathParams['itemId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetItensByItemIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetItensByItemIdUrl(itemId).toString(),
    ...requestConfig,
  })
  return res.data
}