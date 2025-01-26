import client from '@kubb/plugin-client/clients/axios'
import type { GetItensQueryResponse, GetItens401, GetItens404 } from "../models/'ItensController/GetItens.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getItens } from '../clients/getItens.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getItensSuspenseQueryKey = () => [{ url: '/itens' }] as const

export type GetItensSuspenseQueryKey = ReturnType<typeof getItensSuspenseQueryKey>

export function getItensSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getItensSuspenseQueryKey()
  return queryOptions<GetItensQueryResponse, ResponseErrorConfig<GetItens401 | GetItens404>, GetItensQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItens(config)
    },
  })
}

/**
 * @description Get all itens
 * {@link /itens}
 */
export function useGetItensSuspense<TData = GetItensQueryResponse, TQueryData = GetItensQueryResponse, TQueryKey extends QueryKey = GetItensSuspenseQueryKey>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetItensQueryResponse, ResponseErrorConfig<GetItens401 | GetItens404>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getItensSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetItens401 | GetItens404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}