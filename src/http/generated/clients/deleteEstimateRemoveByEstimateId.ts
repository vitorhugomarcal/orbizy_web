import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteEstimateRemoveByEstimateIdMutationResponse,
  DeleteEstimateRemoveByEstimateIdPathParams,
  DeleteEstimateRemoveByEstimateId401,
  DeleteEstimateRemoveByEstimateId404,
} from "../models/'EstimateController/DeleteEstimateRemoveByEstimateId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteEstimateRemoveByEstimateIdUrl(estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId']) {
  return `https://api.orbizy.app/estimate/remove/${estimateId}` as const
}

/**
 * @description Remove a estimate
 * {@link /estimate/remove/:estimateId}
 */
export async function deleteEstimateRemoveByEstimateId(
  estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteEstimateRemoveByEstimateIdMutationResponse,
    ResponseErrorConfig<DeleteEstimateRemoveByEstimateId401 | DeleteEstimateRemoveByEstimateId404>,
    unknown
  >({ method: 'DELETE', url: getDeleteEstimateRemoveByEstimateIdUrl(estimateId).toString(), ...requestConfig })
  return res.data
}