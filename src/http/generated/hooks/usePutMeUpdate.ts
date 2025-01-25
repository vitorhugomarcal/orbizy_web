import client from '@kubb/plugin-client/clients/axios'
import type { PutMeUpdateMutationRequest, PutMeUpdateMutationResponse } from '../models/PutMeUpdate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putMeUpdateMutationKey = () => [{ url: '/me/update' }] as const

export type PutMeUpdateMutationKey = ReturnType<typeof putMeUpdateMutationKey>

/**
 * {@link /me/update}
 */
export async function putMeUpdate(
  data?: PutMeUpdateMutationRequest,
  config: Partial<RequestConfig<PutMeUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutMeUpdateMutationResponse, ResponseErrorConfig<Error>, PutMeUpdateMutationRequest>({
    method: 'PUT',
    url: `/me/update`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /me/update}
 */
export function usePutMeUpdate(
  options: {
    mutation?: UseMutationOptions<PutMeUpdateMutationResponse, ResponseErrorConfig<Error>, { data?: PutMeUpdateMutationRequest }>
    client?: Partial<RequestConfig<PutMeUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putMeUpdateMutationKey()

  return useMutation<PutMeUpdateMutationResponse, ResponseErrorConfig<Error>, { data?: PutMeUpdateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return putMeUpdate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}