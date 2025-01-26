import client from '@kubb/plugin-client/clients/axios'
import type {
  PostUnitCompanyCreateMutationRequest,
  PostUnitCompanyCreateMutationResponse,
  PostUnitCompanyCreate400,
  PostUnitCompanyCreate401,
} from '../models/UnitController/PostUnitCompanyCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostUnitCompanyCreateUrl() {
  return `https://api.orbizy.app/unit/company/create` as const
}

/**
 * @description Create a new custom unit for a company
 * {@link /unit/company/create}
 */
export async function postUnitCompanyCreate(
  data: PostUnitCompanyCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCompanyCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostUnitCompanyCreateMutationResponse,
    ResponseErrorConfig<PostUnitCompanyCreate400 | PostUnitCompanyCreate401>,
    PostUnitCompanyCreateMutationRequest
  >({ method: 'POST', url: getPostUnitCompanyCreateUrl().toString(), data, ...requestConfig })
  return res.data
}