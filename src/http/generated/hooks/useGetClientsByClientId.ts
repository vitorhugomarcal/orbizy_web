import client from '@kubb/plugin-client/clients/axios'
import type { GetClientsByClientIdQueryResponse, GetClientsByClientIdPathParams } from '../models/GetClientsByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getClientsByClientId } from '../clients/getClientsByClientId.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getClientsByClientIdQueryKey = ({ clientId }: { clientId: GetClientsByClientIdPathParams['clientId'] }) =>
  [{ url: '/clients/:clientId', params: { clientId: clientId } }] as const

export type GetClientsByClientIdQueryKey = ReturnType<typeof getClientsByClientIdQueryKey>

export function getClientsByClientIdQueryOptions(
  { clientId }: { clientId: GetClientsByClientIdPathParams['clientId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getClientsByClientIdQueryKey({ clientId })
  return queryOptions<GetClientsByClientIdQueryResponse, ResponseErrorConfig<Error>, GetClientsByClientIdQueryResponse, typeof queryKey>({
    enabled: !!clientId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsByClientId({ clientId }, config)
    },
  })
}

/**
 * {@link /clients/:clientId}
 */
export function useGetClientsByClientId<
  TData = GetClientsByClientIdQueryResponse,
  TQueryData = GetClientsByClientIdQueryResponse,
  TQueryKey extends QueryKey = GetClientsByClientIdQueryKey,
>(
  { clientId }: { clientId: GetClientsByClientIdPathParams['clientId'] },
  options: {
    query?: Partial<QueryObserverOptions<GetClientsByClientIdQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsByClientIdQueryKey({ clientId })

  const query = useQuery({
    ...(getClientsByClientIdQueryOptions({ clientId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}