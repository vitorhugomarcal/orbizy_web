import client from '@kubb/plugin-client/clients/axios'
import type { GetSupplierCompanyQueryResponse } from '../models/GetSupplierCompany.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSupplierCompanyQueryKey = () => [{ url: '/supplier/company' }] as const

export type GetSupplierCompanyQueryKey = ReturnType<typeof getSupplierCompanyQueryKey>

/**
 * {@link /supplier/company}
 */
export async function getSupplierCompany(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSupplierCompanyQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/supplier/company`, ...requestConfig })
  return res.data
}

export function getSupplierCompanyQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getSupplierCompanyQueryKey()
  return queryOptions<GetSupplierCompanyQueryResponse, ResponseErrorConfig<Error>, GetSupplierCompanyQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSupplierCompany(config)
    },
  })
}

/**
 * {@link /supplier/company}
 */
export function useGetSupplierCompany<
  TData = GetSupplierCompanyQueryResponse,
  TQueryData = GetSupplierCompanyQueryResponse,
  TQueryKey extends QueryKey = GetSupplierCompanyQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<GetSupplierCompanyQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSupplierCompanyQueryKey()

  const query = useQuery({
    ...(getSupplierCompanyQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}