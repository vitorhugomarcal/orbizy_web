import client from '@kubb/plugin-client/clients/axios'
import type {
  GetSupplierCompanyBySupplierIdQueryResponse,
  GetSupplierCompanyBySupplierIdPathParams,
  GetSupplierCompanyBySupplierId400,
  GetSupplierCompanyBySupplierId401,
  GetSupplierCompanyBySupplierId404,
} from '../models/SupplierController/GetSupplierCompanyBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getSupplierCompanyBySupplierId } from '../clients/getSupplierCompanyBySupplierId.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSupplierCompanyBySupplierIdQueryKey = (supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId']) =>
  [{ url: '/supplier/company/:supplierId', params: { supplierId: supplierId } }] as const

export type GetSupplierCompanyBySupplierIdQueryKey = ReturnType<typeof getSupplierCompanyBySupplierIdQueryKey>

export function getSupplierCompanyBySupplierIdQueryOptions(
  supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getSupplierCompanyBySupplierIdQueryKey(supplierId)
  return queryOptions<
    GetSupplierCompanyBySupplierIdQueryResponse,
    ResponseErrorConfig<GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404>,
    GetSupplierCompanyBySupplierIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!supplierId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getSupplierCompanyBySupplierId(supplierId, config)
    },
  })
}

/**
 * @description Get supplier by ID
 * {@link /supplier/company/:supplierId}
 */
export function useGetSupplierCompanyBySupplierId<
  TData = GetSupplierCompanyBySupplierIdQueryResponse,
  TQueryData = GetSupplierCompanyBySupplierIdQueryResponse,
  TQueryKey extends QueryKey = GetSupplierCompanyBySupplierIdQueryKey,
>(
  supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetSupplierCompanyBySupplierIdQueryResponse,
        ResponseErrorConfig<GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSupplierCompanyBySupplierIdQueryKey(supplierId)

  const query = useQuery({
    ...(getSupplierCompanyBySupplierIdQueryOptions(supplierId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}