import client from '@kubb/plugin-client/clients/axios'
import type { PostAuthMagicLinkMutationRequest, PostAuthMagicLinkMutationResponse } from '../models/PostAuthMagicLink.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostAuthMagicLinkUrl() {
  return `https://api.orbizy.app/auth/magic-link` as const
}

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
    url: getPostAuthMagicLinkUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}