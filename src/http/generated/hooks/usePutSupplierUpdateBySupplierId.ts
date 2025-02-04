import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PutSupplierUpdateBySupplierIdMutationRequest,
  PutSupplierUpdateBySupplierIdMutationResponse,
  PutSupplierUpdateBySupplierIdPathParams,
  PutSupplierUpdateBySupplierId400,
  PutSupplierUpdateBySupplierId401,
  PutSupplierUpdateBySupplierId404,
} from '../models/SupplierController/PutSupplierUpdateBySupplierId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putSupplierUpdateBySupplierIdMutationKey = () => [{ url: '/supplier/update/{supplierId}' }] as const

export type PutSupplierUpdateBySupplierIdMutationKey = ReturnType<typeof putSupplierUpdateBySupplierIdMutationKey>

/**
 * @description Update a supplier
 * {@link /supplier/update/:supplierId}
 */
export async function putSupplierUpdateBySupplierId(
  supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId'],
  data?: PutSupplierUpdateBySupplierIdMutationRequest,
  config: Partial<RequestConfig<PutSupplierUpdateBySupplierIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutSupplierUpdateBySupplierIdMutationResponse,
    ResponseErrorConfig<PutSupplierUpdateBySupplierId400 | PutSupplierUpdateBySupplierId401 | PutSupplierUpdateBySupplierId404>,
    PutSupplierUpdateBySupplierIdMutationRequest
  >({ method: 'PUT', url: `/supplier/update/${supplierId}`, baseURL: 'http://192.168.1.81:3333', data, ...requestConfig })
  return res.data
}

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