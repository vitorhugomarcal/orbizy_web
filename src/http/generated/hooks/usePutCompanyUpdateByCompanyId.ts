import client from '@kubb/plugin-client/clients/axios'
import type {
  PutCompanyUpdateByCompanyIdMutationRequest,
  PutCompanyUpdateByCompanyIdMutationResponse,
  PutCompanyUpdateByCompanyIdPathParams,
  PutCompanyUpdateByCompanyId400,
  PutCompanyUpdateByCompanyId401,
  PutCompanyUpdateByCompanyId404,
} from "../models/'CompanyController/PutCompanyUpdateByCompanyId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { putCompanyUpdateByCompanyId } from '../clients/putCompanyUpdateByCompanyId.ts'
import { useMutation } from '@tanstack/react-query'

export const putCompanyUpdateByCompanyIdMutationKey = () => [{ url: '/company/update/{companyId}' }] as const

export type PutCompanyUpdateByCompanyIdMutationKey = ReturnType<typeof putCompanyUpdateByCompanyIdMutationKey>

/**
 * @description Update a company
 * {@link /company/update/:companyId}
 */
export function usePutCompanyUpdateByCompanyId(
  options: {
    mutation?: UseMutationOptions<
      PutCompanyUpdateByCompanyIdMutationResponse,
      ResponseErrorConfig<PutCompanyUpdateByCompanyId400 | PutCompanyUpdateByCompanyId401 | PutCompanyUpdateByCompanyId404>,
      { companyId: PutCompanyUpdateByCompanyIdPathParams['companyId']; data?: PutCompanyUpdateByCompanyIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutCompanyUpdateByCompanyIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putCompanyUpdateByCompanyIdMutationKey()

  return useMutation<
    PutCompanyUpdateByCompanyIdMutationResponse,
    ResponseErrorConfig<PutCompanyUpdateByCompanyId400 | PutCompanyUpdateByCompanyId401 | PutCompanyUpdateByCompanyId404>,
    { companyId: PutCompanyUpdateByCompanyIdPathParams['companyId']; data?: PutCompanyUpdateByCompanyIdMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return putCompanyUpdateByCompanyId(companyId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}