import client from '@kubb/plugin-client/clients/axios'
import type { PostSupplierRegisterMutationRequest, PostSupplierRegisterMutationResponse } from '../models/PostSupplierRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postSupplierRegisterMutationKey = () => [{ url: '/supplier/register' }] as const

export type PostSupplierRegisterMutationKey = ReturnType<typeof postSupplierRegisterMutationKey>

/**
 * {@link /supplier/register}
 */
export async function postSupplierRegister(
  data: PostSupplierRegisterMutationRequest,
  config: Partial<RequestConfig<PostSupplierRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostSupplierRegisterMutationResponse, ResponseErrorConfig<Error>, PostSupplierRegisterMutationRequest>({
    method: 'POST',
    url: `/supplier/register`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /supplier/register}
 */
export function usePostSupplierRegister(
  options: {
    mutation?: UseMutationOptions<PostSupplierRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostSupplierRegisterMutationRequest }>
    client?: Partial<RequestConfig<PostSupplierRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postSupplierRegisterMutationKey()

  return useMutation<PostSupplierRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostSupplierRegisterMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postSupplierRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}