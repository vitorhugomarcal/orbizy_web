import client from '@kubb/plugin-client/clients/axios'
import type {
  PutSupplierUpdateBySupplierIdMutationRequest,
  PutSupplierUpdateBySupplierIdMutationResponse,
  PutSupplierUpdateBySupplierIdPathParams,
  PutSupplierUpdateBySupplierId400,
  PutSupplierUpdateBySupplierId401,
  PutSupplierUpdateBySupplierId404,
} from "../models/'SupplierController/PutSupplierUpdateBySupplierId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutSupplierUpdateBySupplierIdUrl(supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId']) {
  return `https://api.orbizy.app/supplier/update/${supplierId}` as const
}

/**
 * @description Update a supplier
 * {@link /supplier/update/:supplierId}
 */
export async function putSupplierUpdateBySupplierId(
  supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId'],
  data?: PutSupplierUpdateBySupplierIdMutationRequest,
  config: Partial<RequestConfig<PutSupplierUpdateBySupplierIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutSupplierUpdateBySupplierIdMutationResponse,
    ResponseErrorConfig<PutSupplierUpdateBySupplierId400 | PutSupplierUpdateBySupplierId401 | PutSupplierUpdateBySupplierId404>,
    PutSupplierUpdateBySupplierIdMutationRequest
  >({ method: 'PUT', url: getPutSupplierUpdateBySupplierIdUrl(supplierId).toString(), data, ...requestConfig })
  return res.data
}