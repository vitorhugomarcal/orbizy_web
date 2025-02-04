import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { GetClientsAllQueryResponse, GetClientsAll401, GetClientsAll404 } from '../models/ClientsController/GetClientsAll.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getClientsAllQueryKey = () => [{ url: '/clients/all' }] as const

export type GetClientsAllQueryKey = ReturnType<typeof getClientsAllQueryKey>

/**
 * @description Get all clients
 * {@link /clients/all}
 */
export async function getClientsAll(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsAllQueryResponse, ResponseErrorConfig<GetClientsAll401 | GetClientsAll404>, unknown>({
    method: 'GET',
    url: `/clients/all`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getClientsAllQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getClientsAllQueryKey()
  return queryOptions<GetClientsAllQueryResponse, ResponseErrorConfig<GetClientsAll401 | GetClientsAll404>, GetClientsAllQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsAll(config)
    },
  })
}

/**
 * @description Get all clients
 * {@link /clients/all}
 */
export function useGetClientsAll<
  TData = GetClientsAllQueryResponse,
  TQueryData = GetClientsAllQueryResponse,
  TQueryKey extends QueryKey = GetClientsAllQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<GetClientsAllQueryResponse, ResponseErrorConfig<GetClientsAll401 | GetClientsAll404>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsAllQueryKey()

  const query = useQuery({
    ...(getClientsAllQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetClientsAll401 | GetClientsAll404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}