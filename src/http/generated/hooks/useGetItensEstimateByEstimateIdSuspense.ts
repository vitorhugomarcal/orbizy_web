import client from '@kubb/plugin-client/clients/axios'
import type {
  GetItensEstimateByEstimateIdQueryResponse,
  GetItensEstimateByEstimateIdPathParams,
  GetItensEstimateByEstimateId401,
  GetItensEstimateByEstimateId404,
} from '../models/EstimateItemController/GetItensEstimateByEstimateId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getItensEstimateByEstimateIdSuspenseQueryKey = (estimateId: GetItensEstimateByEstimateIdPathParams['estimateId']) =>
  [{ url: '/itens/estimate/:estimateId', params: { estimateId: estimateId } }] as const

export type GetItensEstimateByEstimateIdSuspenseQueryKey = ReturnType<typeof getItensEstimateByEstimateIdSuspenseQueryKey>

/**
 * @description Get all estimate items by estimate ID
 * {@link /itens/estimate/:estimateId}
 */
export async function getItensEstimateByEstimateIdSuspense(
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

export function getItensEstimateByEstimateIdSuspenseQueryOptions(
  estimateId: GetItensEstimateByEstimateIdPathParams['estimateId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getItensEstimateByEstimateIdSuspenseQueryKey(estimateId)
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
      return getItensEstimateByEstimateIdSuspense(estimateId, config)
    },
  })
}

/**
 * @description Get all estimate items by estimate ID
 * {@link /itens/estimate/:estimateId}
 */
export function useGetItensEstimateByEstimateIdSuspense<
  TData = GetItensEstimateByEstimateIdQueryResponse,
  TQueryData = GetItensEstimateByEstimateIdQueryResponse,
  TQueryKey extends QueryKey = GetItensEstimateByEstimateIdSuspenseQueryKey,
>(
  estimateId: GetItensEstimateByEstimateIdPathParams['estimateId'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetItensEstimateByEstimateIdQueryResponse,
        ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensEstimateByEstimateIdSuspenseQueryKey(estimateId)

  const query = useSuspenseQuery({
    ...(getItensEstimateByEstimateIdSuspenseQueryOptions(estimateId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetItensEstimateByEstimateId401 | GetItensEstimateByEstimateId404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}