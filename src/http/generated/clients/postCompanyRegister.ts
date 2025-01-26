import client from '@kubb/plugin-client/clients/axios'
import type {
  PostCompanyRegisterMutationRequest,
  PostCompanyRegisterMutationResponse,
  PostCompanyRegister400,
  PostCompanyRegister401,
} from '../models/CompanyController/PostCompanyRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostCompanyRegisterUrl() {
  return `https://api.orbizy.app/company/register` as const
}

/**
 * @description Register a new company (individual or corporate)
 * {@link /company/register}
 */
export async function postCompanyRegister(
  data: PostCompanyRegisterMutationRequest,
  config: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostCompanyRegisterMutationResponse,
    ResponseErrorConfig<PostCompanyRegister400 | PostCompanyRegister401>,
    PostCompanyRegisterMutationRequest
  >({ method: 'POST', url: getPostCompanyRegisterUrl().toString(), data, ...requestConfig })
  return res.data
}