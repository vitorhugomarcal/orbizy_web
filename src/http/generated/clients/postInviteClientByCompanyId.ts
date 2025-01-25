import client from '@kubb/plugin-client/clients/axios'
import type { PostInviteClientByCompanyIdMutationResponse, PostInviteClientByCompanyIdPathParams } from '../models/PostInviteClientByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getPostInviteClientByCompanyIdUrl(companyId: PostInviteClientByCompanyIdPathParams['companyId']) {
  return `https://api.orbizy.app/invite/client/${companyId}` as const
}

/**
 * {@link /invite/client/:companyId}
 */
export async function postInviteClientByCompanyId(
  companyId: PostInviteClientByCompanyIdPathParams['companyId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostInviteClientByCompanyIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getPostInviteClientByCompanyIdUrl(companyId).toString(),
    ...requestConfig,
  })
  return res.data
}