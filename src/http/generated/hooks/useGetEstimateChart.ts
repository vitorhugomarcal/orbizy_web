import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { GetEstimateChartQueryResponse, GetEstimateChart401, GetEstimateChart404 } from '../models/EstimateController/GetEstimateChart.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getEstimateChartQueryKey = () => [{ url: '/estimate/chart' }] as const

export type GetEstimateChartQueryKey = ReturnType<typeof getEstimateChartQueryKey>

/**
 * @description Get monthly chart statistics
 * {@link /estimate/chart}
 */
export async function getEstimateChart(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetEstimateChartQueryResponse, ResponseErrorConfig<GetEstimateChart401 | GetEstimateChart404>, unknown>({
    method: 'GET',
    url: `/estimate/chart`,
    baseURL: 'http://192.168.1.81:3333',
    ...requestConfig,
  })
  return res.data
}

export function getEstimateChartQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getEstimateChartQueryKey()
  return queryOptions<
    GetEstimateChartQueryResponse,
    ResponseErrorConfig<GetEstimateChart401 | GetEstimateChart404>,
    GetEstimateChartQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimateChart(config)
    },
  })
}

/**
 * @description Get monthly chart statistics
 * {@link /estimate/chart}
 */
export function useGetEstimateChart<
  TData = GetEstimateChartQueryResponse,
  TQueryData = GetEstimateChartQueryResponse,
  TQueryKey extends QueryKey = GetEstimateChartQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<GetEstimateChartQueryResponse, ResponseErrorConfig<GetEstimateChart401 | GetEstimateChart404>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getEstimateChartQueryKey()

  const query = useQuery({
    ...(getEstimateChartQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetEstimateChart401 | GetEstimateChart404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}