import client from '@kubb/plugin-client/clients/axios'
import type {
  PostEstimateCreateByClientIdMutationRequest,
  PostEstimateCreateByClientIdMutationResponse,
  PostEstimateCreateByClientIdPathParams,
  PostEstimateCreateByClientId401,
  PostEstimateCreateByClientId404,
} from "../models/'EstimateController/PostEstimateCreateByClientId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postEstimateCreateByClientId } from '../clients/postEstimateCreateByClientId.ts'
import { useMutation } from '@tanstack/react-query'

export const postEstimateCreateByClientIdMutationKey = () => [{ url: '/estimate/create/{clientId}' }] as const

export type PostEstimateCreateByClientIdMutationKey = ReturnType<typeof postEstimateCreateByClientIdMutationKey>

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