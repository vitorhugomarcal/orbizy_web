import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios"
import client from "@kubb/plugin-client/clients/axios"
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { getSupplierCompany } from "../clients/getSupplierCompany.ts"
import type {
  GetSupplierCompany401,
  GetSupplierCompany404,
  GetSupplierCompanyQueryResponse,
} from "../models/'SupplierController/GetSupplierCompany.ts"

export const getSupplierCompanySuspenseQueryKey = () =>
  [{ url: "/supplier/company" }] as const

export type GetSupplierCompanySuspenseQueryKey = ReturnType<
  typeof getSupplierCompanySuspenseQueryKey
>

export function getSupplierCompanySuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getSupplierCompanySuspenseQueryKey()
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
export function useGetSupplierCompanySuspense<
  TData = GetSupplierCompanyQueryResponse,
  TQueryKey extends QueryKey = GetSupplierCompanySuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetSupplierCompanyQueryResponse,
        ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey =
    queryOptions?.queryKey ?? getSupplierCompanySuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getSupplierCompanySuspenseQueryOptions(
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetSupplierCompany401 | GetSupplierCompany404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
