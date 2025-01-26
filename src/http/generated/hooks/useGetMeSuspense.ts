import client from '@kubb/plugin-client/clients/axios'
import type { GetMeQueryResponse, GetMe401 } from '../models/UserController/GetMe.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getMeSuspenseQueryKey = () => [{ url: '/me' }] as const

export type GetMeSuspenseQueryKey = ReturnType<typeof getMeSuspenseQueryKey>

/**
 * @description Get user profile
 * {@link /me}
 */
export async function getMeSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetMeQueryResponse, ResponseErrorConfig<GetMe401>, unknown>({
    method: 'GET',
    url: `/me`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getMeSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getMeSuspenseQueryKey()
  return queryOptions<GetMeQueryResponse, ResponseErrorConfig<GetMe401>, GetMeQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getMeSuspense(config)
    },
  })
}

/**
 * @description Get user profile
 * {@link /me}
 */
export function useGetMeSuspense<TData = GetMeQueryResponse, TQueryData = GetMeQueryResponse, TQueryKey extends QueryKey = GetMeSuspenseQueryKey>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetMeQueryResponse, ResponseErrorConfig<GetMe401>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getMeSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getMeSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetMe401>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}