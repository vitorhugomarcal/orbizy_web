import client from '@kubb/plugin-client/clients/axios'
import type {
  GetEstimateByEstimateIdQueryResponse,
  GetEstimateByEstimateIdPathParams,
  GetEstimateByEstimateId401,
  GetEstimateByEstimateId404,
} from '../models/EstimateController/GetEstimateByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetEstimateByEstimateIdUrl(estimateId: GetEstimateByEstimateIdPathParams['estimateId']) {
  return `https://api.orbizy.app/estimate/${estimateId}` as const
}

/**
 * @description Get a estimate by ID
 * {@link /estimate/:estimateId}
 */
export async function getEstimateByEstimateId(
  estimateId: GetEstimateByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetEstimateByEstimateIdQueryResponse, ResponseErrorConfig<GetEstimateByEstimateId401 | GetEstimateByEstimateId404>, unknown>({
    method: 'GET',
    url: getGetEstimateByEstimateIdUrl(estimateId).toString(),
    ...requestConfig,
  })
  return res.data
}