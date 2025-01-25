import client from '@kubb/plugin-client/clients/axios'
import type { DeleteCompanyRemoveByCompanyIdMutationResponse, DeleteCompanyRemoveByCompanyIdPathParams } from '../models/DeleteCompanyRemoveByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteCompanyRemoveByCompanyId } from '../clients/deleteCompanyRemoveByCompanyId.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteCompanyRemoveByCompanyIdMutationKey = () => [{ url: '/company/remove/{companyId}' }] as const

export type DeleteCompanyRemoveByCompanyIdMutationKey = ReturnType<typeof deleteCompanyRemoveByCompanyIdMutationKey>

/**
 * {@link /company/remove/:companyId}
 */
export function useDeleteCompanyRemoveByCompanyId(
  options: {
    mutation?: UseMutationOptions<
      DeleteCompanyRemoveByCompanyIdMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteCompanyRemoveByCompanyIdMutationKey()

  return useMutation<
    DeleteCompanyRemoveByCompanyIdMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'] }
  >({
    mutationFn: async ({ companyId }) => {
      return deleteCompanyRemoveByCompanyId({ companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}