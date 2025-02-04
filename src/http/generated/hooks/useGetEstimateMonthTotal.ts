import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  GetEstimateMonthTotalQueryResponse,
  GetEstimateMonthTotal401,
  GetEstimateMonthTotal404,
} from '../models/EstimateController/GetEstimateMonthTotal.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getEstimateMonthTotalQueryKey = () => [{ url: '/estimate/month/total' }] as const

export type GetEstimateMonthTotalQueryKey = ReturnType<typeof getEstimateMonthTotalQueryKey>

/**
 * @description Get monthly estimates approved total statistics
 * {@link /estimate/month/total}
 */
export async function getEstimateMonthTotal(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetEstimateMonthTotalQueryResponse, ResponseErrorConfig<GetEstimateMonthTotal401 | GetEstimateMonthTotal404>, unknown>({
    method: 'GET',
    url: `/estimate/month/total`,
    baseURL: 'http://192.168.1.81:3333',
    ...requestConfig,
  })
  return res.data
}

export function getEstimateMonthTotalQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getEstimateMonthTotalQueryKey()
  return queryOptions<
    GetEstimateMonthTotalQueryResponse,
    ResponseErrorConfig<GetEstimateMonthTotal401 | GetEstimateMonthTotal404>,
    GetEstimateMonthTotalQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimateMonthTotal(config)
    },
  })
}

/**
 * @description Get monthly estimates approved total statistics
 * {@link /estimate/month/total}
 */
export function useGetEstimateMonthTotal<
  TData = GetEstimateMonthTotalQueryResponse,
  TQueryData = GetEstimateMonthTotalQueryResponse,
  TQueryKey extends QueryKey = GetEstimateMonthTotalQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetEstimateMonthTotalQueryResponse,
        ResponseErrorConfig<GetEstimateMonthTotal401 | GetEstimateMonthTotal404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getEstimateMonthTotalQueryKey()

  const query = useQuery({
    ...(getEstimateMonthTotalQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetEstimateMonthTotal401 | GetEstimateMonthTotal404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}