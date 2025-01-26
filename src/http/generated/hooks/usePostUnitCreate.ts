import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostUnitCreateMutationRequest,
  PostUnitCreateMutationResponse,
  PostUnitCreate400,
  PostUnitCreate401,
} from '../models/UnitController/PostUnitCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postUnitCreateMutationKey = () => [{ url: '/unit/create' }] as const

export type PostUnitCreateMutationKey = ReturnType<typeof postUnitCreateMutationKey>

/**
 * @description Create a new world unit
 * {@link /unit/create}
 */
export async function postUnitCreate(
  data: PostUnitCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostUnitCreateMutationResponse, ResponseErrorConfig<PostUnitCreate400 | PostUnitCreate401>, PostUnitCreateMutationRequest>({
    method: 'POST',
    url: `/unit/create`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Create a new world unit
 * {@link /unit/create}
 */
export function usePostUnitCreate(
  options: {
    mutation?: UseMutationOptions<
      PostUnitCreateMutationResponse,
      ResponseErrorConfig<PostUnitCreate400 | PostUnitCreate401>,
      { data: PostUnitCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postUnitCreateMutationKey()

  return useMutation<PostUnitCreateMutationResponse, ResponseErrorConfig<PostUnitCreate400 | PostUnitCreate401>, { data: PostUnitCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postUnitCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}