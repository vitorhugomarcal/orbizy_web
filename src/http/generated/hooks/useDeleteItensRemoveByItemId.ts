import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteItensRemoveByItemIdMutationResponse,
  DeleteItensRemoveByItemIdPathParams,
  DeleteItensRemoveByItemId401,
  DeleteItensRemoveByItemId404,
} from '../models/ItensController/DeleteItensRemoveByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteItensRemoveByItemIdMutationKey = () => [{ url: '/itens/remove/{itemId}' }] as const

export type DeleteItensRemoveByItemIdMutationKey = ReturnType<typeof deleteItensRemoveByItemIdMutationKey>

/**
 * @description Remove a item
 * {@link /itens/remove/:itemId}
 */
export async function deleteItensRemoveByItemId(
  itemId: DeleteItensRemoveByItemIdPathParams['itemId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteItensRemoveByItemIdMutationResponse,
    ResponseErrorConfig<DeleteItensRemoveByItemId401 | DeleteItensRemoveByItemId404>,
    unknown
  >({ method: 'DELETE', url: `/itens/remove/${itemId}`, baseURL: 'https://api.orbizy.app', ...requestConfig })
  return res.data
}

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