import client from '@kubb/plugin-client/clients/axios'
import type { GetUnitsQueryResponse, GetUnits401, GetUnits404 } from "../models/'UnitController/GetUnits.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getUnits } from '../clients/getUnits.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getUnitsSuspenseQueryKey = () => [{ url: '/units' }] as const

export type GetUnitsSuspenseQueryKey = ReturnType<typeof getUnitsSuspenseQueryKey>

export function getUnitsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getUnitsSuspenseQueryKey()
  return queryOptions<GetUnitsQueryResponse, ResponseErrorConfig<GetUnits401 | GetUnits404>, GetUnitsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUnits(config)
    },
  })
}

/**
 * @description Get all units
 * {@link /units}
 */
export function useGetUnitsSuspense<TData = GetUnitsQueryResponse, TQueryData = GetUnitsQueryResponse, TQueryKey extends QueryKey = GetUnitsSuspenseQueryKey>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetUnitsQueryResponse, ResponseErrorConfig<GetUnits401 | GetUnits404>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUnitsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getUnitsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetUnits401 | GetUnits404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}