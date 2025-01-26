import client from '@kubb/plugin-client/clients/axios'
import type { GetAuthVerifyQueryResponse, GetAuthVerifyQueryParams, GetAuthVerify401 } from '../models/AuthController/GetAuthVerify.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetAuthVerifyUrl() {
  return `https://api.orbizy.app/auth/verify` as const
}

/**
 * @description Verifica e autentica o link de convite
 * {@link /auth/verify}
 */
export async function getAuthVerify(params: GetAuthVerifyQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetAuthVerifyQueryResponse, ResponseErrorConfig<GetAuthVerify401>, unknown>({
    method: 'GET',
    url: getGetAuthVerifyUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}