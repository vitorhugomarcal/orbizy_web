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
  GetClientsByClientId400,
  GetClientsByClientId401,
  GetClientsByClientId404,
  GetClientsByClientIdPathParams,
  GetClientsByClientIdQueryResponse,
} from "../models/ClientsController/GetClientsByClientId.ts"

export const getClientsByClientIdSuspenseQueryKey = (
  clientId: GetClientsByClientIdPathParams["clientId"]
) => [{ url: "/clients/:clientId", params: { clientId: clientId } }] as const

export type GetClientsByClientIdSuspenseQueryKey = ReturnType<
  typeof getClientsByClientIdSuspenseQueryKey
>

/**
 * @description Retrieve client by ID
 * {@link /clients/:clientId}
 */
export async function getClientsByClientIdSuspense(
  clientId: GetClientsByClientIdPathParams["clientId"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetClientsByClientIdQueryResponse,
    ResponseErrorConfig<
      | GetClientsByClientId400
      | GetClientsByClientId401
      | GetClientsByClientId404
    >,
    unknown
  >({
    method: "GET",
    url: `/clients/${clientId}`,
    baseURL: "https://api.orbizy.app",
    ...requestConfig,
  })
  return res.data
}

export function getClientsByClientIdSuspenseQueryOptions(
  clientId: GetClientsByClientIdPathParams["clientId"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getClientsByClientIdSuspenseQueryKey(clientId)
  return queryOptions<
    GetClientsByClientIdQueryResponse,
    ResponseErrorConfig<
      | GetClientsByClientId400
      | GetClientsByClientId401
      | GetClientsByClientId404
    >,
    GetClientsByClientIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!clientId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsByClientIdSuspense(clientId, config)
    },
  })
}

/**
 * @description Retrieve client by ID
 * {@link /clients/:clientId}
 */
export function useGetClientsByClientIdSuspense<
  TData = GetClientsByClientIdQueryResponse,
  TQueryKey extends QueryKey = GetClientsByClientIdSuspenseQueryKey,
>(
  clientId: GetClientsByClientIdPathParams["clientId"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetClientsByClientIdQueryResponse,
        ResponseErrorConfig<
          | GetClientsByClientId400
          | GetClientsByClientId401
          | GetClientsByClientId404
        >,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey =
    queryOptions?.queryKey ?? getClientsByClientIdSuspenseQueryKey(clientId)

  const query = useSuspenseQuery({
    ...(getClientsByClientIdSuspenseQueryOptions(
      clientId,
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<
      | GetClientsByClientId400
      | GetClientsByClientId401
      | GetClientsByClientId404
    >
  > & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
