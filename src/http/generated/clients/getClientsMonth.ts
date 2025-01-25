import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsMonthQueryResponse } from '../models/GetClientsMonth.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetClientsMonthUrl() {
  return `https://api.orbizy.app/clients/month` as const
}

/**
 * {@link /clients/month}
 */
export async function getClientsMonth(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsMonthQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetClientsMonthUrl().toString(),
    ...requestConfig,
  })
  return res.data
}