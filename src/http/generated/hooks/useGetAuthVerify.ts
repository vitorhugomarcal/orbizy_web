import client from '@kubb/plugin-client/clients/axios'
import type { GetAuthVerifyQueryResponse, GetAuthVerifyQueryParams, GetAuthVerify401 } from '../models/AuthController/GetAuthVerify.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getAuthVerify } from '../clients/getAuthVerify.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getAuthVerifyQueryKey = (params: GetAuthVerifyQueryParams) => [{ url: '/auth/verify' }, ...(params ? [params] : [])] as const

export type GetAuthVerifyQueryKey = ReturnType<typeof getAuthVerifyQueryKey>

export function getAuthVerifyQueryOptions(params: GetAuthVerifyQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getAuthVerifyQueryKey(params)
  return queryOptions<GetAuthVerifyQueryResponse, ResponseErrorConfig<GetAuthVerify401>, GetAuthVerifyQueryResponse, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAuthVerify(params, config)
    },
  })
}

/**
 * @description Verifica e autentica o link de convite
 * {@link /auth/verify}
 */
export function useGetAuthVerify<
  TData = GetAuthVerifyQueryResponse,
  TQueryData = GetAuthVerifyQueryResponse,
  TQueryKey extends QueryKey = GetAuthVerifyQueryKey,
>(
  params: GetAuthVerifyQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetAuthVerifyQueryResponse, ResponseErrorConfig<GetAuthVerify401>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAuthVerifyQueryKey(params)

  const query = useQuery({
    ...(getAuthVerifyQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetAuthVerify401>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}