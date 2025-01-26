import client from '@kubb/plugin-client/clients/axios'
import type { GetSupplierCompanyQueryResponse, GetSupplierCompany401, GetSupplierCompany404 } from '../models/SupplierController/GetSupplierCompany.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetSupplierCompanyUrl() {
  return `https://api.orbizy.app/supplier/company` as const
}

/**
 * @description Get all suppliers
 * {@link /supplier/company}
 */
export async function getSupplierCompany(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSupplierCompanyQueryResponse, ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>, unknown>({
    method: 'GET',
    url: getGetSupplierCompanyUrl().toString(),
    ...requestConfig,
  })
  return res.data
}