import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  DeleteClientRemoveByClientIdMutationResponse,
  DeleteClientRemoveByClientIdPathParams,
  DeleteClientRemoveByClientId400,
  DeleteClientRemoveByClientId401,
} from '../models/ClientsController/DeleteClientRemoveByClientId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteClientRemoveByClientIdMutationKey = () => [{ url: '/client/remove/{clientId}' }] as const

export type DeleteClientRemoveByClientIdMutationKey = ReturnType<typeof deleteClientRemoveByClientIdMutationKey>

/**
 * @description Remove a client
 * {@link /client/remove/:clientId}
 */
export async function deleteClientRemoveByClientId(
  clientId: DeleteClientRemoveByClientIdPathParams['clientId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteClientRemoveByClientIdMutationResponse,
    ResponseErrorConfig<DeleteClientRemoveByClientId400 | DeleteClientRemoveByClientId401>,
    unknown
  >({ method: 'DELETE', url: `/client/remove/${clientId}`, baseURL: 'https://api.orbizy.app', ...requestConfig })
  return res.data
}

/**
 * @description Remove a client
 * {@link /client/remove/:clientId}
 */
export function useDeleteClientRemoveByClientId(
  options: {
    mutation?: UseMutationOptions<
      DeleteClientRemoveByClientIdMutationResponse,
      ResponseErrorConfig<DeleteClientRemoveByClientId400 | DeleteClientRemoveByClientId401>,
      { clientId: DeleteClientRemoveByClientIdPathParams['clientId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteClientRemoveByClientIdMutationKey()

  return useMutation<
    DeleteClientRemoveByClientIdMutationResponse,
    ResponseErrorConfig<DeleteClientRemoveByClientId400 | DeleteClientRemoveByClientId401>,
    { clientId: DeleteClientRemoveByClientIdPathParams['clientId'] }
  >({
    mutationFn: async ({ clientId }) => {
      return deleteClientRemoveByClientId(clientId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}