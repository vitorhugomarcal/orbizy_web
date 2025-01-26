import client from '@kubb/plugin-client/clients/axios'
import type {
  GetItensByItemIdQueryResponse,
  GetItensByItemIdPathParams,
  GetItensByItemId401,
  GetItensByItemId404,
} from "../models/'ItensController/GetItensByItemId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getItensByItemId } from '../clients/getItensByItemId.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getItensByItemIdQueryKey = (itemId: GetItensByItemIdPathParams['itemId']) => [{ url: '/itens/:itemId', params: { itemId: itemId } }] as const

export type GetItensByItemIdQueryKey = ReturnType<typeof getItensByItemIdQueryKey>

export function getItensByItemIdQueryOptions(itemId: GetItensByItemIdPathParams['itemId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getItensByItemIdQueryKey(itemId)
  return queryOptions<
    GetItensByItemIdQueryResponse,
    ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>,
    GetItensByItemIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!itemId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItensByItemId(itemId, config)
    },
  })
}

/**
 * @description Get a item by id
 * {@link /itens/:itemId}
 */
export function useGetItensByItemId<
  TData = GetItensByItemIdQueryResponse,
  TQueryData = GetItensByItemIdQueryResponse,
  TQueryKey extends QueryKey = GetItensByItemIdQueryKey,
>(
  itemId: GetItensByItemIdPathParams['itemId'],
  options: {
    query?: Partial<
      QueryObserverOptions<GetItensByItemIdQueryResponse, ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensByItemIdQueryKey(itemId)

  const query = useQuery({
    ...(getItensByItemIdQueryOptions(itemId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}