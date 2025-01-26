import client from '@kubb/plugin-client/clients/axios'
import type {
  GetItensByItemIdQueryResponse,
  GetItensByItemIdPathParams,
  GetItensByItemId401,
  GetItensByItemId404,
} from "../models/'ItensController/GetItensByItemId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getItensByItemId } from '../clients/getItensByItemId.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getItensByItemIdSuspenseQueryKey = (itemId: GetItensByItemIdPathParams['itemId']) =>
  [{ url: '/itens/:itemId', params: { itemId: itemId } }] as const

export type GetItensByItemIdSuspenseQueryKey = ReturnType<typeof getItensByItemIdSuspenseQueryKey>

export function getItensByItemIdSuspenseQueryOptions(
  itemId: GetItensByItemIdPathParams['itemId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getItensByItemIdSuspenseQueryKey(itemId)
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
export function useGetItensByItemIdSuspense<
  TData = GetItensByItemIdQueryResponse,
  TQueryData = GetItensByItemIdQueryResponse,
  TQueryKey extends QueryKey = GetItensByItemIdSuspenseQueryKey,
>(
  itemId: GetItensByItemIdPathParams['itemId'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetItensByItemIdQueryResponse, ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensByItemIdSuspenseQueryKey(itemId)

  const query = useSuspenseQuery({
    ...(getItensByItemIdSuspenseQueryOptions(itemId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}