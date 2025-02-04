import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  DeleteCompanyRemoveByCompanyIdMutationResponse,
  DeleteCompanyRemoveByCompanyIdPathParams,
  DeleteCompanyRemoveByCompanyId400,
  DeleteCompanyRemoveByCompanyId401,
} from '../models/CompanyController/DeleteCompanyRemoveByCompanyId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteCompanyRemoveByCompanyIdMutationKey = () => [{ url: '/company/remove/{companyId}' }] as const

export type DeleteCompanyRemoveByCompanyIdMutationKey = ReturnType<typeof deleteCompanyRemoveByCompanyIdMutationKey>

/**
 * @description Remove a company
 * {@link /company/remove/:companyId}
 */
export async function deleteCompanyRemoveByCompanyId(
  companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeleteCompanyRemoveByCompanyIdMutationResponse,
    ResponseErrorConfig<DeleteCompanyRemoveByCompanyId400 | DeleteCompanyRemoveByCompanyId401>,
    unknown
  >({ method: 'DELETE', url: `/company/remove/${companyId}`, baseURL: 'http://192.168.1.81:3333', ...requestConfig })
  return res.data
}

/**
 * @description Remove a company
 * {@link /company/remove/:companyId}
 */
export function useDeleteCompanyRemoveByCompanyId(
  options: {
    mutation?: UseMutationOptions<
      DeleteCompanyRemoveByCompanyIdMutationResponse,
      ResponseErrorConfig<DeleteCompanyRemoveByCompanyId400 | DeleteCompanyRemoveByCompanyId401>,
      { companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteCompanyRemoveByCompanyIdMutationKey()

  return useMutation<
    DeleteCompanyRemoveByCompanyIdMutationResponse,
    ResponseErrorConfig<DeleteCompanyRemoveByCompanyId400 | DeleteCompanyRemoveByCompanyId401>,
    { companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'] }
  >({
    mutationFn: async ({ companyId }) => {
      return deleteCompanyRemoveByCompanyId(companyId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}