import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostItensCreateMutationRequest,
  PostItensCreateMutationResponse,
  PostItensCreate400,
  PostItensCreate401,
  PostItensCreate404,
} from '../models/ItensController/PostItensCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postItensCreateMutationKey = () => [{ url: '/itens/create' }] as const

export type PostItensCreateMutationKey = ReturnType<typeof postItensCreateMutationKey>

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
  >({ method: 'POST', url: `/itens/create`, baseURL: 'http://192.168.1.81:3333', data, ...requestConfig })
  return res.data
}

/**
 * @description Cadastra um novo item
 * {@link /itens/create}
 */
export function usePostItensCreate(
  options: {
    mutation?: UseMutationOptions<
      PostItensCreateMutationResponse,
      ResponseErrorConfig<PostItensCreate400 | PostItensCreate401 | PostItensCreate404>,
      { data: PostItensCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostItensCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postItensCreateMutationKey()

  return useMutation<
    PostItensCreateMutationResponse,
    ResponseErrorConfig<PostItensCreate400 | PostItensCreate401 | PostItensCreate404>,
    { data: PostItensCreateMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postItensCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}