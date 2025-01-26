import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteUnitRemoveByUnitIdMutationResponse,
  DeleteUnitRemoveByUnitIdPathParams,
  DeleteUnitRemoveByUnitId401,
} from '../models/UnitController/DeleteUnitRemoveByUnitId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteUnitRemoveByUnitId } from '../clients/deleteUnitRemoveByUnitId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteUnitRemoveByUnitIdMutationKey = () => [{ url: '/unit/remove/{unitId}' }] as const

export type DeleteUnitRemoveByUnitIdMutationKey = ReturnType<typeof deleteUnitRemoveByUnitIdMutationKey>

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