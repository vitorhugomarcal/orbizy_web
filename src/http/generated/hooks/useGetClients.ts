import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsQueryResponse } from '../models/GetClients.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getClientsQueryKey = () => [{ url: '/clients' }] as const

export type GetClientsQueryKey = ReturnType<typeof getClientsQueryKey>

/**
 * {@link /clients}
 */
export async function getClients(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/clients`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getClientsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getClientsQueryKey()
  return queryOptions<GetClientsQueryResponse, ResponseErrorConfig<Error>, GetClientsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClients(config)
    },
  })
}

/**
 * {@link /clients}
 */
export function useGetClients<TData = GetClientsQueryResponse, TQueryData = GetClientsQueryResponse, TQueryKey extends QueryKey = GetClientsQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetClientsQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsQueryKey()

  const query = useQuery({
    ...(getClientsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}