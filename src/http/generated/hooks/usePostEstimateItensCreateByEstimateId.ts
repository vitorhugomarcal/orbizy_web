import client from '@kubb/plugin-client/clients/axios'
import type {
  PostEstimateItensCreateByEstimateIdMutationRequest,
  PostEstimateItensCreateByEstimateIdMutationResponse,
  PostEstimateItensCreateByEstimateIdPathParams,
  PostEstimateItensCreateByEstimateId401,
  PostEstimateItensCreateByEstimateId404,
} from '../models/EstimateItemController/PostEstimateItensCreateByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postEstimateItensCreateByEstimateId } from '../clients/postEstimateItensCreateByEstimateId.ts'
import { useMutation } from '@tanstack/react-query'

export const postEstimateItensCreateByEstimateIdMutationKey = () => [{ url: '/estimate/itens/create/{estimateId}' }] as const

export type PostEstimateItensCreateByEstimateIdMutationKey = ReturnType<typeof postEstimateItensCreateByEstimateIdMutationKey>

/**
 * @description Create a new estimate item
 * {@link /estimate/itens/create/:estimateId}
 */
export function usePostEstimateItensCreateByEstimateId(
  options: {
    mutation?: UseMutationOptions<
      PostEstimateItensCreateByEstimateIdMutationResponse,
      ResponseErrorConfig<PostEstimateItensCreateByEstimateId401 | PostEstimateItensCreateByEstimateId404>,
      { estimateId: PostEstimateItensCreateByEstimateIdPathParams['estimateId']; data: PostEstimateItensCreateByEstimateIdMutationRequest }
    >
    client?: Partial<RequestConfig<PostEstimateItensCreateByEstimateIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postEstimateItensCreateByEstimateIdMutationKey()

  return useMutation<
    PostEstimateItensCreateByEstimateIdMutationResponse,
    ResponseErrorConfig<PostEstimateItensCreateByEstimateId401 | PostEstimateItensCreateByEstimateId404>,
    { estimateId: PostEstimateItensCreateByEstimateIdPathParams['estimateId']; data: PostEstimateItensCreateByEstimateIdMutationRequest }
  >({
    mutationFn: async ({ estimateId, data }) => {
      return postEstimateItensCreateByEstimateId(estimateId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}