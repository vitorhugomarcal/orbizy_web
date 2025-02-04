import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PutItensEstimateUpdateByItemInvoiceIdMutationRequest,
  PutItensEstimateUpdateByItemInvoiceIdMutationResponse,
  PutItensEstimateUpdateByItemInvoiceIdPathParams,
  PutItensEstimateUpdateByItemInvoiceId401,
  PutItensEstimateUpdateByItemInvoiceId404,
} from '../models/EstimateItemController/PutItensEstimateUpdateByItemInvoiceId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putItensEstimateUpdateByItemInvoiceIdMutationKey = () => [{ url: '/itens/estimate/update/{itemInvoiceId}' }] as const

export type PutItensEstimateUpdateByItemInvoiceIdMutationKey = ReturnType<typeof putItensEstimateUpdateByItemInvoiceIdMutationKey>

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
  >({ method: 'PUT', url: `/itens/estimate/update/${itemInvoiceId}`, baseURL: 'http://192.168.1.81:3333', data, ...requestConfig })
  return res.data
}

/**
 * @description Update an estimate item
 * {@link /itens/estimate/update/:itemInvoiceId}
 */
export function usePutItensEstimateUpdateByItemInvoiceId(
  options: {
    mutation?: UseMutationOptions<
      PutItensEstimateUpdateByItemInvoiceIdMutationResponse,
      ResponseErrorConfig<PutItensEstimateUpdateByItemInvoiceId401 | PutItensEstimateUpdateByItemInvoiceId404>,
      { itemInvoiceId: PutItensEstimateUpdateByItemInvoiceIdPathParams['itemInvoiceId']; data?: PutItensEstimateUpdateByItemInvoiceIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutItensEstimateUpdateByItemInvoiceIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putItensEstimateUpdateByItemInvoiceIdMutationKey()

  return useMutation<
    PutItensEstimateUpdateByItemInvoiceIdMutationResponse,
    ResponseErrorConfig<PutItensEstimateUpdateByItemInvoiceId401 | PutItensEstimateUpdateByItemInvoiceId404>,
    { itemInvoiceId: PutItensEstimateUpdateByItemInvoiceIdPathParams['itemInvoiceId']; data?: PutItensEstimateUpdateByItemInvoiceIdMutationRequest }
  >({
    mutationFn: async ({ itemInvoiceId, data }) => {
      return putItensEstimateUpdateByItemInvoiceId(itemInvoiceId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}