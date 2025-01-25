import client from '@kubb/plugin-client/clients/axios'
import type { GetInviteValidateByCodeQueryResponse, GetInviteValidateByCodePathParams } from '../models/GetInviteValidateByCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getInviteValidateByCode } from '../clients/getInviteValidateByCode.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getInviteValidateByCodeQueryKey = ({ code }: { code: GetInviteValidateByCodePathParams['code'] }) =>
  [{ url: '/invite/validate/:code', params: { code: code } }] as const

export type GetInviteValidateByCodeQueryKey = ReturnType<typeof getInviteValidateByCodeQueryKey>

export function getInviteValidateByCodeQueryOptions(
  { code }: { code: GetInviteValidateByCodePathParams['code'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getInviteValidateByCodeQueryKey({ code })
  return queryOptions<GetInviteValidateByCodeQueryResponse, ResponseErrorConfig<Error>, GetInviteValidateByCodeQueryResponse, typeof queryKey>({
    enabled: !!code,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getInviteValidateByCode({ code }, config)
    },
  })
}

/**
 * {@link /invite/validate/:code}
 */
export function useGetInviteValidateByCode<
  TData = GetInviteValidateByCodeQueryResponse,
  TQueryData = GetInviteValidateByCodeQueryResponse,
  TQueryKey extends QueryKey = GetInviteValidateByCodeQueryKey,
>(
  { code }: { code: GetInviteValidateByCodePathParams['code'] },
  options: {
    query?: Partial<QueryObserverOptions<GetInviteValidateByCodeQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getInviteValidateByCodeQueryKey({ code })

  const query = useQuery({
    ...(getInviteValidateByCodeQueryOptions({ code }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}