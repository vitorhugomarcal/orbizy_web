import client from '@kubb/plugin-client/clients/axios'
import type {
  PutClientUpdateByClientIdMutationRequest,
  PutClientUpdateByClientIdMutationResponse,
  PutClientUpdateByClientIdPathParams,
  PutClientUpdateByClientId400,
  PutClientUpdateByClientId401,
  PutClientUpdateByClientId404,
} from '../models/ClientsController/PutClientUpdateByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { putClientUpdateByClientId } from '../clients/putClientUpdateByClientId.ts'
import { useMutation } from '@tanstack/react-query'

export const putClientUpdateByClientIdMutationKey = () => [{ url: '/client/update/{clientId}' }] as const

export type PutClientUpdateByClientIdMutationKey = ReturnType<typeof putClientUpdateByClientIdMutationKey>

/**
 * @description Update client
 * {@link /client/update/:clientId}
 */
export function usePutClientUpdateByClientId(
  options: {
    mutation?: UseMutationOptions<
      PutClientUpdateByClientIdMutationResponse,
      ResponseErrorConfig<PutClientUpdateByClientId400 | PutClientUpdateByClientId401 | PutClientUpdateByClientId404>,
      { clientId: PutClientUpdateByClientIdPathParams['clientId']; data?: PutClientUpdateByClientIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutClientUpdateByClientIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putClientUpdateByClientIdMutationKey()

  return useMutation<
    PutClientUpdateByClientIdMutationResponse,
    ResponseErrorConfig<PutClientUpdateByClientId400 | PutClientUpdateByClientId401 | PutClientUpdateByClientId404>,
    { clientId: PutClientUpdateByClientIdPathParams['clientId']; data?: PutClientUpdateByClientIdMutationRequest }
  >({
    mutationFn: async ({ clientId, data }) => {
      return putClientUpdateByClientId(clientId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}