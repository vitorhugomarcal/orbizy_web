import client from '@kubb/plugin-client/clients/axios'
import type { GetUnitsQueryResponse, GetUnits401, GetUnits404 } from "../models/'UnitController/GetUnits.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getUnits } from '../clients/getUnits.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUnitsQueryKey = () => [{ url: '/units' }] as const

export type GetUnitsQueryKey = ReturnType<typeof getUnitsQueryKey>

export function getUnitsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getUnitsQueryKey()
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
export function useGetUnits<TData = GetUnitsQueryResponse, TQueryData = GetUnitsQueryResponse, TQueryKey extends QueryKey = GetUnitsQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetUnitsQueryResponse, ResponseErrorConfig<GetUnits401 | GetUnits404>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUnitsQueryKey()

  const query = useQuery({
    ...(getUnitsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetUnits401 | GetUnits404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}