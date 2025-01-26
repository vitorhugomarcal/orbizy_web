import client from '@kubb/plugin-client/clients/axios'
import type {
  GetItensEstimateByEstimateIdQueryResponse,
  GetItensEstimateByEstimateIdPathParams,
  GetItensEstimateByEstimateId401,
  GetItensEstimateByEstimateId404,
} from "../models/'EstimateItemController/GetItensEstimateByEstimateId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetItensEstimateByEstimateIdUrl(estimateId: GetItensEstimateByEstimateIdPathParams['estimateId']) {
  return `https://api.orbizy.app/itens/estimate/${estimateId}` as const
}

/**
 * @description Get all estimate items by estimate ID
 * {@link /itens/estimate/:estimateId}
 */
export async function getItensEstimateByEstimateId(
  estimateId: GetItensEstimateByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetItensEstimateByEstimateIdQueryResponse,
    ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>,
    unknown
  >({ method: 'GET', url: getGetItensEstimateByEstimateIdUrl(estimateId).toString(), ...requestConfig })
  return res.data
}