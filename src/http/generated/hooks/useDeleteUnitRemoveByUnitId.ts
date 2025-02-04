import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  DeleteUnitRemoveByUnitIdMutationResponse,
  DeleteUnitRemoveByUnitIdPathParams,
  DeleteUnitRemoveByUnitId401,
} from '../models/UnitController/DeleteUnitRemoveByUnitId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteUnitRemoveByUnitIdMutationKey = () => [{ url: '/unit/remove/{unitId}' }] as const

export type DeleteUnitRemoveByUnitIdMutationKey = ReturnType<typeof deleteUnitRemoveByUnitIdMutationKey>

/**
 * @description Remove a unit
 * {@link /unit/remove/:unitId}
 */
export async function deleteUnitRemoveByUnitId(
  unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteUnitRemoveByUnitIdMutationResponse, ResponseErrorConfig<DeleteUnitRemoveByUnitId401>, unknown>({
    method: 'DELETE',
    url: `/unit/remove/${unitId}`,
    baseURL: 'http://192.168.1.81:3333',
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Remove a unit
 * {@link /unit/remove/:unitId}
 */
export function useDeleteUnitRemoveByUnitId(
  options: {
    mutation?: UseMutationOptions<
      DeleteUnitRemoveByUnitIdMutationResponse,
      ResponseErrorConfig<DeleteUnitRemoveByUnitId401>,
      { unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteUnitRemoveByUnitIdMutationKey()

  return useMutation<
    DeleteUnitRemoveByUnitIdMutationResponse,
    ResponseErrorConfig<DeleteUnitRemoveByUnitId401>,
    { unitId: DeleteUnitRemoveByUnitIdPathParams['unitId'] }
  >({
    mutationFn: async ({ unitId }) => {
      return deleteUnitRemoveByUnitId(unitId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}