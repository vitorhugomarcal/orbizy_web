import client from '@kubb/plugin-client/clients/axios'
import type { GetUnitsQueryResponse } from '../models/GetUnits.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetUnitsUrl() {
  return `https://api.orbizy.app/units` as const
}

/**
 * {@link /units}
 */
export async function getUnits(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUnitsQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: getGetUnitsUrl().toString(), ...requestConfig })
  return res.data
}