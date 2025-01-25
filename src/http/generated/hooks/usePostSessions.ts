import client from '@kubb/plugin-client/clients/axios'
import type { PostSessionsMutationRequest, PostSessionsMutationResponse } from '../models/PostSessions.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postSessions } from '../clients/postSessions.ts'
import { useMutation } from '@tanstack/react-query'

export const postSessionsMutationKey = () => [{ url: '/sessions' }] as const

export type PostSessionsMutationKey = ReturnType<typeof postSessionsMutationKey>

/**
 * {@link /sessions}
 */
export function usePostSessions(
  options: {
    mutation?: UseMutationOptions<PostSessionsMutationResponse, ResponseErrorConfig<Error>, { data: PostSessionsMutationRequest }>
    client?: Partial<RequestConfig<PostSessionsMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postSessionsMutationKey()

  return useMutation<PostSessionsMutationResponse, ResponseErrorConfig<Error>, { data: PostSessionsMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postSessions(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}