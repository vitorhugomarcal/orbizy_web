import client from '@kubb/plugin-client/clients/axios'
import type { PutMeUpdateMutationRequest, PutMeUpdateMutationResponse, PutMeUpdate401 } from "../models/'UserController/PutMeUpdate.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { putMeUpdate } from '../clients/putMeUpdate.ts'
import { useMutation } from '@tanstack/react-query'

export const putMeUpdateMutationKey = () => [{ url: '/me/update' }] as const

export type PutMeUpdateMutationKey = ReturnType<typeof putMeUpdateMutationKey>

/**
 * @description Update the current user's profile
 * {@link /me/update}
 */
export function usePutMeUpdate(
  options: {
    mutation?: UseMutationOptions<PutMeUpdateMutationResponse, ResponseErrorConfig<PutMeUpdate401>, { data?: PutMeUpdateMutationRequest }>
    client?: Partial<RequestConfig<PutMeUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putMeUpdateMutationKey()

  return useMutation<PutMeUpdateMutationResponse, ResponseErrorConfig<PutMeUpdate401>, { data?: PutMeUpdateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return putMeUpdate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}