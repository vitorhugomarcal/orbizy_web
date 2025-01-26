import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteItensEstimateRemoveByItemIdMutationResponse,
  DeleteItensEstimateRemoveByItemIdPathParams,
  DeleteItensEstimateRemoveByItemId401,
  DeleteItensEstimateRemoveByItemId404,
} from "../models/'EstimateItemController/DeleteItensEstimateRemoveByItemId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteItensEstimateRemoveByItemId } from '../clients/deleteItensEstimateRemoveByItemId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteItensEstimateRemoveByItemIdMutationKey = () => [{ url: '/itens/estimate/remove/{itemId}' }] as const

export type DeleteItensEstimateRemoveByItemIdMutationKey = ReturnType<typeof deleteItensEstimateRemoveByItemIdMutationKey>

/**
 * @description Remove an estimate item
 * {@link /itens/estimate/remove/:itemId}
 */
export function useDeleteItensEstimateRemoveByItemId(
  options: {
    mutation?: UseMutationOptions<
      DeleteItensEstimateRemoveByItemIdMutationResponse,
      ResponseErrorConfig<DeleteItensEstimateRemoveByItemId401 | DeleteItensEstimateRemoveByItemId404>,
      { itemId: DeleteItensEstimateRemoveByItemIdPathParams['itemId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteItensEstimateRemoveByItemIdMutationKey()

  return useMutation<
    DeleteItensEstimateRemoveByItemIdMutationResponse,
    ResponseErrorConfig<DeleteItensEstimateRemoveByItemId401 | DeleteItensEstimateRemoveByItemId404>,
    { itemId: DeleteItensEstimateRemoveByItemIdPathParams['itemId'] }
  >({
    mutationFn: async ({ itemId }) => {
      return deleteItensEstimateRemoveByItemId(itemId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}