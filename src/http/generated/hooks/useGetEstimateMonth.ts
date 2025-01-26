import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { GetEstimateMonthQueryResponse, GetEstimateMonth401, GetEstimateMonth404 } from '../models/EstimateController/GetEstimateMonth.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getEstimateMonthQueryKey = () => [{ url: '/estimate/month' }] as const

export type GetEstimateMonthQueryKey = ReturnType<typeof getEstimateMonthQueryKey>

/**
 * @description Get monthly estimates statistics
 * {@link /estimate/month}
 */
export async function getEstimateMonth(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetEstimateMonthQueryResponse, ResponseErrorConfig<GetEstimateMonth401 | GetEstimateMonth404>, unknown>({
    method: 'GET',
    url: `/estimate/month`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getEstimateMonthQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getEstimateMonthQueryKey()
  return queryOptions<
    GetEstimateMonthQueryResponse,
    ResponseErrorConfig<GetEstimateMonth401 | GetEstimateMonth404>,
    GetEstimateMonthQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimateMonth(config)
    },
  })
}

/**
 * @description Get monthly estimates statistics
 * {@link /estimate/month}
 */
export function useGetEstimateMonth<
  TData = GetEstimateMonthQueryResponse,
  TQueryData = GetEstimateMonthQueryResponse,
  TQueryKey extends QueryKey = GetEstimateMonthQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<GetEstimateMonthQueryResponse, ResponseErrorConfig<GetEstimateMonth401 | GetEstimateMonth404>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getEstimateMonthQueryKey()

  const query = useQuery({
    ...(getEstimateMonthQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetEstimateMonth401 | GetEstimateMonth404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}