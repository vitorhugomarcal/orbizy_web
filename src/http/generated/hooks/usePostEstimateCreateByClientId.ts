import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostEstimateCreateByClientIdMutationRequest,
  PostEstimateCreateByClientIdMutationResponse,
  PostEstimateCreateByClientIdPathParams,
  PostEstimateCreateByClientId401,
  PostEstimateCreateByClientId404,
} from '../models/EstimateController/PostEstimateCreateByClientId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postEstimateCreateByClientIdMutationKey = () => [{ url: '/estimate/create/{clientId}' }] as const

export type PostEstimateCreateByClientIdMutationKey = ReturnType<typeof postEstimateCreateByClientIdMutationKey>

/**
 * @description Create a new estimate
 * {@link /estimate/create/:clientId}
 */
export async function postEstimateCreateByClientId(
  clientId: PostEstimateCreateByClientIdPathParams['clientId'],
  data: PostEstimateCreateByClientIdMutationRequest,
  config: Partial<RequestConfig<PostEstimateCreateByClientIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostEstimateCreateByClientIdMutationResponse,
    ResponseErrorConfig<PostEstimateCreateByClientId401 | PostEstimateCreateByClientId404>,
    PostEstimateCreateByClientIdMutationRequest
  >({ method: 'POST', url: `/estimate/create/${clientId}`, baseURL: 'http://192.168.1.81:3333', data, ...requestConfig })
  return res.data
}

/**
 * @description Create a new estimate
 * {@link /estimate/create/:clientId}
 */
export function usePostEstimateCreateByClientId(
  options: {
    mutation?: UseMutationOptions<
      PostEstimateCreateByClientIdMutationResponse,
      ResponseErrorConfig<PostEstimateCreateByClientId401 | PostEstimateCreateByClientId404>,
      { clientId: PostEstimateCreateByClientIdPathParams['clientId']; data: PostEstimateCreateByClientIdMutationRequest }
    >
    client?: Partial<RequestConfig<PostEstimateCreateByClientIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postEstimateCreateByClientIdMutationKey()

  return useMutation<
    PostEstimateCreateByClientIdMutationResponse,
    ResponseErrorConfig<PostEstimateCreateByClientId401 | PostEstimateCreateByClientId404>,
    { clientId: PostEstimateCreateByClientIdPathParams['clientId']; data: PostEstimateCreateByClientIdMutationRequest }
  >({
    mutationFn: async ({ clientId, data }) => {
      return postEstimateCreateByClientId(clientId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}