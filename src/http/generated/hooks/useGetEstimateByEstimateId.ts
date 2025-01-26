import client from '@kubb/plugin-client/clients/axios'
import type {
  GetEstimateByEstimateIdQueryResponse,
  GetEstimateByEstimateIdPathParams,
  GetEstimateByEstimateId401,
  GetEstimateByEstimateId404,
} from "../models/'EstimateController/GetEstimateByEstimateId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getEstimateByEstimateId } from '../clients/getEstimateByEstimateId.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getEstimateByEstimateIdQueryKey = (estimateId: GetEstimateByEstimateIdPathParams['estimateId']) =>
  [{ url: '/estimate/:estimateId', params: { estimateId: estimateId } }] as const

export type GetEstimateByEstimateIdQueryKey = ReturnType<typeof getEstimateByEstimateIdQueryKey>

export function getEstimateByEstimateIdQueryOptions(
  estimateId: GetEstimateByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getEstimateByEstimateIdQueryKey(estimateId)
  return queryOptions<
    GetEstimateByEstimateIdQueryResponse,
    ResponseErrorConfig<GetEstimateByEstimateId401 | GetEstimateByEstimateId404>,
    GetEstimateByEstimateIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!estimateId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimateByEstimateId(estimateId, config)
    },
  })
}

/**
 * @description Get a estimate by ID
 * {@link /estimate/:estimateId}
 */
export function useGetEstimateByEstimateId<
  TData = GetEstimateByEstimateIdQueryResponse,
  TQueryData = GetEstimateByEstimateIdQueryResponse,
  TQueryKey extends QueryKey = GetEstimateByEstimateIdQueryKey,
>(
  estimateId: GetEstimateByEstimateIdPathParams['estimateId'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetEstimateByEstimateIdQueryResponse,
        ResponseErrorConfig<GetEstimateByEstimateId401 | GetEstimateByEstimateId404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getEstimateByEstimateIdQueryKey(estimateId)

  const query = useQuery({
    ...(getEstimateByEstimateIdQueryOptions(estimateId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetEstimateByEstimateId401 | GetEstimateByEstimateId404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}