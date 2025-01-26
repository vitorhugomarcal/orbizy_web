import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostSupplierRegisterMutationRequest,
  PostSupplierRegisterMutationResponse,
  PostSupplierRegister400,
  PostSupplierRegister401,
} from '../models/SupplierController/PostSupplierRegister.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postSupplierRegisterMutationKey = () => [{ url: '/supplier/register' }] as const

export type PostSupplierRegisterMutationKey = ReturnType<typeof postSupplierRegisterMutationKey>

/**
 * @description Create a new supplier
 * {@link /supplier/register}
 */
export async function postSupplierRegister(
  data: PostSupplierRegisterMutationRequest,
  config: Partial<RequestConfig<PostSupplierRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostSupplierRegisterMutationResponse,
    ResponseErrorConfig<PostSupplierRegister400 | PostSupplierRegister401>,
    PostSupplierRegisterMutationRequest
  >({ method: 'POST', url: `/supplier/register`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

/**
 * @description Create a new supplier
 * {@link /supplier/register}
 */
export function usePostSupplierRegister(
  options: {
    mutation?: UseMutationOptions<
      PostSupplierRegisterMutationResponse,
      ResponseErrorConfig<PostSupplierRegister400 | PostSupplierRegister401>,
      { data: PostSupplierRegisterMutationRequest }
    >
    client?: Partial<RequestConfig<PostSupplierRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postSupplierRegisterMutationKey()

  return useMutation<
    PostSupplierRegisterMutationResponse,
    ResponseErrorConfig<PostSupplierRegister400 | PostSupplierRegister401>,
    { data: PostSupplierRegisterMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postSupplierRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}