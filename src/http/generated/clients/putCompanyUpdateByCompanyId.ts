import client from '@kubb/plugin-client/clients/axios'
import type {
  PutCompanyUpdateByCompanyIdMutationRequest,
  PutCompanyUpdateByCompanyIdMutationResponse,
  PutCompanyUpdateByCompanyIdPathParams,
} from '../models/PutCompanyUpdateByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutCompanyUpdateByCompanyIdUrl(companyId: PutCompanyUpdateByCompanyIdPathParams['companyId']) {
  return `https://api.orbizy.app/company/update/${companyId}` as const
}

/**
 * {@link /company/update/:companyId}
 */
export async function putCompanyUpdateByCompanyId(
  companyId: PutCompanyUpdateByCompanyIdPathParams['companyId'],
  data?: PutCompanyUpdateByCompanyIdMutationRequest,
  config: Partial<RequestConfig<PutCompanyUpdateByCompanyIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutCompanyUpdateByCompanyIdMutationResponse, ResponseErrorConfig<Error>, PutCompanyUpdateByCompanyIdMutationRequest>({
    method: 'PUT',
    url: getPutCompanyUpdateByCompanyIdUrl(companyId).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}