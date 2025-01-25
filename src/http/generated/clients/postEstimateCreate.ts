import client from '@kubb/plugin-client/clients/axios'
import type { PostEstimateCreateMutationRequest, PostEstimateCreateMutationResponse, PostEstimateCreatePathParams } from '../models/PostEstimateCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostEstimateCreateUrl(clientId: PostEstimateCreatePathParams['clientId']) {
  return `https://api.orbizy.app/estimate/create` as const
}

/**
 * {@link /estimate/create}
 */
export async function postEstimateCreate(
  clientId: PostEstimateCreatePathParams['clientId'],
  data: PostEstimateCreateMutationRequest,
  config: Partial<RequestConfig<PostEstimateCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostEstimateCreateMutationResponse, ResponseErrorConfig<Error>, PostEstimateCreateMutationRequest>({
    method: 'POST',
    url: getPostEstimateCreateUrl(clientId).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}