import client from '@kubb/plugin-client/clients/axios'
import type { PostClientRegisterMutationRequest, PostClientRegisterMutationResponse } from '../models/PostClientRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postClientRegisterMutationKey = () => [{ url: '/client/register' }] as const

export type PostClientRegisterMutationKey = ReturnType<typeof postClientRegisterMutationKey>

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
    url: `/client/register`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /client/register}
 */
export function usePostClientRegister(
  options: {
    mutation?: UseMutationOptions<PostClientRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostClientRegisterMutationRequest }>
    client?: Partial<RequestConfig<PostClientRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postClientRegisterMutationKey()

  return useMutation<PostClientRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostClientRegisterMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postClientRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}