import client from '@kubb/plugin-client/clients/axios'
import type {
  PutEstimateUpdateByEstimateIdMutationRequest,
  PutEstimateUpdateByEstimateIdMutationResponse,
  PutEstimateUpdateByEstimateIdPathParams,
  PutEstimateUpdateByEstimateId401,
  PutEstimateUpdateByEstimateId404,
} from "../models/'EstimateController/PutEstimateUpdateByEstimateId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutEstimateUpdateByEstimateIdUrl(estimateId: PutEstimateUpdateByEstimateIdPathParams['estimateId']) {
  return `https://api.orbizy.app/estimate/update/${estimateId}` as const
}

/**
 * @description Update a estimate
 * {@link /estimate/update/:estimateId}
 */
export async function putEstimateUpdateByEstimateId(
  estimateId: PutEstimateUpdateByEstimateIdPathParams['estimateId'],
  data?: PutEstimateUpdateByEstimateIdMutationRequest,
  config: Partial<RequestConfig<PutEstimateUpdateByEstimateIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutEstimateUpdateByEstimateIdMutationResponse,
    ResponseErrorConfig<PutEstimateUpdateByEstimateId401 | PutEstimateUpdateByEstimateId404>,
    PutEstimateUpdateByEstimateIdMutationRequest
  >({ method: 'PUT', url: getPutEstimateUpdateByEstimateIdUrl(estimateId).toString(), data, ...requestConfig })
  return res.data
}