import type {
  QueryKey,
  QueryObserverOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { queryOptions, useQuery } from "@tanstack/react-query"
import type { RequestConfig, ResponseErrorConfig } from "../../client.ts"
import client from "../../client.ts"
import type {
  GetClientsMonth401,
  GetClientsMonth404,
  GetClientsMonthQueryResponse,
} from "../models/ClientsController/GetClientsMonth.ts"

export const getClientsMonthQueryKey = () =>
  [{ url: "/clients/month" }] as const

export type GetClientsMonthQueryKey = ReturnType<typeof getClientsMonthQueryKey>

/**
 * @description Retrieve client count for the current month
 * {@link /clients/month}
 */
export async function getClientsMonth(
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

export function getClientsMonthQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getClientsMonthQueryKey()
  return queryOptions<
    GetClientsMonthQueryResponse,
    ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>,
    GetClientsMonthQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsMonth(config)
    },
  })
}

/**
 * @description Retrieve client count for the current month
 * {@link /clients/month}
 */
export function useGetClientsMonth<
  TData = GetClientsMonthQueryResponse,
  TQueryData = GetClientsMonthQueryResponse,
  TQueryKey extends QueryKey = GetClientsMonthQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetClientsMonthQueryResponse,
        ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsMonthQueryKey()

  const query = useQuery({
    ...(getClientsMonthQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<GetClientsMonth401 | GetClientsMonth404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
