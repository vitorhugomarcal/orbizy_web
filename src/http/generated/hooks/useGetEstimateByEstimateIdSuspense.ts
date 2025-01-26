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
import { getEstimateByEstimateId } from "../clients/getEstimateByEstimateId.ts"
import type {
  GetEstimateByEstimateId401,
  GetEstimateByEstimateId404,
  GetEstimateByEstimateIdPathParams,
  GetEstimateByEstimateIdQueryResponse,
} from "../models/'EstimateController/GetEstimateByEstimateId.ts"

export const getEstimateByEstimateIdSuspenseQueryKey = (
  estimateId: GetEstimateByEstimateIdPathParams["estimateId"]
) =>
  [
    { url: "/estimate/:estimateId", params: { estimateId: estimateId } },
  ] as const

export type GetEstimateByEstimateIdSuspenseQueryKey = ReturnType<
  typeof getEstimateByEstimateIdSuspenseQueryKey
>

export function getEstimateByEstimateIdSuspenseQueryOptions(
  estimateId: GetEstimateByEstimateIdPathParams["estimateId"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getEstimateByEstimateIdSuspenseQueryKey(estimateId)
  return queryOptions<
    GetEstimateByEstimateIdQueryResponse,
    ResponseErrorConfig<
      GetEstimateByEstimateId401 | GetEstimateByEstimateId404
    >,
    GetEstimateByEstimateIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!estimateId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getEstimateByEstimateId(estimateId, config)
    },
  })
}

/**
 * @description Get a estimate by ID
 * {@link /estimate/:estimateId}
 */
export function useGetEstimateByEstimateIdSuspense<
  TData = GetEstimateByEstimateIdQueryResponse,
  TQueryKey extends QueryKey = GetEstimateByEstimateIdSuspenseQueryKey,
>(
  estimateId: GetEstimateByEstimateIdPathParams["estimateId"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetEstimateByEstimateIdQueryResponse,
        ResponseErrorConfig<
          GetEstimateByEstimateId401 | GetEstimateByEstimateId404
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
    queryOptions?.queryKey ??
    getEstimateByEstimateIdSuspenseQueryKey(estimateId)

  const query = useSuspenseQuery({
    ...(getEstimateByEstimateIdSuspenseQueryOptions(
      estimateId,
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetEstimateByEstimateId401 | GetEstimateByEstimateId404>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
