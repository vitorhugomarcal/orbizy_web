import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { PostMeCreateMutationRequest, PostMeCreateMutationResponse, PostMeCreate400 } from '../models/UserController/PostMeCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postMeCreateMutationKey = () => [{ url: '/me/create' }] as const

export type PostMeCreateMutationKey = ReturnType<typeof postMeCreateMutationKey>

/**
 * @description Create a new user
 * {@link /me/create}
 */
export async function postMeCreate(
  data: PostMeCreateMutationRequest,
  config: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostMeCreateMutationResponse, ResponseErrorConfig<PostMeCreate400>, PostMeCreateMutationRequest>({
    method: 'POST',
    url: `/me/create`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Create a new user
 * {@link /me/create}
 */
export function usePostMeCreate(
  options: {
    mutation?: UseMutationOptions<PostMeCreateMutationResponse, ResponseErrorConfig<PostMeCreate400>, { data: PostMeCreateMutationRequest }>
    client?: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postMeCreateMutationKey()

  return useMutation<PostMeCreateMutationResponse, ResponseErrorConfig<PostMeCreate400>, { data: PostMeCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postMeCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}