import client from '@kubb/plugin-client/clients/axios'
import type { GetUnitsQueryResponse, GetUnits401, GetUnits404 } from '../models/UnitController/GetUnits.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

export function getGetUnitsUrl() {
  return `https://api.orbizy.app/units` as const
}

/**
 * @description Get all units
 * {@link /units}
 */
export async function getUnits(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUnitsQueryResponse, ResponseErrorConfig<GetUnits401 | GetUnits404>, unknown>({
    method: 'GET',
    url: getGetUnitsUrl().toString(),
    ...requestConfig,
  })
  return res.data
}