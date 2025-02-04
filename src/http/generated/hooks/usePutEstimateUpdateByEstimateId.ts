import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PutEstimateUpdateByEstimateIdMutationRequest,
  PutEstimateUpdateByEstimateIdMutationResponse,
  PutEstimateUpdateByEstimateIdPathParams,
  PutEstimateUpdateByEstimateId401,
  PutEstimateUpdateByEstimateId404,
} from '../models/EstimateController/PutEstimateUpdateByEstimateId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putEstimateUpdateByEstimateIdMutationKey = () => [{ url: '/estimate/update/{estimateId}' }] as const

export type PutEstimateUpdateByEstimateIdMutationKey = ReturnType<typeof putEstimateUpdateByEstimateIdMutationKey>

/**
 * @description Update a estimate
 * {@link /estimate/update/:estimateId}
 */
export async function putEstimateUpdateByEstimateId(
  estimateId: PutEstimateUpdateByEstimateIdPathParams['estimateId'],
  data?: PutEstimateUpdateByEstimateIdMutationRequest,
  config: Partial<RequestConfig<PutEstimateUpdateByEstimateIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutEstimateUpdateByEstimateIdMutationResponse,
    ResponseErrorConfig<PutEstimateUpdateByEstimateId401 | PutEstimateUpdateByEstimateId404>,
    PutEstimateUpdateByEstimateIdMutationRequest
  >({ method: 'PUT', url: `/estimate/update/${estimateId}`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

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