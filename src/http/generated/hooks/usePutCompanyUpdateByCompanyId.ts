import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PutCompanyUpdateByCompanyIdMutationRequest,
  PutCompanyUpdateByCompanyIdMutationResponse,
  PutCompanyUpdateByCompanyIdPathParams,
  PutCompanyUpdateByCompanyId400,
  PutCompanyUpdateByCompanyId401,
  PutCompanyUpdateByCompanyId404,
} from '../models/CompanyController/PutCompanyUpdateByCompanyId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const putCompanyUpdateByCompanyIdMutationKey = () => [{ url: '/company/update/{companyId}' }] as const

export type PutCompanyUpdateByCompanyIdMutationKey = ReturnType<typeof putCompanyUpdateByCompanyIdMutationKey>

/**
 * @description Update a company
 * {@link /company/update/:companyId}
 */
export async function putCompanyUpdateByCompanyId(
  companyId: PutCompanyUpdateByCompanyIdPathParams['companyId'],
  data?: PutCompanyUpdateByCompanyIdMutationRequest,
  config: Partial<RequestConfig<PutCompanyUpdateByCompanyIdMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PutCompanyUpdateByCompanyIdMutationResponse,
    ResponseErrorConfig<PutCompanyUpdateByCompanyId400 | PutCompanyUpdateByCompanyId401 | PutCompanyUpdateByCompanyId404>,
    PutCompanyUpdateByCompanyIdMutationRequest
  >({ method: 'PUT', url: `/company/update/${companyId}`, baseURL: 'http://192.168.1.81:3333', data, ...requestConfig })
  return res.data
}

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