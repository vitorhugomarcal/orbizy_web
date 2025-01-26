import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsQueryResponse, GetClients401, GetClients404 } from '../models/ClientsController/GetClients.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getClientsSuspenseQueryKey = () => [{ url: '/clients' }] as const

export type GetClientsSuspenseQueryKey = ReturnType<typeof getClientsSuspenseQueryKey>

/**
 * @description Retrieve all clients
 * {@link /clients}
 */
export async function getClientsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetClientsQueryResponse, ResponseErrorConfig<GetClients401 | GetClients404>, unknown>({
    method: 'GET',
    url: `/clients`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getClientsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getClientsSuspenseQueryKey()
  return queryOptions<GetClientsQueryResponse, ResponseErrorConfig<GetClients401 | GetClients404>, GetClientsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsSuspense(config)
    },
  })
}

/**
 * @description Retrieve all clients
 * {@link /clients}
 */
export function useGetClientsSuspense<
  TData = GetClientsQueryResponse,
  TQueryData = GetClientsQueryResponse,
  TQueryKey extends QueryKey = GetClientsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetClientsQueryResponse, ResponseErrorConfig<GetClients401 | GetClients404>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getClientsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetClients401 | GetClients404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}