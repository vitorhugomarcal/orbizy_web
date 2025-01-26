import client from '@kubb/plugin-client/clients/axios'
import type {
  GetClientsByClientIdQueryResponse,
  GetClientsByClientIdPathParams,
  GetClientsByClientId400,
  GetClientsByClientId401,
  GetClientsByClientId404,
} from "../models/'ClientsController/GetClientsByClientId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getClientsByClientId } from '../clients/getClientsByClientId.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getClientsByClientIdSuspenseQueryKey = (clientId: GetClientsByClientIdPathParams['clientId']) =>
  [{ url: '/clients/:clientId', params: { clientId: clientId } }] as const

export type GetClientsByClientIdSuspenseQueryKey = ReturnType<typeof getClientsByClientIdSuspenseQueryKey>

export function getClientsByClientIdSuspenseQueryOptions(
  clientId: GetClientsByClientIdPathParams['clientId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getClientsByClientIdSuspenseQueryKey(clientId)
  return queryOptions<
    GetClientsByClientIdQueryResponse,
    ResponseErrorConfig<GetClientsByClientId400 | GetClientsByClientId401 | GetClientsByClientId404>,
    GetClientsByClientIdQueryResponse,
    typeof queryKey
  >({
    enabled: !!clientId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getClientsByClientId(clientId, config)
    },
  })
}

/**
 * @description Retrieve client by ID
 * {@link /clients/:clientId}
 */
export function useGetClientsByClientIdSuspense<
  TData = GetClientsByClientIdQueryResponse,
  TQueryData = GetClientsByClientIdQueryResponse,
  TQueryKey extends QueryKey = GetClientsByClientIdSuspenseQueryKey,
>(
  clientId: GetClientsByClientIdPathParams['clientId'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetClientsByClientIdQueryResponse,
        ResponseErrorConfig<GetClientsByClientId400 | GetClientsByClientId401 | GetClientsByClientId404>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getClientsByClientIdSuspenseQueryKey(clientId)

  const query = useSuspenseQuery({
    ...(getClientsByClientIdSuspenseQueryOptions(clientId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetClientsByClientId400 | GetClientsByClientId401 | GetClientsByClientId404>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}