import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteEstimateRemoveByEstimateIdMutationResponse,
  DeleteEstimateRemoveByEstimateIdPathParams,
} from '../models/DeleteEstimateRemoveByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteEstimateRemoveByEstimateId } from '../clients/deleteEstimateRemoveByEstimateId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteEstimateRemoveByEstimateIdMutationKey = () => [{ url: '/estimate/remove/{estimateId}' }] as const

export type DeleteEstimateRemoveByEstimateIdMutationKey = ReturnType<typeof deleteEstimateRemoveByEstimateIdMutationKey>

/**
 * {@link /estimate/remove/:estimateId}
 */
export function useDeleteEstimateRemoveByEstimateId(
  options: {
    mutation?: UseMutationOptions<
      DeleteEstimateRemoveByEstimateIdMutationResponse,
      ResponseErrorConfig<Error>,
      { estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteEstimateRemoveByEstimateIdMutationKey()

  return useMutation<
    DeleteEstimateRemoveByEstimateIdMutationResponse,
    ResponseErrorConfig<Error>,
    { estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'] }
  >({
    mutationFn: async ({ estimateId }) => {
      return deleteEstimateRemoveByEstimateId({ estimateId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}