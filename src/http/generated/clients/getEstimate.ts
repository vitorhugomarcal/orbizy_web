import client from '@kubb/plugin-client/clients/axios'
import type { GetEstimateQueryResponse } from '../models/GetEstimate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetEstimateUrl() {
  return `https://api.orbizy.app/estimate` as const
}

/**
 * {@link /estimate}
 */
export async function getEstimate(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetEstimateQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetEstimateUrl().toString(),
    ...requestConfig,
  })
  return res.data
}