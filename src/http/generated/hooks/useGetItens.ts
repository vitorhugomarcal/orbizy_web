import client from '@kubb/plugin-client/clients/axios'
import type { GetItensQueryResponse } from '../models/GetItens.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getItens } from '../clients/getItens.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getItensQueryKey = () => [{ url: '/itens' }] as const

export type GetItensQueryKey = ReturnType<typeof getItensQueryKey>

export function getItensQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getItensQueryKey()
  return queryOptions<GetItensQueryResponse, ResponseErrorConfig<Error>, GetItensQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItens(config)
    },
  })
}

/**
 * {@link /itens}
 */
export function useGetItens<TData = GetItensQueryResponse, TQueryData = GetItensQueryResponse, TQueryKey extends QueryKey = GetItensQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetItensQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensQueryKey()

  const query = useQuery({
    ...(getItensQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}