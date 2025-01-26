import client from '@kubb/plugin-client/clients/axios'
import type {
  PutItensEstimateUpdateByItemInvoiceIdMutationRequest,
  PutItensEstimateUpdateByItemInvoiceIdMutationResponse,
  PutItensEstimateUpdateByItemInvoiceIdPathParams,
  PutItensEstimateUpdateByItemInvoiceId401,
  PutItensEstimateUpdateByItemInvoiceId404,
} from "../models/'EstimateItemController/PutItensEstimateUpdateByItemInvoiceId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { putItensEstimateUpdateByItemInvoiceId } from '../clients/putItensEstimateUpdateByItemInvoiceId.ts'
import { useMutation } from '@tanstack/react-query'

export const putItensEstimateUpdateByItemInvoiceIdMutationKey = () => [{ url: '/itens/estimate/update/{itemInvoiceId}' }] as const

export type PutItensEstimateUpdateByItemInvoiceIdMutationKey = ReturnType<typeof putItensEstimateUpdateByItemInvoiceIdMutationKey>

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