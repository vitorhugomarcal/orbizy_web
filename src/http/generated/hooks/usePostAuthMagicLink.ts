import client from '@kubb/plugin-client/clients/axios'
import type { PostAuthMagicLinkMutationRequest, PostAuthMagicLinkMutationResponse } from '../models/PostAuthMagicLink.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postAuthMagicLink } from '../clients/postAuthMagicLink.ts'
import { useMutation } from '@tanstack/react-query'

export const postAuthMagicLinkMutationKey = () => [{ url: '/auth/magic-link' }] as const

export type PostAuthMagicLinkMutationKey = ReturnType<typeof postAuthMagicLinkMutationKey>

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