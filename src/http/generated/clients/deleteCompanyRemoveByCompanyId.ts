import client from '@kubb/plugin-client/clients/axios'
import type { DeleteCompanyRemoveByCompanyIdMutationResponse, DeleteCompanyRemoveByCompanyIdPathParams } from '../models/DeleteCompanyRemoveByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteCompanyRemoveByCompanyIdUrl(companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId']) {
  return `https://api.orbizy.app/company/remove/${companyId}` as const
}

/**
 * {@link /company/remove/:companyId}
 */
export async function deleteCompanyRemoveByCompanyId(
  companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteCompanyRemoveByCompanyIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteCompanyRemoveByCompanyIdUrl(companyId).toString(),
    ...requestConfig,
  })
  return res.data
}