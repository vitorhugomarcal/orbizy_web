import client from '@kubb/plugin-client/clients/axios'
import type {
  PutItensEstimateUpdateByItemInvoiceIdMutationRequest,
  PutItensEstimateUpdateByItemInvoiceIdMutationResponse,
  PutItensEstimateUpdateByItemInvoiceIdPathParams,
  PutItensEstimateUpdateByItemInvoiceId401,
  PutItensEstimateUpdateByItemInvoiceId404,
} from '../models/EstimateItemController/PutItensEstimateUpdateByItemInvoiceId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPutItensEstimateUpdateByItemInvoiceIdUrl(itemInvoiceId: PutItensEstimateUpdateByItemInvoiceIdPathParams['itemInvoiceId']) {
  return `https://api.orbizy.app/itens/estimate/update/${itemInvoiceId}` as const
}

/**
 * @description Update an estimate item
 * {@link /itens/estimate/update/:itemInvoiceId}
 */
export async function putItensEstimateUpdateByItemInvoiceId(
  itemInvoiceId: PutItensEstimateUpdateByItemInvoiceIdPathParams['itemInvoiceId'],
  data?: PutItensEstimateUpdateByItemInvoiceIdMutationRequest,
  config: Partial<RequestConfig<PutItensEstimateUpdateByItemInvoiceIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutItensEstimateUpdateByItemInvoiceIdMutationResponse,
    ResponseErrorConfig<PutItensEstimateUpdateByItemInvoiceId401 | PutItensEstimateUpdateByItemInvoiceId404>,
    PutItensEstimateUpdateByItemInvoiceIdMutationRequest
  >({ method: 'PUT', url: getPutItensEstimateUpdateByItemInvoiceIdUrl(itemInvoiceId).toString(), data, ...requestConfig })
  return res.data
}