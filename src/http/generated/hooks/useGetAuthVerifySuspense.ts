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
import { getAuthVerify } from "../clients/getAuthVerify.ts"
import type {
  GetAuthVerify401,
  GetAuthVerifyQueryParams,
  GetAuthVerifyQueryResponse,
} from "../models/AuthController/GetAuthVerify.ts"

export const getAuthVerifySuspenseQueryKey = (
  params: GetAuthVerifyQueryParams
) => [{ url: "/auth/verify" }, ...(params ? [params] : [])] as const

export type GetAuthVerifySuspenseQueryKey = ReturnType<
  typeof getAuthVerifySuspenseQueryKey
>

export function getAuthVerifySuspenseQueryOptions(
  params: GetAuthVerifyQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getAuthVerifySuspenseQueryKey(params)
  return queryOptions<
    GetAuthVerifyQueryResponse,
    ResponseErrorConfig<GetAuthVerify401>,
    GetAuthVerifyQueryResponse,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAuthVerify(params, config)
    },
  })
}

/**
 * @description Verifica e autentica o link de convite
 * {@link /auth/verify}
 */
export function useGetAuthVerifySuspense<
  TData = GetAuthVerifyQueryResponse,
  TQueryKey extends QueryKey = GetAuthVerifySuspenseQueryKey,
>(
  params: GetAuthVerifyQueryParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetAuthVerifyQueryResponse,
        ResponseErrorConfig<GetAuthVerify401>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {}
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey =
    queryOptions?.queryKey ?? getAuthVerifySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getAuthVerifySuspenseQueryOptions(
      params,
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetAuthVerify401>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}
