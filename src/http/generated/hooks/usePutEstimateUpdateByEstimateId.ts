import client from '@kubb/plugin-client/clients/axios'
import type {
  PutEstimateUpdateByEstimateIdMutationRequest,
  PutEstimateUpdateByEstimateIdMutationResponse,
  PutEstimateUpdateByEstimateIdPathParams,
  PutEstimateUpdateByEstimateId401,
  PutEstimateUpdateByEstimateId404,
} from "../models/'EstimateController/PutEstimateUpdateByEstimateId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { putEstimateUpdateByEstimateId } from '../clients/putEstimateUpdateByEstimateId.ts'
import { useMutation } from '@tanstack/react-query'

export const putEstimateUpdateByEstimateIdMutationKey = () => [{ url: '/estimate/update/{estimateId}' }] as const

export type PutEstimateUpdateByEstimateIdMutationKey = ReturnType<typeof putEstimateUpdateByEstimateIdMutationKey>

/**
 * @description Update a estimate
 * {@link /estimate/update/:estimateId}
 */
export function usePutEstimateUpdateByEstimateId(
  options: {
    mutation?: UseMutationOptions<
      PutEstimateUpdateByEstimateIdMutationResponse,
      ResponseErrorConfig<PutEstimateUpdateByEstimateId401 | PutEstimateUpdateByEstimateId404>,
      { estimateId: PutEstimateUpdateByEstimateIdPathParams['estimateId']; data?: PutEstimateUpdateByEstimateIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutEstimateUpdateByEstimateIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putEstimateUpdateByEstimateIdMutationKey()

  return useMutation<
    PutEstimateUpdateByEstimateIdMutationResponse,
    ResponseErrorConfig<PutEstimateUpdateByEstimateId401 | PutEstimateUpdateByEstimateId404>,
    { estimateId: PutEstimateUpdateByEstimateIdPathParams['estimateId']; data?: PutEstimateUpdateByEstimateIdMutationRequest }
  >({
    mutationFn: async ({ estimateId, data }) => {
      return putEstimateUpdateByEstimateId(estimateId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}