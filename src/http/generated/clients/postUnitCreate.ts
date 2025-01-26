import client from '@kubb/plugin-client/clients/axios'
import type {
  PostUnitCreateMutationRequest,
  PostUnitCreateMutationResponse,
  PostUnitCreate400,
  PostUnitCreate401,
} from '../models/UnitController/PostUnitCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostUnitCreateUrl() {
  return `https://api.orbizy.app/unit/create` as const
}

/**
 * @description Create a new world unit
 * {@link /unit/create}
 */
export async function postUnitCreate(
  data: PostUnitCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostUnitCreateMutationResponse, ResponseErrorConfig<PostUnitCreate400 | PostUnitCreate401>, PostUnitCreateMutationRequest>({
    method: 'POST',
    url: getPostUnitCreateUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}