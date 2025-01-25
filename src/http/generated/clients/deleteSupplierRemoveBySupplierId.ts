import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteSupplierRemoveBySupplierIdMutationResponse,
  DeleteSupplierRemoveBySupplierIdPathParams,
} from '../models/DeleteSupplierRemoveBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteSupplierRemoveBySupplierIdUrl(supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId']) {
  return `https://api.orbizy.app/supplier/remove/${supplierId}` as const
}

/**
 * {@link /supplier/remove/:supplierId}
 */
export async function deleteSupplierRemoveBySupplierId(
  supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteSupplierRemoveBySupplierIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteSupplierRemoveBySupplierIdUrl(supplierId).toString(),
    ...requestConfig,
  })
  return res.data
}