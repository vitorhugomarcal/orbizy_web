import client from '@kubb/plugin-client/clients/axios'
import type {
  PutSupplierUpdateBySupplierIdMutationRequest,
  PutSupplierUpdateBySupplierIdMutationResponse,
  PutSupplierUpdateBySupplierIdPathParams,
} from '../models/PutSupplierUpdateBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutSupplierUpdateBySupplierIdUrl(supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId']) {
  return `https://api.orbizy.app/supplier/update/${supplierId}` as const
}

/**
 * {@link /supplier/update/:supplierId}
 */
export async function putSupplierUpdateBySupplierId(
  supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId'],
  data?: PutSupplierUpdateBySupplierIdMutationRequest,
  config: Partial<RequestConfig<PutSupplierUpdateBySupplierIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutSupplierUpdateBySupplierIdMutationResponse, ResponseErrorConfig<Error>, PutSupplierUpdateBySupplierIdMutationRequest>({
    method: 'PUT',
    url: getPutSupplierUpdateBySupplierIdUrl(supplierId).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}