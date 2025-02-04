import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostEstimateItensCreateByEstimateIdMutationRequest,
  PostEstimateItensCreateByEstimateIdMutationResponse,
  PostEstimateItensCreateByEstimateIdPathParams,
  PostEstimateItensCreateByEstimateId401,
  PostEstimateItensCreateByEstimateId404,
} from '../models/EstimateItemController/PostEstimateItensCreateByEstimateId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postEstimateItensCreateByEstimateIdMutationKey = () => [{ url: '/estimate/itens/create/{estimateId}' }] as const

export type PostEstimateItensCreateByEstimateIdMutationKey = ReturnType<typeof postEstimateItensCreateByEstimateIdMutationKey>

/**
 * @description Create a new estimate item
 * {@link /estimate/itens/create/:estimateId}
 */
export async function postEstimateItensCreateByEstimateId(
  estimateId: PostEstimateItensCreateByEstimateIdPathParams['estimateId'],
  data: PostEstimateItensCreateByEstimateIdMutationRequest,
  config: Partial<RequestConfig<PostEstimateItensCreateByEstimateIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostEstimateItensCreateByEstimateIdMutationResponse,
    ResponseErrorConfig<PostEstimateItensCreateByEstimateId401 | PostEstimateItensCreateByEstimateId404>,
    PostEstimateItensCreateByEstimateIdMutationRequest
  >({ method: 'POST', url: `/estimate/itens/create/${estimateId}`, baseURL: 'http://192.168.1.81:3333', data, ...requestConfig })
  return res.data
}

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