import client from '@kubb/plugin-client/clients/axios'
import type { PostSessionsMutationRequest, PostSessionsMutationResponse } from '../models/AuthController/PostSessions.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostSessionsUrl() {
  return `https://api.orbizy.app/sessions` as const
}

/**
 * @description Cria uma sessão para o usuário
 * {@link /sessions}
 */
export async function postSessions(
  data: PostSessionsMutationRequest,
  config: Partial<RequestConfig<PostSessionsMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostSessionsMutationResponse, ResponseErrorConfig<Error>, PostSessionsMutationRequest>({
    method: 'POST',
    url: getPostSessionsUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}