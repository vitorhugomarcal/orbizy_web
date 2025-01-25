import client from '@kubb/plugin-client/clients/axios'
import type { GetSignoutQueryResponse } from '../models/GetSignout.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getSignout } from '../clients/getSignout.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSignoutQueryKey = () => [{ url: '/signout' }] as const

export type GetSignoutQueryKey = ReturnType<typeof getSignoutQueryKey>

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