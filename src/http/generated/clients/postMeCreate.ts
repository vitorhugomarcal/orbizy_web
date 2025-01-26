import client from '@kubb/plugin-client/clients/axios'
import type { PostMeCreateMutationRequest, PostMeCreateMutationResponse, PostMeCreate400 } from '../models/UserController/PostMeCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostMeCreateUrl() {
  return `https://api.orbizy.app/me/create` as const
}

/**
 * @description Create a new user
 * {@link /me/create}
 */
export async function postMeCreate(
  data: PostMeCreateMutationRequest,
  config: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostMeCreateMutationResponse, ResponseErrorConfig<PostMeCreate400>, PostMeCreateMutationRequest>({
    method: 'POST',
    url: getPostMeCreateUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}