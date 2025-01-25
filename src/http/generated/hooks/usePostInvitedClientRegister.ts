import client from '@kubb/plugin-client/clients/axios'
import type { PostInvitedClientRegisterMutationRequest, PostInvitedClientRegisterMutationResponse } from '../models/PostInvitedClientRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postInvitedClientRegisterMutationKey = () => [{ url: '/invited/client/register' }] as const

export type PostInvitedClientRegisterMutationKey = ReturnType<typeof postInvitedClientRegisterMutationKey>

/**
 * {@link /invited/client/register}
 */
export async function postInvitedClientRegister(
  data: PostInvitedClientRegisterMutationRequest,
  config: Partial<RequestConfig<PostInvitedClientRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostInvitedClientRegisterMutationResponse, ResponseErrorConfig<Error>, PostInvitedClientRegisterMutationRequest>({
    method: 'POST',
    url: `/invited/client/register`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /invited/client/register}
 */
export function usePostInvitedClientRegister(
  options: {
    mutation?: UseMutationOptions<PostInvitedClientRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostInvitedClientRegisterMutationRequest }>
    client?: Partial<RequestConfig<PostInvitedClientRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postInvitedClientRegisterMutationKey()

  return useMutation<PostInvitedClientRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostInvitedClientRegisterMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postInvitedClientRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}