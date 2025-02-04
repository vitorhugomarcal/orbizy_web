import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  DeleteItensEstimateRemoveByItemIdMutationResponse,
  DeleteItensEstimateRemoveByItemIdPathParams,
  DeleteItensEstimateRemoveByItemId401,
  DeleteItensEstimateRemoveByItemId404,
} from '../models/EstimateItemController/DeleteItensEstimateRemoveByItemId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteItensEstimateRemoveByItemIdMutationKey = () => [{ url: '/itens/estimate/remove/{itemId}' }] as const

export type DeleteItensEstimateRemoveByItemIdMutationKey = ReturnType<typeof deleteItensEstimateRemoveByItemIdMutationKey>

/**
 * @description Remove an estimate item
 * {@link /itens/estimate/remove/:itemId}
 */
export async function deleteItensEstimateRemoveByItemId(
  itemId: DeleteItensEstimateRemoveByItemIdPathParams['itemId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteItensEstimateRemoveByItemIdMutationResponse,
    ResponseErrorConfig<DeleteItensEstimateRemoveByItemId401 | DeleteItensEstimateRemoveByItemId404>,
    unknown
  >({ method: 'DELETE', url: `/itens/estimate/remove/${itemId}`, baseURL: 'http://192.168.1.81:3333', ...requestConfig })
  return res.data
}

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