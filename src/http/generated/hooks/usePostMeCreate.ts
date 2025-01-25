import client from '@kubb/plugin-client/clients/axios'
import type { PostMeCreateMutationRequest, PostMeCreateMutationResponse } from '../models/PostMeCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postMeCreateMutationKey = () => [{ url: '/me/create' }] as const

export type PostMeCreateMutationKey = ReturnType<typeof postMeCreateMutationKey>

/**
 * {@link /me/create}
 */
export async function postMeCreate(
  data: PostMeCreateMutationRequest,
  config: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostMeCreateMutationResponse, ResponseErrorConfig<Error>, PostMeCreateMutationRequest>({
    method: 'POST',
    url: `/me/create`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /me/create}
 */
export function usePostMeCreate(
  options: {
    mutation?: UseMutationOptions<PostMeCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostMeCreateMutationRequest }>
    client?: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postMeCreateMutationKey()

  return useMutation<PostMeCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostMeCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postMeCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}