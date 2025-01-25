import client from '@kubb/plugin-client/clients/axios'
import type { PostInviteClientByCompanyIdMutationResponse, PostInviteClientByCompanyIdPathParams } from '../models/PostInviteClientByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postInviteClientByCompanyIdMutationKey = () => [{ url: '/invite/client/{companyId}' }] as const

export type PostInviteClientByCompanyIdMutationKey = ReturnType<typeof postInviteClientByCompanyIdMutationKey>

/**
 * {@link /invite/client/:companyId}
 */
export async function postInviteClientByCompanyId(
  { companyId }: { companyId: PostInviteClientByCompanyIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostInviteClientByCompanyIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: `/invite/client/${companyId}`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /invite/client/:companyId}
 */
export function usePostInviteClientByCompanyId(
  options: {
    mutation?: UseMutationOptions<
      PostInviteClientByCompanyIdMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: PostInviteClientByCompanyIdPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postInviteClientByCompanyIdMutationKey()

  return useMutation<
    PostInviteClientByCompanyIdMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: PostInviteClientByCompanyIdPathParams['companyId'] }
  >({
    mutationFn: async ({ companyId }) => {
      return postInviteClientByCompanyId({ companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}