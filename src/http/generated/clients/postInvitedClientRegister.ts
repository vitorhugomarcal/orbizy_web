import client from '@kubb/plugin-client/clients/axios'
import type { PostInvitedClientRegisterMutationRequest, PostInvitedClientRegisterMutationResponse } from '../models/PostInvitedClientRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostInvitedClientRegisterUrl() {
  return `https://api.orbizy.app/invited/client/register` as const
}

/**
 * {@link /invited/client/register}
 */
export async function postInvitedClientRegister(
  data: PostInvitedClientRegisterMutationRequest,
  config: Partial<RequestConfig<PostInvitedClientRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostInvitedClientRegisterMutationResponse, ResponseErrorConfig<Error>, PostInvitedClientRegisterMutationRequest>({
    method: 'POST',
    url: getPostInvitedClientRegisterUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}