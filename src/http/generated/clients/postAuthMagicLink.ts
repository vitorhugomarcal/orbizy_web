import client from '@kubb/plugin-client/clients/axios'
import type {
  PostAuthMagicLinkMutationRequest,
  PostAuthMagicLinkMutationResponse,
  PostAuthMagicLink400,
  PostAuthMagicLink404,
  PostAuthMagicLink429,
} from '../models/AuthController/PostAuthMagicLink.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostAuthMagicLinkUrl() {
  return `https://api.orbizy.app/auth/magic-link` as const
}

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
  >({ method: 'POST', url: getPostAuthMagicLinkUrl().toString(), data, ...requestConfig })
  return res.data
}