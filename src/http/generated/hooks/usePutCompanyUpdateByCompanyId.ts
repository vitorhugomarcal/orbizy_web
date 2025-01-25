import client from '@kubb/plugin-client/clients/axios'
import type {
  PutCompanyUpdateByCompanyIdMutationRequest,
  PutCompanyUpdateByCompanyIdMutationResponse,
  PutCompanyUpdateByCompanyIdPathParams,
} from '../models/PutCompanyUpdateByCompanyId.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putCompanyUpdateByCompanyIdMutationKey = () => [{ url: '/company/update/{companyId}' }] as const

export type PutCompanyUpdateByCompanyIdMutationKey = ReturnType<typeof putCompanyUpdateByCompanyIdMutationKey>

/**
 * {@link /company/update/:companyId}
 */
export async function putCompanyUpdateByCompanyId(
  { companyId }: { companyId: PutCompanyUpdateByCompanyIdPathParams['companyId'] },
  data?: PutCompanyUpdateByCompanyIdMutationRequest,
  config: Partial<RequestConfig<PutCompanyUpdateByCompanyIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PutCompanyUpdateByCompanyIdMutationResponse, ResponseErrorConfig<Error>, PutCompanyUpdateByCompanyIdMutationRequest>({
    method: 'PUT',
    url: `/company/update/${companyId}`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /company/update/:companyId}
 */
export function usePutCompanyUpdateByCompanyId(
  options: {
    mutation?: UseMutationOptions<
      PutCompanyUpdateByCompanyIdMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: PutCompanyUpdateByCompanyIdPathParams['companyId']; data?: PutCompanyUpdateByCompanyIdMutationRequest }
    >
    client?: Partial<RequestConfig<PutCompanyUpdateByCompanyIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? putCompanyUpdateByCompanyIdMutationKey()

  return useMutation<
    PutCompanyUpdateByCompanyIdMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: PutCompanyUpdateByCompanyIdPathParams['companyId']; data?: PutCompanyUpdateByCompanyIdMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return putCompanyUpdateByCompanyId({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}