import client from '@kubb/plugin-client/clients/axios'
import type { PostMeCreateMutationRequest, PostMeCreateMutationResponse, PostMeCreate400 } from '../models/UserController/PostMeCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postMeCreate } from '../clients/postMeCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const postMeCreateMutationKey = () => [{ url: '/me/create' }] as const

export type PostMeCreateMutationKey = ReturnType<typeof postMeCreateMutationKey>

/**
 * @description Create a new user
 * {@link /me/create}
 */
export function usePostMeCreate(
  options: {
    mutation?: UseMutationOptions<PostMeCreateMutationResponse, ResponseErrorConfig<PostMeCreate400>, { data: PostMeCreateMutationRequest }>
    client?: Partial<RequestConfig<PostMeCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postMeCreateMutationKey()

  return useMutation<PostMeCreateMutationResponse, ResponseErrorConfig<PostMeCreate400>, { data: PostMeCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postMeCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}