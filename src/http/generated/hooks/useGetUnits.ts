import client from '@kubb/plugin-client/clients/axios'
import type { GetUnitsQueryResponse } from '../models/GetUnits.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUnitsQueryKey = () => [{ url: '/units' }] as const

export type GetUnitsQueryKey = ReturnType<typeof getUnitsQueryKey>

/**
 * {@link /units}
 */
export async function getUnits(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUnitsQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/units`, ...requestConfig })
  return res.data
}

export function getUnitsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getUnitsQueryKey()
  return queryOptions<GetUnitsQueryResponse, ResponseErrorConfig<Error>, GetUnitsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUnits(config)
    },
  })
}

/**
 * {@link /units}
 */
export function useGetUnits<TData = GetUnitsQueryResponse, TQueryData = GetUnitsQueryResponse, TQueryKey extends QueryKey = GetUnitsQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetUnitsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUnitsQueryKey()

  const query = useQuery({
    ...(getUnitsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}