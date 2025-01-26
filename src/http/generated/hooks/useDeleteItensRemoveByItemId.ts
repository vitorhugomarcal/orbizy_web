import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteItensRemoveByItemIdMutationResponse,
  DeleteItensRemoveByItemIdPathParams,
  DeleteItensRemoveByItemId401,
  DeleteItensRemoveByItemId404,
} from '../models/ItensController/DeleteItensRemoveByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteItensRemoveByItemId } from '../clients/deleteItensRemoveByItemId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteItensRemoveByItemIdMutationKey = () => [{ url: '/itens/remove/{itemId}' }] as const

export type DeleteItensRemoveByItemIdMutationKey = ReturnType<typeof deleteItensRemoveByItemIdMutationKey>

/**
 * @description Remove a item
 * {@link /itens/remove/:itemId}
 */
export function useDeleteItensRemoveByItemId(
  options: {
    mutation?: UseMutationOptions<
      DeleteItensRemoveByItemIdMutationResponse,
      ResponseErrorConfig<DeleteItensRemoveByItemId401 | DeleteItensRemoveByItemId404>,
      { itemId: DeleteItensRemoveByItemIdPathParams['itemId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteItensRemoveByItemIdMutationKey()

  return useMutation<
    DeleteItensRemoveByItemIdMutationResponse,
    ResponseErrorConfig<DeleteItensRemoveByItemId401 | DeleteItensRemoveByItemId404>,
    { itemId: DeleteItensRemoveByItemIdPathParams['itemId'] }
  >({
    mutationFn: async ({ itemId }) => {
      return deleteItensRemoveByItemId(itemId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}