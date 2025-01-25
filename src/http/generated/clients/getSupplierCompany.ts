import client from '@kubb/plugin-client/clients/axios'
import type { GetSupplierCompanyQueryResponse } from '../models/GetSupplierCompany.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetSupplierCompanyUrl() {
  return `https://api.orbizy.app/supplier/company` as const
}

/**
 * {@link /supplier/company}
 */
export async function getSupplierCompany(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSupplierCompanyQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetSupplierCompanyUrl().toString(),
    ...requestConfig,
  })
  return res.data
}