import client from '@kubb/plugin-client/clients/axios'
import type { DeleteCompanyRemoveByCompanyIdMutationResponse, DeleteCompanyRemoveByCompanyIdPathParams } from '../models/DeleteCompanyRemoveByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteCompanyRemoveByCompanyIdMutationKey = () => [{ url: '/company/remove/{companyId}' }] as const

export type DeleteCompanyRemoveByCompanyIdMutationKey = ReturnType<typeof deleteCompanyRemoveByCompanyIdMutationKey>

/**
 * {@link /company/remove/:companyId}
 */
export async function deleteCompanyRemoveByCompanyId(
  { companyId }: { companyId: DeleteCompanyRemoveByCompanyIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteCompanyRemoveByCompanyIdMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/company/remove/${companyId}`,
    ...requestConfig,
  })
  return res.data
}

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