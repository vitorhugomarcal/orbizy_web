import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteEstimateRemoveByEstimateIdMutationResponse,
  DeleteEstimateRemoveByEstimateIdPathParams,
  DeleteEstimateRemoveByEstimateId401,
  DeleteEstimateRemoveByEstimateId404,
} from '../models/EstimateController/DeleteEstimateRemoveByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteEstimateRemoveByEstimateIdMutationKey = () => [{ url: '/estimate/remove/{estimateId}' }] as const

export type DeleteEstimateRemoveByEstimateIdMutationKey = ReturnType<typeof deleteEstimateRemoveByEstimateIdMutationKey>

/**
 * @description Remove a estimate
 * {@link /estimate/remove/:estimateId}
 */
export async function deleteEstimateRemoveByEstimateId(
  estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteEstimateRemoveByEstimateIdMutationResponse,
    ResponseErrorConfig<DeleteEstimateRemoveByEstimateId401 | DeleteEstimateRemoveByEstimateId404>,
    unknown
  >({ method: 'DELETE', url: `/estimate/remove/${estimateId}`, baseURL: 'https://api.orbizy.app', ...requestConfig })
  return res.data
}

/**
 * @description Remove a estimate
 * {@link /estimate/remove/:estimateId}
 */
export function useDeleteEstimateRemoveByEstimateId(
  options: {
    mutation?: UseMutationOptions<
      DeleteEstimateRemoveByEstimateIdMutationResponse,
      ResponseErrorConfig<DeleteEstimateRemoveByEstimateId401 | DeleteEstimateRemoveByEstimateId404>,
      { estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteEstimateRemoveByEstimateIdMutationKey()

  return useMutation<
    DeleteEstimateRemoveByEstimateIdMutationResponse,
    ResponseErrorConfig<DeleteEstimateRemoveByEstimateId401 | DeleteEstimateRemoveByEstimateId404>,
    { estimateId: DeleteEstimateRemoveByEstimateIdPathParams['estimateId'] }
  >({
    mutationFn: async ({ estimateId }) => {
      return deleteEstimateRemoveByEstimateId(estimateId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}