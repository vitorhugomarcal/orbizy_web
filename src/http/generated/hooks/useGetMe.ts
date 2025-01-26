import client from '@kubb/plugin-client/clients/axios'
import type { GetMeQueryResponse, GetMe401 } from '../models/UserController/GetMe.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getMe } from '../clients/getMe.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getMeQueryKey = () => [{ url: '/me' }] as const

export type GetMeQueryKey = ReturnType<typeof getMeQueryKey>

export function getMeQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getMeQueryKey()
  return queryOptions<GetMeQueryResponse, ResponseErrorConfig<GetMe401>, GetMeQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getMe(config)
    },
  })
}

/**
 * @description Get user profile
 * {@link /me}
 */
export function useGetMe<TData = GetMeQueryResponse, TQueryData = GetMeQueryResponse, TQueryKey extends QueryKey = GetMeQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetMeQueryResponse, ResponseErrorConfig<GetMe401>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getMeQueryKey()

  const query = useQuery({
    ...(getMeQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetMe401>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}