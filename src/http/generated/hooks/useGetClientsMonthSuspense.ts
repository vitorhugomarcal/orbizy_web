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
import type {
  GetClientsMonth401,
  GetClientsMonth404,
  GetClientsMonthQueryResponse,
} from "../models/ClientsController/GetClientsMonth.ts"

export const getClientsMonthSuspenseQueryKey = () =>
  [{ url: "/clients/month" }] as const

export type GetClientsMonthSuspenseQueryKey = ReturnType<
  typeof getClientsMonthSuspenseQueryKey
>

/**
 * @description Retrieve client count for the current month
 * {@link /clients/month}
 */
export async function getClientsMonthSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetClientsMonthQueryResponse,
    ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>,
    unknown
  >({
    method: "GET",
    url: `/clients/month`,
    baseURL: "https://api.orbizy.app",
    ...requestConfig,
  })
  return res.data
}

export function getClientsMonthSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getClientsMonthSuspenseQueryKey()
  return queryOptions<
    GetClientsMonthQueryResponse,
    ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>,
    GetClientsMonthQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsMonthSuspense(config)
    },
  })
}

/**
 * @description Retrieve client count for the current month
 * {@link /clients/month}
 */
export function useGetClientsMonthSuspense<
  TData = GetClientsMonthQueryResponse,
  TQueryKey extends QueryKey = GetClientsMonthSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetClientsMonthQueryResponse,
        ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsMonthSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getClientsMonthSuspenseQueryOptions(
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
