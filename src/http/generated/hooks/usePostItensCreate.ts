import client from '@kubb/plugin-client/clients/axios'
import type { PostItensCreateMutationRequest, PostItensCreateMutationResponse } from '../models/PostItensCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postItensCreateMutationKey = () => [{ url: '/itens/create' }] as const

export type PostItensCreateMutationKey = ReturnType<typeof postItensCreateMutationKey>

/**
 * {@link /itens/create}
 */
export async function postItensCreate(
  data: PostItensCreateMutationRequest,
  config: Partial<RequestConfig<PostItensCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostItensCreateMutationResponse, ResponseErrorConfig<Error>, PostItensCreateMutationRequest>({
    method: 'POST',
    url: `/itens/create`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /itens/create}
 */
export function usePostItensCreate(
  options: {
    mutation?: UseMutationOptions<PostItensCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostItensCreateMutationRequest }>
    client?: Partial<RequestConfig<PostItensCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postItensCreateMutationKey()

  return useMutation<PostItensCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostItensCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postItensCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}