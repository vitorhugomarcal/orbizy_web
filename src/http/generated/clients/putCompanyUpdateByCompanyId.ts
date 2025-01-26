import client from '@kubb/plugin-client/clients/axios'
import type {
  PutCompanyUpdateByCompanyIdMutationRequest,
  PutCompanyUpdateByCompanyIdMutationResponse,
  PutCompanyUpdateByCompanyIdPathParams,
  PutCompanyUpdateByCompanyId400,
  PutCompanyUpdateByCompanyId401,
  PutCompanyUpdateByCompanyId404,
} from "../models/'CompanyController/PutCompanyUpdateByCompanyId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutCompanyUpdateByCompanyIdUrl(companyId: PutCompanyUpdateByCompanyIdPathParams['companyId']) {
  return `https://api.orbizy.app/company/update/${companyId}` as const
}

/**
 * @description Update a company
 * {@link /company/update/:companyId}
 */
export async function putCompanyUpdateByCompanyId(
  companyId: PutCompanyUpdateByCompanyIdPathParams['companyId'],
  data?: PutCompanyUpdateByCompanyIdMutationRequest,
  config: Partial<RequestConfig<PutCompanyUpdateByCompanyIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutCompanyUpdateByCompanyIdMutationResponse,
    ResponseErrorConfig<PutCompanyUpdateByCompanyId400 | PutCompanyUpdateByCompanyId401 | PutCompanyUpdateByCompanyId404>,
    PutCompanyUpdateByCompanyIdMutationRequest
  >({ method: 'PUT', url: getPutCompanyUpdateByCompanyIdUrl(companyId).toString(), data, ...requestConfig })
  return res.data
}