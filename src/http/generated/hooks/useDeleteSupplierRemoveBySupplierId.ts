import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  DeleteSupplierRemoveBySupplierIdMutationResponse,
  DeleteSupplierRemoveBySupplierIdPathParams,
  DeleteSupplierRemoveBySupplierId400,
  DeleteSupplierRemoveBySupplierId401,
  DeleteSupplierRemoveBySupplierId404,
} from '../models/SupplierController/DeleteSupplierRemoveBySupplierId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteSupplierRemoveBySupplierIdMutationKey = () => [{ url: '/supplier/remove/{supplierId}' }] as const

export type DeleteSupplierRemoveBySupplierIdMutationKey = ReturnType<typeof deleteSupplierRemoveBySupplierIdMutationKey>

/**
 * @description Remove a supplier
 * {@link /supplier/remove/:supplierId}
 */
export async function deleteSupplierRemoveBySupplierId(
  supplierId: DeleteSupplierRemoveBySupplierIdPathParams['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteSupplierRemoveBySupplierIdMutationResponse,
    ResponseErrorConfig<DeleteSupplierRemoveBySupplierId400 | DeleteSupplierRemoveBySupplierId401 | DeleteSupplierRemoveBySupplierId404>,
    unknown
  >({ method: 'DELETE', url: `/supplier/remove/${supplierId}`, baseURL: 'http://192.168.1.81:3333', ...requestConfig })
  return res.data
}

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