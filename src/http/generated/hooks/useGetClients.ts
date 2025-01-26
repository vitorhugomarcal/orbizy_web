import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsQueryResponse, GetClients401, GetClients404 } from "../models/'ClientsController/GetClients.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getClients } from '../clients/getClients.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getClientsQueryKey = () => [{ url: '/clients' }] as const

export type GetClientsQueryKey = ReturnType<typeof getClientsQueryKey>

export function getClientsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getClientsQueryKey()
  return queryOptions<GetClientsQueryResponse, ResponseErrorConfig<GetClients401 | GetClients404>, GetClientsQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClients(config)
    },
  })
}

/**
 * @description Retrieve all clients
 * {@link /clients}
 */
export function useGetClients<TData = GetClientsQueryResponse, TQueryData = GetClientsQueryResponse, TQueryKey extends QueryKey = GetClientsQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetClientsQueryResponse, ResponseErrorConfig<GetClients401 | GetClients404>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsQueryKey()

  const query = useQuery({
    ...(getClientsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetClients401 | GetClients404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}