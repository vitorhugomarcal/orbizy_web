import client from '@kubb/plugin-client/clients/axios'
import type {
  DeleteSupplierRemoveBySupplierIdMutationResponse,
  DeleteSupplierRemoveBySupplierIdPathParams,
  DeleteSupplierRemoveBySupplierId400,
  DeleteSupplierRemoveBySupplierId401,
  DeleteSupplierRemoveBySupplierId404,
} from '../models/SupplierController/DeleteSupplierRemoveBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteSupplierRemoveBySupplierId } from '../clients/deleteSupplierRemoveBySupplierId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteSupplierRemoveBySupplierIdMutationKey = () => [{ url: '/supplier/remove/{supplierId}' }] as const

export type DeleteSupplierRemoveBySupplierIdMutationKey = ReturnType<typeof deleteSupplierRemoveBySupplierIdMutationKey>

/**
 * @description Remove a supplier
 * {@link /supplier/remove/:supplierId}
 */
export function useDeleteSupplierRemoveBySupplierId(
  options: {
    mutation?: UseMutationOptions<
      DeleteSupplierRemoveBySupplierIdMutationResponse,
      ResponseErrorConfig<DeleteSupplierRemoveBySupplierId400 | DeleteSupplierRemoveBySupplierId401 | DeleteSupplierRemoveBySupplierId404>,
      { supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteSupplierRemoveBySupplierIdMutationKey()

  return useMutation<
    DeleteSupplierRemoveBySupplierIdMutationResponse,
    ResponseErrorConfig<DeleteSupplierRemoveBySupplierId400 | DeleteSupplierRemoveBySupplierId401 | DeleteSupplierRemoveBySupplierId404>,
    { supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId'] }
  >({
    mutationFn: async ({ supplierId }) => {
      return deleteSupplierRemoveBySupplierId(supplierId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}