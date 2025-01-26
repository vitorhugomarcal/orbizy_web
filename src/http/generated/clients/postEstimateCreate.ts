import client from '@kubb/plugin-client/clients/axios'
import type {
  PostEstimateCreateMutationRequest,
  PostEstimateCreateMutationResponse,
  PostEstimateCreatePathParams,
  PostEstimateCreate401,
  PostEstimateCreate404,
} from "../models/'EstimateController/PostEstimateCreate.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostEstimateCreateUrl(clientId: PostEstimateCreatePathParams['clientId']) {
  return `https://api.orbizy.app/estimate/create` as const
}

/**
 * @description Create a new estimate
 * {@link /estimate/create}
 */
export async function postEstimateCreate(
  clientId: PostEstimateCreatePathParams['clientId'],
  data: PostEstimateCreateMutationRequest,
  config: Partial<RequestConfig<PostEstimateCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostEstimateCreateMutationResponse,
    ResponseErrorConfig<PostEstimateCreate401 | PostEstimateCreate404>,
    PostEstimateCreateMutationRequest
  >({ method: 'POST', url: getPostEstimateCreateUrl(clientId).toString(), data, ...requestConfig })
  return res.data
}