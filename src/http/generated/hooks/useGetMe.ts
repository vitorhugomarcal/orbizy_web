import client from '@kubb/plugin-client/clients/axios'
import type { GetMeQueryResponse } from '../models/GetMe.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getMeQueryKey = () => [{ url: '/me' }] as const

export type GetMeQueryKey = ReturnType<typeof getMeQueryKey>

/**
 * {@link /me}
 */
export async function getMe(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetMeQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/me`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getMeQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getMeQueryKey()
  return queryOptions<GetMeQueryResponse, ResponseErrorConfig<Error>, GetMeQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getMe(config)
    },
  })
}

/**
 * {@link /me}
 */
export function useGetMe<TData = GetMeQueryResponse, TQueryData = GetMeQueryResponse, TQueryKey extends QueryKey = GetMeQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetMeQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getMeQueryKey()

  const query = useQuery({
    ...(getMeQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}