import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteCompanyRemoveByCompanyIdMutationResponse,
  DeleteCompanyRemoveByCompanyIdPathParams,
  DeleteCompanyRemoveByCompanyId400,
  DeleteCompanyRemoveByCompanyId401,
} from '../models/CompanyController/DeleteCompanyRemoveByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteCompanyRemoveByCompanyIdUrl(companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId']) {
  return `https://api.orbizy.app/company/remove/${companyId}` as const
}

/**
 * @description Remove a company
 * {@link /company/remove/:companyId}
 */
export async function deleteCompanyRemoveByCompanyId(
  companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteCompanyRemoveByCompanyIdMutationResponse,
    ResponseErrorConfig<DeleteCompanyRemoveByCompanyId400 | DeleteCompanyRemoveByCompanyId401>,
    unknown
  >({ method: 'DELETE', url: getDeleteCompanyRemoveByCompanyIdUrl(companyId).toString(), ...requestConfig })
  return res.data
}