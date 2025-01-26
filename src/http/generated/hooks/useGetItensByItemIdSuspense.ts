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
  GetItensByItemId401,
  GetItensByItemId404,
  GetItensByItemIdPathParams,
  GetItensByItemIdQueryResponse,
} from "../models/ItensController/GetItensByItemId.ts"

export const getItensByItemIdSuspenseQueryKey = (
  itemId: GetItensByItemIdPathParams["itemId"]
) => [{ url: "/itens/:itemId", params: { itemId: itemId } }] as const

export type GetItensByItemIdSuspenseQueryKey = ReturnType<
  typeof getItensByItemIdSuspenseQueryKey
>

/**
 * @description Get a item by id
 * {@link /itens/:itemId}
 */
export async function getItensByItemIdSuspense(
  itemId: GetItensByItemIdPathParams["itemId"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetItensByItemIdQueryResponse,
    ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>,
    unknown
  >({
    method: "GET",
    url: `/itens/${itemId}`,
    baseURL: "https://api.orbizy.app",
    ...requestConfig,
  })
  return res.data
}

export function getItensByItemIdSuspenseQueryOptions(
  itemId: GetItensByItemIdPathParams["itemId"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getItensByItemIdSuspenseQueryKey(itemId)
  return queryOptions<
    GetItensByItemIdQueryResponse,
    ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>,
    GetItensByItemIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!itemId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getItensByItemIdSuspense(itemId, config)
    },
  })
}

/**
 * @description Get a item by id
 * {@link /itens/:itemId}
 */
export function useGetItensByItemIdSuspense<
  TData = GetItensByItemIdQueryResponse,
  TQueryKey extends QueryKey = GetItensByItemIdSuspenseQueryKey,
>(
  itemId: GetItensByItemIdPathParams["itemId"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetItensByItemIdQueryResponse,
        ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey =
    queryOptions?.queryKey ?? getItensByItemIdSuspenseQueryKey(itemId)

  const query = useSuspenseQuery({
    ...(getItensByItemIdSuspenseQueryOptions(
      itemId,
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetItensByItemId401 | GetItensByItemId404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
