import client from '@kubb/plugin-client/clients/axios'
import type { GetAuthVerifyQueryResponse, GetAuthVerifyQueryParams, GetAuthVerify401 } from '../models/AuthController/GetAuthVerify.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getAuthVerifySuspenseQueryKey = (params: GetAuthVerifyQueryParams) => [{ url: '/auth/verify' }, ...(params ? [params] : [])] as const

export type GetAuthVerifySuspenseQueryKey = ReturnType<typeof getAuthVerifySuspenseQueryKey>

/**
 * @description Verifica e autentica o link de convite
 * {@link /auth/verify}
 */
export async function getAuthVerifySuspense(params: GetAuthVerifyQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetAuthVerifyQueryResponse, ResponseErrorConfig<GetAuthVerify401>, unknown>({
    method: 'GET',
    url: `/auth/verify`,
    baseURL: 'https://api.orbizy.app',
    params,
    ...requestConfig,
  })
  return res.data
}

export function getAuthVerifySuspenseQueryOptions(params: GetAuthVerifyQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getAuthVerifySuspenseQueryKey(params)
  return queryOptions<GetAuthVerifyQueryResponse, ResponseErrorConfig<GetAuthVerify401>, GetAuthVerifyQueryResponse, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAuthVerifySuspense(params, config)
    },
  })
}

/**
 * @description Verifica e autentica o link de convite
 * {@link /auth/verify}
 */
export function useGetAuthVerifySuspense<
  TData = GetAuthVerifyQueryResponse,
  TQueryData = GetAuthVerifyQueryResponse,
  TQueryKey extends QueryKey = GetAuthVerifySuspenseQueryKey,
>(
  params: GetAuthVerifyQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetAuthVerifyQueryResponse, ResponseErrorConfig<GetAuthVerify401>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAuthVerifySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getAuthVerifySuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetAuthVerify401>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}