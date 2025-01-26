import client from '@kubb/plugin-client/clients/axios'
import type { GetCompanyQueryResponse, GetCompany400, GetCompany401 } from "../models/'CompanyController/GetCompany.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetCompanyUrl() {
  return `https://api.orbizy.app/company` as const
}

/**
 * @description Get a company
 * {@link /company}
 */
export async function getCompany(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCompanyQueryResponse, ResponseErrorConfig<GetCompany400 | GetCompany401>, unknown>({
    method: 'GET',
    url: getGetCompanyUrl().toString(),
    ...requestConfig,
  })
  return res.data
}