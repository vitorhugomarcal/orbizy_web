import client from '@kubb/plugin-client/clients/axios'
import type { PostUnitCompanyCreateMutationRequest, PostUnitCompanyCreateMutationResponse } from '../models/PostUnitCompanyCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostUnitCompanyCreateUrl() {
  return `https://api.orbizy.app/unit/company/create` as const
}

/**
 * {@link /unit/company/create}
 */
export async function postUnitCompanyCreate(
  data: PostUnitCompanyCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCompanyCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostUnitCompanyCreateMutationResponse, ResponseErrorConfig<Error>, PostUnitCompanyCreateMutationRequest>({
    method: 'POST',
    url: getPostUnitCompanyCreateUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}