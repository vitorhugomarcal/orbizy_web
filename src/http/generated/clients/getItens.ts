import client from '@kubb/plugin-client/clients/axios'
import type { GetItensQueryResponse, GetItens401, GetItens404 } from "../models/'ItensController/GetItens.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetItensUrl() {
  return `https://api.orbizy.app/itens` as const
}

/**
 * @description Get all itens
 * {@link /itens}
 */
export async function getItens(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetItensQueryResponse, ResponseErrorConfig<GetItens401 | GetItens404>, unknown>({
    method: 'GET',
    url: getGetItensUrl().toString(),
    ...requestConfig,
  })
  return res.data
}