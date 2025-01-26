import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { GetSignoutQueryResponse } from '../models/AuthController/GetSignout.ts'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getSignoutSuspenseQueryKey = () => [{ url: '/signout' }] as const

export type GetSignoutSuspenseQueryKey = ReturnType<typeof getSignoutSuspenseQueryKey>

/**
 * @description Desconecta o usuário
 * {@link /signout}
 */
export async function getSignoutSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSignoutQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/signout`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getSignoutSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getSignoutSuspenseQueryKey()
  return queryOptions<GetSignoutQueryResponse, ResponseErrorConfig<Error>, GetSignoutQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSignoutSuspense(config)
    },
  })
}

/**
 * @description Desconecta o usuário
 * {@link /signout}
 */
export function useGetSignoutSuspense<
  TData = GetSignoutQueryResponse,
  TQueryData = GetSignoutQueryResponse,
  TQueryKey extends QueryKey = GetSignoutSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetSignoutQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSignoutSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getSignoutSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}