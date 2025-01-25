import client from '@kubb/plugin-client/clients/axios'
import type { DeleteUnitRemoveByUnitIdMutationResponse, DeleteUnitRemoveByUnitIdPathParams } from '../models/DeleteUnitRemoveByUnitId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteUnitRemoveByUnitIdMutationKey = () => [{ url: '/unit/remove/{unitId}' }] as const

export type DeleteUnitRemoveByUnitIdMutationKey = ReturnType<typeof deleteUnitRemoveByUnitIdMutationKey>

/**
 * {@link /unit/remove/:unitId}
 */
export async function deleteUnitRemoveByUnitId(
  { unitId }: { unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteUnitRemoveByUnitIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/unit/remove/${unitId}`,
    baseURL: 'https://api.orbizy.app',
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /unit/remove/:unitId}
 */
export function useDeleteUnitRemoveByUnitId(
  options: {
    mutation?: UseMutationOptions<
      DeleteUnitRemoveByUnitIdMutationResponse,
      ResponseErrorConfig<Error>,
      { unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteUnitRemoveByUnitIdMutationKey()

  return useMutation<DeleteUnitRemoveByUnitIdMutationResponse, ResponseErrorConfig<Error>, { unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'] }>({
    mutationFn: async ({ unitId }) => {
      return deleteUnitRemoveByUnitId({ unitId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}