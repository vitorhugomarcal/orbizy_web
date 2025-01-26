import client from '@kubb/plugin-client/clients/axios'
import type {
  GetItensEstimateByEstimateIdQueryResponse,
  GetItensEstimateByEstimateIdPathParams,
  GetItensEstimateByEstimateId401,
  GetItensEstimateByEstimateId404,
} from '../models/EstimateItemController/GetItensEstimateByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getItensEstimateByEstimateIdQueryKey = (estimateId: GetItensEstimateByEstimateIdPathParams['estimateId']) =>
  [{ url: '/itens/estimate/:estimateId', params: { estimateId: estimateId } }] as const

export type GetItensEstimateByEstimateIdQueryKey = ReturnType<typeof getItensEstimateByEstimateIdQueryKey>

/**
 * @description Get all estimate items by estimate ID
 * {@link /itens/estimate/:estimateId}
 */
export async function getItensEstimateByEstimateId(
  estimateId: GetItensEstimateByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetItensEstimateByEstimateIdQueryResponse,
    ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>,
    unknown
  >({ method: 'GET', url: `/itens/estimate/${estimateId}`, baseURL: 'https://api.orbizy.app', ...requestConfig })
  return res.data
}

export function getItensEstimateByEstimateIdQueryOptions(
  estimateId: GetItensEstimateByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getItensEstimateByEstimateIdQueryKey(estimateId)
  return queryOptions<
    GetItensEstimateByEstimateIdQueryResponse,
    ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>,
    GetItensEstimateByEstimateIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!estimateId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItensEstimateByEstimateId(estimateId, config)
    },
  })
}

/**
 * @description Get all estimate items by estimate ID
 * {@link /itens/estimate/:estimateId}
 */
export function useGetItensEstimateByEstimateId<
  TData = GetItensEstimateByEstimateIdQueryResponse,
  TQueryData = GetItensEstimateByEstimateIdQueryResponse,
  TQueryKey extends QueryKey = GetItensEstimateByEstimateIdQueryKey,
>(
  estimateId: GetItensEstimateByEstimateIdPathParams['estimateId'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetItensEstimateByEstimateIdQueryResponse,
        ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensEstimateByEstimateIdQueryKey(estimateId)

  const query = useQuery({
    ...(getItensEstimateByEstimateIdQueryOptions(estimateId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}