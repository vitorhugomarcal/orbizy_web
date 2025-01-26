import client from '@kubb/plugin-client/clients/axios'
import type {
  PostInvitedClientRegisterMutationRequest,
  PostInvitedClientRegisterMutationResponse,
  PostInvitedClientRegister400,
} from "../models/'InviteController/PostInvitedClientRegister.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postInvitedClientRegister } from '../clients/postInvitedClientRegister.ts'
import { useMutation } from '@tanstack/react-query'

export const postInvitedClientRegisterMutationKey = () => [{ url: '/invited/client/register' }] as const

export type PostInvitedClientRegisterMutationKey = ReturnType<typeof postInvitedClientRegisterMutationKey>

/**
 * @description Registrar um novo cliente
 * {@link /invited/client/register}
 */
export function usePostInvitedClientRegister(
  options: {
    mutation?: UseMutationOptions<
      PostInvitedClientRegisterMutationResponse,
      ResponseErrorConfig<PostInvitedClientRegister400>,
      { data: PostInvitedClientRegisterMutationRequest }
    >
    client?: Partial<RequestConfig<PostInvitedClientRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postInvitedClientRegisterMutationKey()

  return useMutation<
    PostInvitedClientRegisterMutationResponse,
    ResponseErrorConfig<PostInvitedClientRegister400>,
    { data: PostInvitedClientRegisterMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postInvitedClientRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}