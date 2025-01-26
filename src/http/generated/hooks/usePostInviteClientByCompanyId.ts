import client from '@kubb/plugin-client/clients/axios'
import type {
  PostInviteClientByCompanyIdMutationResponse,
  PostInviteClientByCompanyIdPathParams,
  PostInviteClientByCompanyId400,
  PostInviteClientByCompanyId404,
  PostInviteClientByCompanyId429,
} from '../models/InviteController/PostInviteClientByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { postInviteClientByCompanyId } from '../clients/postInviteClientByCompanyId.ts'
import { useMutation } from '@tanstack/react-query'

export const postInviteClientByCompanyIdMutationKey = () => [{ url: '/invite/client/{companyId}' }] as const

export type PostInviteClientByCompanyIdMutationKey = ReturnType<typeof postInviteClientByCompanyIdMutationKey>

/**
 * @description Send a invite link to the user
 * {@link /invite/client/:companyId}
 */
export function usePostInviteClientByCompanyId(
  options: {
    mutation?: UseMutationOptions<
      PostInviteClientByCompanyIdMutationResponse,
      ResponseErrorConfig<PostInviteClientByCompanyId400 | PostInviteClientByCompanyId404 | PostInviteClientByCompanyId429>,
      { companyId: PostInviteClientByCompanyIdPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postInviteClientByCompanyIdMutationKey()

  return useMutation<
    PostInviteClientByCompanyIdMutationResponse,
    ResponseErrorConfig<PostInviteClientByCompanyId400 | PostInviteClientByCompanyId404 | PostInviteClientByCompanyId429>,
    { companyId: PostInviteClientByCompanyIdPathParams['companyId'] }
  >({
    mutationFn: async ({ companyId }) => {
      return postInviteClientByCompanyId(companyId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}