import client from '@kubb/plugin-client/clients/axios'
import type {
  GetSupplierCompanyBySupplierIdQueryResponse,
  GetSupplierCompanyBySupplierIdPathParams,
  GetSupplierCompanyBySupplierId400,
  GetSupplierCompanyBySupplierId401,
  GetSupplierCompanyBySupplierId404,
} from '../models/SupplierController/GetSupplierCompanyBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getSupplierCompanyBySupplierId } from '../clients/getSupplierCompanyBySupplierId.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getSupplierCompanyBySupplierIdSuspenseQueryKey = (supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId']) =>
  [{ url: '/supplier/company/:supplierId', params: { supplierId: supplierId } }] as const

export type GetSupplierCompanyBySupplierIdSuspenseQueryKey = ReturnType<typeof getSupplierCompanyBySupplierIdSuspenseQueryKey>

export function getSupplierCompanyBySupplierIdSuspenseQueryOptions(
  supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getSupplierCompanyBySupplierIdSuspenseQueryKey(supplierId)
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
export function useGetSupplierCompanyBySupplierIdSuspense<
  TData = GetSupplierCompanyBySupplierIdQueryResponse,
  TQueryData = GetSupplierCompanyBySupplierIdQueryResponse,
  TQueryKey extends QueryKey = GetSupplierCompanyBySupplierIdSuspenseQueryKey,
>(
  supplierId: GetSupplierCompanyBySupplierIdPathParams['supplierId'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetSupplierCompanyBySupplierIdQueryResponse,
        ResponseErrorConfig<GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getSupplierCompanyBySupplierIdSuspenseQueryKey(supplierId)

  const query = useSuspenseQuery({
    ...(getSupplierCompanyBySupplierIdSuspenseQueryOptions(supplierId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetSupplierCompanyBySupplierId400 | GetSupplierCompanyBySupplierId401 | GetSupplierCompanyBySupplierId404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}