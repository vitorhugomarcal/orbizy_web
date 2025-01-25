import client from '@kubb/plugin-client/clients/axios'
import type { PostUnitCreateMutationRequest, PostUnitCreateMutationResponse } from '../models/PostUnitCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostUnitCreateUrl() {
  return `https://api.orbizy.app/unit/create` as const
}

/**
 * {@link /unit/create}
 */
export async function postUnitCreate(
  data: PostUnitCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostUnitCreateMutationResponse, ResponseErrorConfig<Error>, PostUnitCreateMutationRequest>({
    method: 'POST',
    url: getPostUnitCreateUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}