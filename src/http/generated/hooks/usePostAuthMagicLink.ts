import client from '@kubb/plugin-client/clients/axios'
import type {
  PostAuthMagicLinkMutationRequest,
  PostAuthMagicLinkMutationResponse,
  PostAuthMagicLink400,
  PostAuthMagicLink404,
  PostAuthMagicLink429,
} from "../models/'AuthController/PostAuthMagicLink.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postAuthMagicLink } from '../clients/postAuthMagicLink.ts'
import { useMutation } from '@tanstack/react-query'

export const postAuthMagicLinkMutationKey = () => [{ url: '/auth/magic-link' }] as const

export type PostAuthMagicLinkMutationKey = ReturnType<typeof postAuthMagicLinkMutationKey>

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