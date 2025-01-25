import client from '@kubb/plugin-client/clients/axios'
import type { PostCompanyRegisterMutationRequest, PostCompanyRegisterMutationResponse } from '../models/PostCompanyRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostCompanyRegisterUrl() {
  return `https://api.orbizy.app/company/register` as const
}

/**
 * {@link /company/register}
 */
export async function postCompanyRegister(
  data: PostCompanyRegisterMutationRequest,
  config: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostCompanyRegisterMutationResponse, ResponseErrorConfig<Error>, PostCompanyRegisterMutationRequest>({
    method: 'POST',
    url: getPostCompanyRegisterUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}