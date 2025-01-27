import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostClientRegisterMutationRequest,
  PostClientRegisterMutationResponse,
  PostClientRegister400,
  PostClientRegister401,
  PostClientRegister404,
} from '../models/ClientsController/PostClientRegister.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postClientRegisterMutationKey = () => [{ url: '/client/register' }] as const

export type PostClientRegisterMutationKey = ReturnType<typeof postClientRegisterMutationKey>

/**
 * @description Register a new client (individual or corporate)
 * {@link /client/register}
 */
export async function postClientRegister(
  data: PostClientRegisterMutationRequest,
  config: Partial<RequestConfig<PostClientRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostClientRegisterMutationResponse,
    ResponseErrorConfig<PostClientRegister400 | PostClientRegister401 | PostClientRegister404>,
    PostClientRegisterMutationRequest
  >({ method: 'POST', url: `/client/register`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

/**
 * @description Register a new client (individual or corporate)
 * {@link /client/register}
 */
export function usePostClientRegister(
  options: {
    mutation?: UseMutationOptions<
      PostClientRegisterMutationResponse,
      ResponseErrorConfig<PostClientRegister400 | PostClientRegister401 | PostClientRegister404>,
      { data: PostClientRegisterMutationRequest }
    >
    client?: Partial<RequestConfig<PostClientRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postClientRegisterMutationKey()

  return useMutation<
    PostClientRegisterMutationResponse,
    ResponseErrorConfig<PostClientRegister400 | PostClientRegister401 | PostClientRegister404>,
    { data: PostClientRegisterMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postClientRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}