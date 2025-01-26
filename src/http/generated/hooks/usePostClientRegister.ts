import client from '@kubb/plugin-client/clients/axios'
import type {
  PostClientRegisterMutationRequest,
  PostClientRegisterMutationResponse,
  PostClientRegister400,
  PostClientRegister401,
} from "../models/'ClientsController/PostClientRegister.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postClientRegister } from '../clients/postClientRegister.ts'
import { useMutation } from '@tanstack/react-query'

export const postClientRegisterMutationKey = () => [{ url: '/client/register' }] as const

export type PostClientRegisterMutationKey = ReturnType<typeof postClientRegisterMutationKey>

/**
 * @description Register a new client (individual or corporate)
 * {@link /client/register}
 */
export function usePostClientRegister(
  options: {
    mutation?: UseMutationOptions<
      PostClientRegisterMutationResponse,
      ResponseErrorConfig<PostClientRegister400 | PostClientRegister401>,
      { data: PostClientRegisterMutationRequest }
    >
    client?: Partial<RequestConfig<PostClientRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postClientRegisterMutationKey()

  return useMutation<
    PostClientRegisterMutationResponse,
    ResponseErrorConfig<PostClientRegister400 | PostClientRegister401>,
    { data: PostClientRegisterMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postClientRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}