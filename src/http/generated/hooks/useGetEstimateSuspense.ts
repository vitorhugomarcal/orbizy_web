import client from '@kubb/plugin-client/clients/axios'
import type { GetEstimateQueryResponse, GetEstimate401, GetEstimate404 } from '../models/EstimateController/GetEstimate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getEstimate } from '../clients/getEstimate.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getEstimateSuspenseQueryKey = () => [{ url: '/estimate' }] as const

export type GetEstimateSuspenseQueryKey = ReturnType<typeof getEstimateSuspenseQueryKey>

export function getEstimateSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getEstimateSuspenseQueryKey()
  return queryOptions<GetEstimateQueryResponse, ResponseErrorConfig<GetEstimate401 | GetEstimate404>, GetEstimateQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimate(config)
    },
  })
}

/**
 * @description Get all estimates
 * {@link /estimate}
 */
export function useGetEstimateSuspense<
  TData = GetEstimateQueryResponse,
  TQueryData = GetEstimateQueryResponse,
  TQueryKey extends QueryKey = GetEstimateSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetEstimateQueryResponse, ResponseErrorConfig<GetEstimate401 | GetEstimate404>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getEstimateSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getEstimateSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetEstimate401 | GetEstimate404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}