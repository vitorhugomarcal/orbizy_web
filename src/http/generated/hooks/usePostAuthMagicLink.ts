import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostAuthMagicLinkMutationRequest,
  PostAuthMagicLinkMutationResponse,
  PostAuthMagicLink400,
  PostAuthMagicLink404,
  PostAuthMagicLink429,
} from '../models/AuthController/PostAuthMagicLink.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postAuthMagicLinkMutationKey = () => [{ url: '/auth/magic-link' }] as const

export type PostAuthMagicLinkMutationKey = ReturnType<typeof postAuthMagicLinkMutationKey>

/**
 * @description Send a magic link to the user
 * {@link /auth/magic-link}
 */
export async function postAuthMagicLink(
  data: PostAuthMagicLinkMutationRequest,
  config: Partial<RequestConfig<PostAuthMagicLinkMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostAuthMagicLinkMutationResponse,
    ResponseErrorConfig<PostAuthMagicLink400 | PostAuthMagicLink404 | PostAuthMagicLink429>,
    PostAuthMagicLinkMutationRequest
  >({ method: 'POST', url: `/auth/magic-link`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

/**
 * @description Send a magic link to the user
 * {@link /auth/magic-link}
 */
export function usePostAuthMagicLink(
  options: {
    mutation?: UseMutationOptions<
      PostAuthMagicLinkMutationResponse,
      ResponseErrorConfig<PostAuthMagicLink400 | PostAuthMagicLink404 | PostAuthMagicLink429>,
      { data: PostAuthMagicLinkMutationRequest }
    >
    client?: Partial<RequestConfig<PostAuthMagicLinkMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postAuthMagicLinkMutationKey()

  return useMutation<
    PostAuthMagicLinkMutationResponse,
    ResponseErrorConfig<PostAuthMagicLink400 | PostAuthMagicLink404 | PostAuthMagicLink429>,
    { data: PostAuthMagicLinkMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postAuthMagicLink(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}