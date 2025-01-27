import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostClientCreateMutationRequest,
  PostClientCreateMutationResponse,
  PostClientCreate400,
  PostClientCreate401,
  PostClientCreate404,
} from '../models/ClientsController/PostClientCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postClientCreateMutationKey = () => [{ url: '/client/create' }] as const

export type PostClientCreateMutationKey = ReturnType<typeof postClientCreateMutationKey>

/**
 * @description Register a new client (individual or corporate)
 * {@link /client/create}
 */
export async function postClientCreate(
  data: PostClientCreateMutationRequest,
  config: Partial<RequestConfig<PostClientCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostClientCreateMutationResponse,
    ResponseErrorConfig<PostClientCreate400 | PostClientCreate401 | PostClientCreate404>,
    PostClientCreateMutationRequest
  >({ method: 'POST', url: `/client/create`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

/**
 * @description Register a new client (individual or corporate)
 * {@link /client/create}
 */
export function usePostClientCreate(
  options: {
    mutation?: UseMutationOptions<
      PostClientCreateMutationResponse,
      ResponseErrorConfig<PostClientCreate400 | PostClientCreate401 | PostClientCreate404>,
      { data: PostClientCreateMutationRequest }
    >
    client?: Partial<RequestConfig<PostClientCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postClientCreateMutationKey()

  return useMutation<
    PostClientCreateMutationResponse,
    ResponseErrorConfig<PostClientCreate400 | PostClientCreate401 | PostClientCreate404>,
    { data: PostClientCreateMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postClientCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}