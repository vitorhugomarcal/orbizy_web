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
  GetItens401,
  GetItens404,
  GetItensQueryResponse,
} from "../models/ItensController/GetItens.ts"

export const getItensSuspenseQueryKey = () => [{ url: "/itens" }] as const

export type GetItensSuspenseQueryKey = ReturnType<
  typeof getItensSuspenseQueryKey
>

/**
 * @description Get all itens
 * {@link /itens}
 */
export async function getItensSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetItensQueryResponse,
    ResponseErrorConfig<GetItens401 | GetItens404>,
    unknown
  >({
    method: "GET",
    url: `/itens`,
    baseURL: "https://api.orbizy.app",
    ...requestConfig,
  })
  return res.data
}

export function getItensSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getItensSuspenseQueryKey()
  return queryOptions<
    GetItensQueryResponse,
    ResponseErrorConfig<GetItens401 | GetItens404>,
    GetItensQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItensSuspense(config)
    },
  })
}

/**
 * @description Get all itens
 * {@link /itens}
 */
export function useGetItensSuspense<
  TData = GetItensQueryResponse,
  TQueryKey extends QueryKey = GetItensSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetItensQueryResponse,
        ResponseErrorConfig<GetItens401 | GetItens404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getItensSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getItensSuspenseQueryOptions(
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetItens401 | GetItens404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
