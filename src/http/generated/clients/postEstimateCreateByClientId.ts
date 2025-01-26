import client from '@kubb/plugin-client/clients/axios'
import type {
  PostEstimateCreateByClientIdMutationRequest,
  PostEstimateCreateByClientIdMutationResponse,
  PostEstimateCreateByClientIdPathParams,
  PostEstimateCreateByClientId401,
  PostEstimateCreateByClientId404,
} from '../models/EstimateController/PostEstimateCreateByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostEstimateCreateByClientIdUrl(clientId: PostEstimateCreateByClientIdPathParams['clientId']) {
  return `https://api.orbizy.app/estimate/create/${clientId}` as const
}

/**
 * @description Create a new estimate
 * {@link /estimate/create/:clientId}
 */
export async function postEstimateCreateByClientId(
  clientId: PostEstimateCreateByClientIdPathParams['clientId'],
  data: PostEstimateCreateByClientIdMutationRequest,
  config: Partial<RequestConfig<PostEstimateCreateByClientIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostEstimateCreateByClientIdMutationResponse,
    ResponseErrorConfig<PostEstimateCreateByClientId401 | PostEstimateCreateByClientId404>,
    PostEstimateCreateByClientIdMutationRequest
  >({ method: 'POST', url: getPostEstimateCreateByClientIdUrl(clientId).toString(), data, ...requestConfig })
  return res.data
}