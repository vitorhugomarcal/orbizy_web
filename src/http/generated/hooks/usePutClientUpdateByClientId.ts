import client from '@kubb/plugin-client/clients/axios'
import type {
  PutClientUpdateByClientIdMutationRequest,
  PutClientUpdateByClientIdMutationResponse,
  PutClientUpdateByClientIdPathParams,
} from '../models/PutClientUpdateByClientId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putClientUpdateByClientIdMutationKey = () => [{ url: '/client/update/{clientId}' }] as const

export type PutClientUpdateByClientIdMutationKey = ReturnType<typeof putClientUpdateByClientIdMutationKey>

/**
 * {@link /client/update/:clientId}
 */
export async function putClientUpdateByClientId(
  { clientId }: { clientId: PutClientUpdateByClientIdPathParams['clientId'] },
  data?: PutClientUpdateByClientIdMutationRequest,
  config: Partial<RequestConfig<PutClientUpdateByClientIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutClientUpdateByClientIdMutationResponse, ResponseErrorConfig<Error>, PutClientUpdateByClientIdMutationRequest>({
    method: 'PUT',
    url: `/client/update/${clientId}`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /client/update/:clientId}
 */
export function usePutClientUpdateByClientId(
  options: {
    mutation?: UseMutationOptions<
      PutClientUpdateByClientIdMutationResponse,
      ResponseErrorConfig<Error>,
      { clientId: PutClientUpdateByClientIdPathParams['clientId']; data?: PutClientUpdateByClientIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutClientUpdateByClientIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putClientUpdateByClientIdMutationKey()

  return useMutation<
    PutClientUpdateByClientIdMutationResponse,
    ResponseErrorConfig<Error>,
    { clientId: PutClientUpdateByClientIdPathParams['clientId']; data?: PutClientUpdateByClientIdMutationRequest }
  >({
    mutationFn: async ({ clientId, data }) => {
      return putClientUpdateByClientId({ clientId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}