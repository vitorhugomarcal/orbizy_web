import client from '@kubb/plugin-client/clients/axios'
import type {
  PostEstimateCreateMutationRequest,
  PostEstimateCreateMutationResponse,
  PostEstimateCreatePathParams,
  PostEstimateCreate401,
  PostEstimateCreate404,
} from "../models/'EstimateController/PostEstimateCreate.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postEstimateCreate } from '../clients/postEstimateCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const postEstimateCreateMutationKey = () => [{ url: '/estimate/create' }] as const

export type PostEstimateCreateMutationKey = ReturnType<typeof postEstimateCreateMutationKey>

/**
 * @description Create a new estimate
 * {@link /estimate/create}
 */
export function usePostEstimateCreate(
  options: {
    mutation?: UseMutationOptions<
      PostEstimateCreateMutationResponse,
      ResponseErrorConfig<PostEstimateCreate401 | PostEstimateCreate404>,
      { clientId: PostEstimateCreatePathParams['clientId']; data: PostEstimateCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostEstimateCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postEstimateCreateMutationKey()

  return useMutation<
    PostEstimateCreateMutationResponse,
    ResponseErrorConfig<PostEstimateCreate401 | PostEstimateCreate404>,
    { clientId: PostEstimateCreatePathParams['clientId']; data: PostEstimateCreateMutationRequest }
  >({
    mutationFn: async ({ clientId, data }) => {
      return postEstimateCreate(clientId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}