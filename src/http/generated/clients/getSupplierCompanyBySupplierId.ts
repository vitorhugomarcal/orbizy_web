import client from '@kubb/plugin-client/clients/axios'
import type { GetSupplierCompanyBySupplierIdQueryResponse, GetSupplierCompanyBySupplierIdPathParams } from '../models/GetSupplierCompanyBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetSupplierCompanyBySupplierIdUrl(supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId']) {
  return `https://api.orbizy.app/supplier/company/${supplierId}` as const
}

/**
 * {@link /supplier/company/:supplierId}
 */
export async function getSupplierCompanyBySupplierId(
  supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSupplierCompanyBySupplierIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetSupplierCompanyBySupplierIdUrl(supplierId).toString(),
    ...requestConfig,
  })
  return res.data
}