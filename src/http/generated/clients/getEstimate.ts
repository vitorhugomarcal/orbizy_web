import client from '@kubb/plugin-client/clients/axios'
import type { GetEstimateQueryResponse, GetEstimate401, GetEstimate404 } from "../models/'EstimateController/GetEstimate.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetEstimateUrl() {
  return `https://api.orbizy.app/estimate` as const
}

/**
 * @description Get all estimates
 * {@link /estimate}
 */
export async function getEstimate(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetEstimateQueryResponse, ResponseErrorConfig<GetEstimate401 | GetEstimate404>, unknown>({
    method: 'GET',
    url: getGetEstimateUrl().toString(),
    ...requestConfig,
  })
  return res.data
}