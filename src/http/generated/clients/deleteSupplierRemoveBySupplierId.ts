import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteSupplierRemoveBySupplierIdMutationResponse,
  DeleteSupplierRemoveBySupplierIdPathParams,
  DeleteSupplierRemoveBySupplierId400,
  DeleteSupplierRemoveBySupplierId401,
  DeleteSupplierRemoveBySupplierId404,
} from '../models/SupplierController/DeleteSupplierRemoveBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getDeleteSupplierRemoveBySupplierIdUrl(supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId']) {
  return `https://api.orbizy.app/supplier/remove/${supplierId}` as const
}

/**
 * @description Remove a supplier
 * {@link /supplier/remove/:supplierId}
 */
export async function deleteSupplierRemoveBySupplierId(
  supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteSupplierRemoveBySupplierIdMutationResponse,
    ResponseErrorConfig<DeleteSupplierRemoveBySupplierId400 | DeleteSupplierRemoveBySupplierId401 | DeleteSupplierRemoveBySupplierId404>,
    unknown
  >({ method: 'DELETE', url: getDeleteSupplierRemoveBySupplierIdUrl(supplierId).toString(), ...requestConfig })
  return res.data
}