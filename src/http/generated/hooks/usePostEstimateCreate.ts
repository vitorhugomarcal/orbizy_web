import client from '@kubb/plugin-client/clients/axios'
import type { PostEstimateCreateMutationRequest, PostEstimateCreateMutationResponse, PostEstimateCreatePathParams } from '../models/PostEstimateCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postEstimateCreate } from '../clients/postEstimateCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const postEstimateCreateMutationKey = () => [{ url: '/estimate/create' }] as const

export type PostEstimateCreateMutationKey = ReturnType<typeof postEstimateCreateMutationKey>

/**
 * {@link /estimate/create}
 */
export function usePostEstimateCreate(
  options: {
    mutation?: UseMutationOptions<
      PostEstimateCreateMutationResponse,
      ResponseErrorConfig<Error>,
      { clientId: PostEstimateCreatePathParams['clientId']; data: PostEstimateCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostEstimateCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postEstimateCreateMutationKey()

  return useMutation<
    PostEstimateCreateMutationResponse,
    ResponseErrorConfig<Error>,
    { clientId: PostEstimateCreatePathParams['clientId']; data: PostEstimateCreateMutationRequest }
  >({
    mutationFn: async ({ clientId, data }) => {
      return postEstimateCreate({ clientId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}