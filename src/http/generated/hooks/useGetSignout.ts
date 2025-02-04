import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { GetSignoutQueryResponse } from '../models/AuthController/GetSignout.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSignoutQueryKey = () => [{ url: '/signout' }] as const

export type GetSignoutQueryKey = ReturnType<typeof getSignoutQueryKey>

/**
 * @description Desconecta o usuário
 * {@link /signout}
 */
export async function getSignout(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSignoutQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/signout`,
    baseURL: 'http://192.168.1.81:3333',
    ...requestConfig,
  })
  return res.data
}

export function getSignoutQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getSignoutQueryKey()
  return queryOptions<GetSignoutQueryResponse, ResponseErrorConfig<Error>, GetSignoutQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSignout(config)
    },
  })
}

/**
 * @description Desconecta o usuário
 * {@link /signout}
 */
export function useGetSignout<TData = GetSignoutQueryResponse, TQueryData = GetSignoutQueryResponse, TQueryKey extends QueryKey = GetSignoutQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetSignoutQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSignoutQueryKey()

  const query = useQuery({
    ...(getSignoutQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}