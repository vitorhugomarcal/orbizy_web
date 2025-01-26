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
  GetInviteValidateByCode400,
  GetInviteValidateByCode429,
  GetInviteValidateByCodePathParams,
  GetInviteValidateByCodeQueryResponse,
} from "../models/InviteController/GetInviteValidateByCode.ts"

export const getInviteValidateByCodeSuspenseQueryKey = (
  code: GetInviteValidateByCodePathParams["code"]
) => [{ url: "/invite/validate/:code", params: { code: code } }] as const

export type GetInviteValidateByCodeSuspenseQueryKey = ReturnType<
  typeof getInviteValidateByCodeSuspenseQueryKey
>

/**
 * @description Verifica se o código de convite é válido
 * {@link /invite/validate/:code}
 */
export async function getInviteValidateByCodeSuspense(
  code: GetInviteValidateByCodePathParams["code"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetInviteValidateByCodeQueryResponse,
    ResponseErrorConfig<
      GetInviteValidateByCode400 | GetInviteValidateByCode429
    >,
    unknown
  >({
    method: "GET",
    url: `/invite/validate/${code}`,
    baseURL: "https://api.orbizy.app",
    ...requestConfig,
  })
  return res.data
}

export function getInviteValidateByCodeSuspenseQueryOptions(
  code: GetInviteValidateByCodePathParams["code"],
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getInviteValidateByCodeSuspenseQueryKey(code)
  return queryOptions<
    GetInviteValidateByCodeQueryResponse,
    ResponseErrorConfig<
      GetInviteValidateByCode400 | GetInviteValidateByCode429
    >,
    GetInviteValidateByCodeQueryResponse,
    typeof queryKey
  >({
    enabled: !!code,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getInviteValidateByCodeSuspense(code, config)
    },
  })
}

/**
 * @description Verifica se o código de convite é válido
 * {@link /invite/validate/:code}
 */
export function useGetInviteValidateByCodeSuspense<
  TData = GetInviteValidateByCodeQueryResponse,
  TQueryKey extends QueryKey = GetInviteValidateByCodeSuspenseQueryKey,
>(
  code: GetInviteValidateByCodePathParams["code"],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetInviteValidateByCodeQueryResponse,
        ResponseErrorConfig<
          GetInviteValidateByCode400 | GetInviteValidateByCode429
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
    queryOptions?.queryKey ?? getInviteValidateByCodeSuspenseQueryKey(code)

  const query = useSuspenseQuery({
    ...(getInviteValidateByCodeSuspenseQueryOptions(
      code,
      config
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, "queryKey">),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetInviteValidateByCode400 | GetInviteValidateByCode429>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
