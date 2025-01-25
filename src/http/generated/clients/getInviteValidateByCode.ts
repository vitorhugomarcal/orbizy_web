import client from '@kubb/plugin-client/clients/axios'
import type { GetInviteValidateByCodeQueryResponse, GetInviteValidateByCodePathParams } from '../models/GetInviteValidateByCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetInviteValidateByCodeUrl(code: GetInviteValidateByCodePathParams['code']) {
  return `https://api.orbizy.app/invite/validate/${code}` as const
}

/**
 * {@link /invite/validate/:code}
 */
export async function getInviteValidateByCode(
  code: GetInviteValidateByCodePathParams['code'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetInviteValidateByCodeQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetInviteValidateByCodeUrl(code).toString(),
    ...requestConfig,
  })
  return res.data
}