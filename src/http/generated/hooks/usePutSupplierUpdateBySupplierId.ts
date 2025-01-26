import client from '@kubb/plugin-client/clients/axios'
import type {
  PutSupplierUpdateBySupplierIdMutationRequest,
  PutSupplierUpdateBySupplierIdMutationResponse,
  PutSupplierUpdateBySupplierIdPathParams,
  PutSupplierUpdateBySupplierId400,
  PutSupplierUpdateBySupplierId401,
  PutSupplierUpdateBySupplierId404,
} from '../models/SupplierController/PutSupplierUpdateBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { putSupplierUpdateBySupplierId } from '../clients/putSupplierUpdateBySupplierId.ts'
import { useMutation } from '@tanstack/react-query'

export const putSupplierUpdateBySupplierIdMutationKey = () => [{ url: '/supplier/update/{supplierId}' }] as const

export type PutSupplierUpdateBySupplierIdMutationKey = ReturnType<typeof putSupplierUpdateBySupplierIdMutationKey>

/**
 * @description Update a supplier
 * {@link /supplier/update/:supplierId}
 */
export function usePutSupplierUpdateBySupplierId(
  options: {
    mutation?: UseMutationOptions<
      PutSupplierUpdateBySupplierIdMutationResponse,
      ResponseErrorConfig<PutSupplierUpdateBySupplierId400 | PutSupplierUpdateBySupplierId401 | PutSupplierUpdateBySupplierId404>,
      { supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId']; data?: PutSupplierUpdateBySupplierIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutSupplierUpdateBySupplierIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putSupplierUpdateBySupplierIdMutationKey()

  return useMutation<
    PutSupplierUpdateBySupplierIdMutationResponse,
    ResponseErrorConfig<PutSupplierUpdateBySupplierId400 | PutSupplierUpdateBySupplierId401 | PutSupplierUpdateBySupplierId404>,
    { supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId']; data?: PutSupplierUpdateBySupplierIdMutationRequest }
  >({
    mutationFn: async ({ supplierId, data }) => {
      return putSupplierUpdateBySupplierId(supplierId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}