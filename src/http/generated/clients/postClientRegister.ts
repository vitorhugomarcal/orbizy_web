import client from '@kubb/plugin-client/clients/axios'
import type { PostClientRegisterMutationRequest, PostClientRegisterMutationResponse } from '../models/PostClientRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostClientRegisterUrl() {
  return `https://api.orbizy.app/client/register` as const
}

/**
 * {@link /client/register}
 */
export async function postClientRegister(
  data: PostClientRegisterMutationRequest,
  config: Partial<RequestConfig<PostClientRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostClientRegisterMutationResponse, ResponseErrorConfig<Error>, PostClientRegisterMutationRequest>({
    method: 'POST',
    url: getPostClientRegisterUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}