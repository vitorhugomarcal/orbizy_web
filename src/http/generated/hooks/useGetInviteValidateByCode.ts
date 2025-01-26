import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  GetInviteValidateByCodeQueryResponse,
  GetInviteValidateByCodePathParams,
  GetInviteValidateByCode400,
  GetInviteValidateByCode429,
} from '../models/InviteController/GetInviteValidateByCode.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getInviteValidateByCodeQueryKey = (code: GetInviteValidateByCodePathParams['code']) =>
  [{ url: '/invite/validate/:code', params: { code: code } }] as const

export type GetInviteValidateByCodeQueryKey = ReturnType<typeof getInviteValidateByCodeQueryKey>

/**
 * @description Verifica se o código de convite é válido
 * {@link /invite/validate/:code}
 */
export async function getInviteValidateByCode(
  code: GetInviteValidateByCodePathParams['code'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetInviteValidateByCodeQueryResponse, ResponseErrorConfig<GetInviteValidateByCode400 | GetInviteValidateByCode429>, unknown>({
    method: 'GET',
    url: `/invite/validate/${code}`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

export function getInviteValidateByCodeQueryOptions(
  code: GetInviteValidateByCodePathParams['code'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getInviteValidateByCodeQueryKey(code)
  return queryOptions<
    GetInviteValidateByCodeQueryResponse,
    ResponseErrorConfig<GetInviteValidateByCode400 | GetInviteValidateByCode429>,
    GetInviteValidateByCodeQueryResponse,
    typeof queryKey
  >({
    enabled: !!code,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getInviteValidateByCode(code, config)
    },
  })
}

/**
 * @description Verifica se o código de convite é válido
 * {@link /invite/validate/:code}
 */
export function useGetInviteValidateByCode<
  TData = GetInviteValidateByCodeQueryResponse,
  TQueryData = GetInviteValidateByCodeQueryResponse,
  TQueryKey extends QueryKey = GetInviteValidateByCodeQueryKey,
>(
  code: GetInviteValidateByCodePathParams['code'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetInviteValidateByCodeQueryResponse,
        ResponseErrorConfig<GetInviteValidateByCode400 | GetInviteValidateByCode429>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getInviteValidateByCodeQueryKey(code)

  const query = useQuery({
    ...(getInviteValidateByCodeQueryOptions(code, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetInviteValidateByCode400 | GetInviteValidateByCode429>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}