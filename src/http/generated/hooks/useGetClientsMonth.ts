import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsMonthQueryResponse } from '../models/GetClientsMonth.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getClientsMonthQueryKey = () => [{ url: '/clients/month' }] as const

export type GetClientsMonthQueryKey = ReturnType<typeof getClientsMonthQueryKey>

/**
 * {@link /clients/month}
 */
export async function getClientsMonth(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsMonthQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/clients/month`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getClientsMonthQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getClientsMonthQueryKey()
  return queryOptions<GetClientsMonthQueryResponse, ResponseErrorConfig<Error>, GetClientsMonthQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsMonth(config)
    },
  })
}

/**
 * {@link /clients/month}
 */
export function useGetClientsMonth<
  TData = GetClientsMonthQueryResponse,
  TQueryData = GetClientsMonthQueryResponse,
  TQueryKey extends QueryKey = GetClientsMonthQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<GetClientsMonthQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsMonthQueryKey()

  const query = useQuery({
    ...(getClientsMonthQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}