import client from '../../client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../client.ts'
import type {
  PostCompanyRegisterMutationRequest,
  PostCompanyRegisterMutationResponse,
  PostCompanyRegister400,
  PostCompanyRegister401,
} from '../models/CompanyController/PostCompanyRegister.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postCompanyRegisterMutationKey = () => [{ url: '/company/register' }] as const

export type PostCompanyRegisterMutationKey = ReturnType<typeof postCompanyRegisterMutationKey>

/**
 * @description Register a new company (individual or corporate)
 * {@link /company/register}
 */
export async function postCompanyRegister(
  data: PostCompanyRegisterMutationRequest,
  config: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    PostCompanyRegisterMutationResponse,
    ResponseErrorConfig<PostCompanyRegister400 | PostCompanyRegister401>,
    PostCompanyRegisterMutationRequest
  >({ method: 'POST', url: `/company/register`, baseURL: 'https://api.orbizy.app', data, ...requestConfig })
  return res.data
}

/**
 * @description Register a new company (individual or corporate)
 * {@link /company/register}
 */
export function usePostCompanyRegister(
  options: {
    mutation?: UseMutationOptions<
      PostCompanyRegisterMutationResponse,
      ResponseErrorConfig<PostCompanyRegister400 | PostCompanyRegister401>,
      { data: PostCompanyRegisterMutationRequest }
    >
    client?: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postCompanyRegisterMutationKey()

  return useMutation<
    PostCompanyRegisterMutationResponse,
    ResponseErrorConfig<PostCompanyRegister400 | PostCompanyRegister401>,
    { data: PostCompanyRegisterMutationRequest }
  >({
    mutationFn: async ({ data }) => {
      return postCompanyRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}