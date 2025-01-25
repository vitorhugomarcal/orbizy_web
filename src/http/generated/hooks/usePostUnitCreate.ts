import client from '@kubb/plugin-client/clients/axios'
import type { PostUnitCreateMutationRequest, PostUnitCreateMutationResponse } from '../models/PostUnitCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postUnitCreateMutationKey = () => [{ url: '/unit/create' }] as const

export type PostUnitCreateMutationKey = ReturnType<typeof postUnitCreateMutationKey>

/**
 * {@link /unit/create}
 */
export async function postUnitCreate(
  data: PostUnitCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostUnitCreateMutationResponse, ResponseErrorConfig<Error>, PostUnitCreateMutationRequest>({
    method: 'POST',
    url: `/unit/create`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /unit/create}
 */
export function usePostUnitCreate(
  options: {
    mutation?: UseMutationOptions<PostUnitCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostUnitCreateMutationRequest }>
    client?: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postUnitCreateMutationKey()

  return useMutation<PostUnitCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostUnitCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postUnitCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}