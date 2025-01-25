import client from '@kubb/plugin-client/clients/axios'
import type { GetEstimateQueryResponse } from '../models/GetEstimate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getEstimate } from '../clients/getEstimate.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getEstimateQueryKey = () => [{ url: '/estimate' }] as const

export type GetEstimateQueryKey = ReturnType<typeof getEstimateQueryKey>

export function getEstimateQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getEstimateQueryKey()
  return queryOptions<GetEstimateQueryResponse, ResponseErrorConfig<Error>, GetEstimateQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimate(config)
    },
  })
}

/**
 * {@link /estimate}
 */
export function useGetEstimate<TData = GetEstimateQueryResponse, TQueryData = GetEstimateQueryResponse, TQueryKey extends QueryKey = GetEstimateQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetEstimateQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getEstimateQueryKey()

  const query = useQuery({
    ...(getEstimateQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}