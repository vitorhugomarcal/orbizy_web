import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteClientRemoveByClientIdMutationResponse,
  DeleteClientRemoveByClientIdPathParams,
  DeleteClientRemoveByClientId400,
  DeleteClientRemoveByClientId401,
} from '../models/ClientsController/DeleteClientRemoveByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteClientRemoveByClientId } from '../clients/deleteClientRemoveByClientId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteClientRemoveByClientIdMutationKey = () => [{ url: '/client/remove/{clientId}' }] as const

export type DeleteClientRemoveByClientIdMutationKey = ReturnType<typeof deleteClientRemoveByClientIdMutationKey>

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