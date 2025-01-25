import client from '@kubb/plugin-client/clients/axios'
import type { PostSupplierRegisterMutationRequest, PostSupplierRegisterMutationResponse } from '../models/PostSupplierRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postSupplierRegister } from '../clients/postSupplierRegister.ts'
import { useMutation } from '@tanstack/react-query'

export const postSupplierRegisterMutationKey = () => [{ url: '/supplier/register' }] as const

export type PostSupplierRegisterMutationKey = ReturnType<typeof postSupplierRegisterMutationKey>

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