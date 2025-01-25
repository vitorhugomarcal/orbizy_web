import client from '@kubb/plugin-client/clients/axios'
import type { PostMeCreateMutationRequest, PostMeCreateMutationResponse } from '../models/PostMeCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostMeCreateUrl() {
  return `https://api.orbizy.app/me/create` as const
}

/**
 * {@link /me/create}
 */
export async function postMeCreate(
  data: PostMeCreateMutationRequest,
  config: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostMeCreateMutationResponse, ResponseErrorConfig<Error>, PostMeCreateMutationRequest>({
    method: 'POST',
    url: getPostMeCreateUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}