import client from '@kubb/plugin-client/clients/axios'
import type {
  PutSupplierUpdateBySupplierIdMutationRequest,
  PutSupplierUpdateBySupplierIdMutationResponse,
  PutSupplierUpdateBySupplierIdPathParams,
} from '../models/PutSupplierUpdateBySupplierId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putSupplierUpdateBySupplierIdMutationKey = () => [{ url: '/supplier/update/{supplierId}' }] as const

export type PutSupplierUpdateBySupplierIdMutationKey = ReturnType<typeof putSupplierUpdateBySupplierIdMutationKey>

/**
 * {@link /supplier/update/:supplierId}
 */
export async function putSupplierUpdateBySupplierId(
  { supplierId }: { supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId'] },
  data?: PutSupplierUpdateBySupplierIdMutationRequest,
  config: Partial<RequestConfig<PutSupplierUpdateBySupplierIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutSupplierUpdateBySupplierIdMutationResponse, ResponseErrorConfig<Error>, PutSupplierUpdateBySupplierIdMutationRequest>({
    method: 'PUT',
    url: `/supplier/update/${supplierId}`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /supplier/update/:supplierId}
 */
export function usePutSupplierUpdateBySupplierId(
  options: {
    mutation?: UseMutationOptions<
      PutSupplierUpdateBySupplierIdMutationResponse,
      ResponseErrorConfig<Error>,
      { supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId']; data?: PutSupplierUpdateBySupplierIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutSupplierUpdateBySupplierIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putSupplierUpdateBySupplierIdMutationKey()

  return useMutation<
    PutSupplierUpdateBySupplierIdMutationResponse,
    ResponseErrorConfig<Error>,
    { supplierId: PutSupplierUpdateBySupplierIdPathParams['supplierId']; data?: PutSupplierUpdateBySupplierIdMutationRequest }
  >({
    mutationFn: async ({ supplierId, data }) => {
      return putSupplierUpdateBySupplierId({ supplierId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}