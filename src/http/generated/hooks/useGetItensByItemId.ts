import client from '@kubb/plugin-client/clients/axios'
import type { GetItensByItemIdQueryResponse, GetItensByItemIdPathParams } from '../models/GetItensByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getItensByItemIdQueryKey = ({ itemId }: { itemId: GetItensByItemIdPathParams['itemId'] }) =>
  [{ url: '/itens/:itemId', params: { itemId: itemId } }] as const

export type GetItensByItemIdQueryKey = ReturnType<typeof getItensByItemIdQueryKey>

/**
 * {@link /itens/:itemId}
 */
export async function getItensByItemId(
  { itemId }: { itemId: GetItensByItemIdPathParams['itemId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetItensByItemIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/itens/${itemId}`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getItensByItemIdQueryOptions(
  { itemId }: { itemId: GetItensByItemIdPathParams['itemId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getItensByItemIdQueryKey({ itemId })
  return queryOptions<GetItensByItemIdQueryResponse, ResponseErrorConfig<Error>, GetItensByItemIdQueryResponse, typeof queryKey>({
    enabled: !!itemId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItensByItemId({ itemId }, config)
    },
  })
}

/**
 * {@link /itens/:itemId}
 */
export function useGetItensByItemId<
  TData = GetItensByItemIdQueryResponse,
  TQueryData = GetItensByItemIdQueryResponse,
  TQueryKey extends QueryKey = GetItensByItemIdQueryKey,
>(
  { itemId }: { itemId: GetItensByItemIdPathParams['itemId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetItensByItemIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensByItemIdQueryKey({ itemId })

  const query = useQuery({
    ...(getItensByItemIdQueryOptions({ itemId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}