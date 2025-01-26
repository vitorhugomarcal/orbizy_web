import client from '@kubb/plugin-client/clients/axios'
import type {
  PostItensCreateMutationRequest,
  PostItensCreateMutationResponse,
  PostItensCreate400,
  PostItensCreate401,
  PostItensCreate404,
} from "../models/'ItensController/PostItensCreate.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostItensCreateUrl() {
  return `https://api.orbizy.app/itens/create` as const
}

/**
 * @description Cadastra um novo item
 * {@link /itens/create}
 */
export async function postItensCreate(
  data: PostItensCreateMutationRequest,
  config: Partial<RequestConfig<PostItensCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostItensCreateMutationResponse,
    ResponseErrorConfig<PostItensCreate400 | PostItensCreate401 | PostItensCreate404>,
    PostItensCreateMutationRequest
  >({ method: 'POST', url: getPostItensCreateUrl().toString(), data, ...requestConfig })
  return res.data
}