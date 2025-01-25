import client from '@kubb/plugin-client/clients/axios'
import type {
  PutItensUpdateByItemIdMutationRequest,
  PutItensUpdateByItemIdMutationResponse,
  PutItensUpdateByItemIdPathParams,
} from '../models/PutItensUpdateByItemId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putItensUpdateByItemIdMutationKey = () => [{ url: '/itens/update/{itemId}' }] as const

export type PutItensUpdateByItemIdMutationKey = ReturnType<typeof putItensUpdateByItemIdMutationKey>

/**
 * {@link /itens/update/:itemId}
 */
export async function putItensUpdateByItemId(
  { itemId }: { itemId: PutItensUpdateByItemIdPathParams['itemId'] },
  data?: PutItensUpdateByItemIdMutationRequest,
  config: Partial<RequestConfig<PutItensUpdateByItemIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutItensUpdateByItemIdMutationResponse, ResponseErrorConfig<Error>, PutItensUpdateByItemIdMutationRequest>({
    method: 'PUT',
    url: `/itens/update/${itemId}`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /itens/update/:itemId}
 */
export function usePutItensUpdateByItemId(
  options: {
    mutation?: UseMutationOptions<
      PutItensUpdateByItemIdMutationResponse,
      ResponseErrorConfig<Error>,
      { itemId: PutItensUpdateByItemIdPathParams['itemId']; data?: PutItensUpdateByItemIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutItensUpdateByItemIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putItensUpdateByItemIdMutationKey()

  return useMutation<
    PutItensUpdateByItemIdMutationResponse,
    ResponseErrorConfig<Error>,
    { itemId: PutItensUpdateByItemIdPathParams['itemId']; data?: PutItensUpdateByItemIdMutationRequest }
  >({
    mutationFn: async ({ itemId, data }) => {
      return putItensUpdateByItemId({ itemId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}