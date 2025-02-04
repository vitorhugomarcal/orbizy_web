import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type { PutMeUpdateMutationRequest, PutMeUpdateMutationResponse, PutMeUpdate401 } from '../models/UserController/PutMeUpdate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putMeUpdateMutationKey = () => [{ url: '/me/update' }] as const

export type PutMeUpdateMutationKey = ReturnType<typeof putMeUpdateMutationKey>

/**
 * @description Update the current user's profile
 * {@link /me/update}
 */
export async function putMeUpdate(
  data?: PutMeUpdateMutationRequest,
  config: Partial<RequestConfig<PutMeUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutMeUpdateMutationResponse, ResponseErrorConfig<PutMeUpdate401>, PutMeUpdateMutationRequest>({
    method: 'PUT',
    url: `/me/update`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

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