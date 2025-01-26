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
import { getCompany } from "../clients/getCompany.ts"
import type {
  GetCompany400,
  GetCompany401,
  GetCompanyQueryResponse,
} from "../models/CompanyController/GetCompany.ts"

export const getCompanySuspenseQueryKey = () => [{ url: "/company" }] as const

export type GetCompanySuspenseQueryKey = ReturnType<
  typeof getCompanySuspenseQueryKey
>

export function getCompanySuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getCompanySuspenseQueryKey()
  return queryOptions<
    GetCompanyQueryResponse,
    ResponseErrorConfig<GetCompany400 | GetCompany401>,
    GetCompanyQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompany(config)
    },
  })
}

/**
 * @description Get a company
 * {@link /company}
 */
export function useGetCompanySuspense<
  TData = GetCompanyQueryResponse,
  TQueryKey extends QueryKey = GetCompanySuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetCompanyQueryResponse,
        ResponseErrorConfig<GetCompany400 | GetCompany401>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanySuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getCompanySuspenseQueryOptions(
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetCompany400 | GetCompany401>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
