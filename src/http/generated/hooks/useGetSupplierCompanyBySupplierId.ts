import client from '@kubb/plugin-client/clients/axios'
import type { GetSupplierCompanyBySupplierIdQueryResponse, GetSupplierCompanyBySupplierIdPathParams } from '../models/GetSupplierCompanyBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSupplierCompanyBySupplierIdQueryKey = ({ supplierId }: { supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'] }) =>
  [{ url: '/supplier/company/:supplierId', params: { supplierId: supplierId } }] as const

export type GetSupplierCompanyBySupplierIdQueryKey = ReturnType<typeof getSupplierCompanyBySupplierIdQueryKey>

/**
 * {@link /supplier/company/:supplierId}
 */
export async function getSupplierCompanyBySupplierId(
  { supplierId }: { supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSupplierCompanyBySupplierIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/supplier/company/${supplierId}`,
    ...requestConfig,
  })
  return res.data
}

export function getSupplierCompanyBySupplierIdQueryOptions(
  { supplierId }: { supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getSupplierCompanyBySupplierIdQueryKey({ supplierId })
  return queryOptions<GetSupplierCompanyBySupplierIdQueryResponse, ResponseErrorConfig<Error>, GetSupplierCompanyBySupplierIdQueryResponse, typeof queryKey>({
    enabled: !!supplierId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSupplierCompanyBySupplierId({ supplierId }, config)
    },
  })
}

/**
 * {@link /supplier/company/:supplierId}
 */
export function useGetSupplierCompanyBySupplierId<
  TData = GetSupplierCompanyBySupplierIdQueryResponse,
  TQueryData = GetSupplierCompanyBySupplierIdQueryResponse,
  TQueryKey extends QueryKey = GetSupplierCompanyBySupplierIdQueryKey,
>(
  { supplierId }: { supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetSupplierCompanyBySupplierIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSupplierCompanyBySupplierIdQueryKey({ supplierId })

  const query = useQuery({
    ...(getSupplierCompanyBySupplierIdQueryOptions({ supplierId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}