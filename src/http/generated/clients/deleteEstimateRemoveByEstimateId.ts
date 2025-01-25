import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteEstimateRemoveByEstimateIdMutationResponse,
  DeleteEstimateRemoveByEstimateIdPathParams,
} from '../models/DeleteEstimateRemoveByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteEstimateRemoveByEstimateIdUrl(estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId']) {
  return `https://api.orbizy.app/estimate/remove/${estimateId}` as const
}

/**
 * {@link /estimate/remove/:estimateId}
 */
export async function deleteEstimateRemoveByEstimateId(
  estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteEstimateRemoveByEstimateIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteEstimateRemoveByEstimateIdUrl(estimateId).toString(),
    ...requestConfig,
  })
  return res.data
}