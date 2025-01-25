import client from '@kubb/plugin-client/clients/axios'
import type { GetCompanyQueryResponse } from '../models/GetCompany.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompany } from '../clients/getCompany.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyQueryKey = () => [{ url: '/company' }] as const

export type GetCompanyQueryKey = ReturnType<typeof getCompanyQueryKey>

export function getCompanyQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getCompanyQueryKey()
  return queryOptions<GetCompanyQueryResponse, ResponseErrorConfig<Error>, GetCompanyQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompany(config)
    },
  })
}

/**
 * {@link /company}
 */
export function useGetCompany<TData = GetCompanyQueryResponse, TQueryData = GetCompanyQueryResponse, TQueryKey extends QueryKey = GetCompanyQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<GetCompanyQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanyQueryKey()

  const query = useQuery({
    ...(getCompanyQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}