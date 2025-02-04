import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { GetSupplierCompanyQueryResponse, GetSupplierCompany401, GetSupplierCompany404 } from '../models/SupplierController/GetSupplierCompany.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSupplierCompanyQueryKey = () => [{ url: '/supplier/company' }] as const

export type GetSupplierCompanyQueryKey = ReturnType<typeof getSupplierCompanyQueryKey>

/**
 * @description Get all suppliers
 * {@link /supplier/company}
 */
export async function getSupplierCompany(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSupplierCompanyQueryResponse, ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>, unknown>({
    method: 'GET',
    url: `/supplier/company`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getSupplierCompanyQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getSupplierCompanyQueryKey()
  return queryOptions<
    GetSupplierCompanyQueryResponse,
    ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>,
    GetSupplierCompanyQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSupplierCompany(config)
    },
  })
}

/**
 * @description Get all suppliers
 * {@link /supplier/company}
 */
export function useGetSupplierCompany<
  TData = GetSupplierCompanyQueryResponse,
  TQueryData = GetSupplierCompanyQueryResponse,
  TQueryKey extends QueryKey = GetSupplierCompanyQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<GetSupplierCompanyQueryResponse, ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSupplierCompanyQueryKey()

  const query = useQuery({
    ...(getSupplierCompanyQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}