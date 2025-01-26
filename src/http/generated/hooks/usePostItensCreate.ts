import client from '@kubb/plugin-client/clients/axios'
import type {
  PostItensCreateMutationRequest,
  PostItensCreateMutationResponse,
  PostItensCreate400,
  PostItensCreate401,
  PostItensCreate404,
} from '../models/ItensController/PostItensCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postItensCreate } from '../clients/postItensCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const postItensCreateMutationKey = () => [{ url: '/itens/create' }] as const

export type PostItensCreateMutationKey = ReturnType<typeof postItensCreateMutationKey>

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