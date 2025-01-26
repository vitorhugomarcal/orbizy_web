import client from '@kubb/plugin-client/clients/axios'
import type {
  PostUnitCreateMutationRequest,
  PostUnitCreateMutationResponse,
  PostUnitCreate400,
  PostUnitCreate401,
} from "../models/'UnitController/PostUnitCreate.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postUnitCreate } from '../clients/postUnitCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const postUnitCreateMutationKey = () => [{ url: '/unit/create' }] as const

export type PostUnitCreateMutationKey = ReturnType<typeof postUnitCreateMutationKey>

/**
 * @description Create a new world unit
 * {@link /unit/create}
 */
export function usePostUnitCreate(
  options: {
    mutation?: UseMutationOptions<
      PostUnitCreateMutationResponse,
      ResponseErrorConfig<PostUnitCreate400 | PostUnitCreate401>,
      { data: PostUnitCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostUnitCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postUnitCreateMutationKey()

  return useMutation<PostUnitCreateMutationResponse, ResponseErrorConfig<PostUnitCreate400 | PostUnitCreate401>, { data: PostUnitCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postUnitCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}