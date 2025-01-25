import client from '@kubb/plugin-client/clients/axios'
import type { PostAuthMagicLinkMutationRequest, PostAuthMagicLinkMutationResponse } from '../models/PostAuthMagicLink.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postAuthMagicLinkMutationKey = () => [{ url: '/auth/magic-link' }] as const

export type PostAuthMagicLinkMutationKey = ReturnType<typeof postAuthMagicLinkMutationKey>

/**
 * {@link /auth/magic-link}
 */
export async function postAuthMagicLink(
  data: PostAuthMagicLinkMutationRequest,
  config: Partial<RequestConfig<PostAuthMagicLinkMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostAuthMagicLinkMutationResponse, ResponseErrorConfig<Error>, PostAuthMagicLinkMutationRequest>({
    method: 'POST',
    url: `/auth/magic-link`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /auth/magic-link}
 */
export function usePostAuthMagicLink(
  options: {
    mutation?: UseMutationOptions<PostAuthMagicLinkMutationResponse, ResponseErrorConfig<Error>, { data: PostAuthMagicLinkMutationRequest }>
    client?: Partial<RequestConfig<PostAuthMagicLinkMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postAuthMagicLinkMutationKey()

  return useMutation<PostAuthMagicLinkMutationResponse, ResponseErrorConfig<Error>, { data: PostAuthMagicLinkMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postAuthMagicLink(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}