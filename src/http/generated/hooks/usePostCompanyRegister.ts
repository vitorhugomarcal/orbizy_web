import client from '@kubb/plugin-client/clients/axios'
import type { PostCompanyRegisterMutationRequest, PostCompanyRegisterMutationResponse } from '../models/PostCompanyRegister.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postCompanyRegisterMutationKey = () => [{ url: '/company/register' }] as const

export type PostCompanyRegisterMutationKey = ReturnType<typeof postCompanyRegisterMutationKey>

/**
 * {@link /company/register}
 */
export async function postCompanyRegister(
  data: PostCompanyRegisterMutationRequest,
  config: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostCompanyRegisterMutationResponse, ResponseErrorConfig<Error>, PostCompanyRegisterMutationRequest>({
    method: 'POST',
    url: `/company/register`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /company/register}
 */
export function usePostCompanyRegister(
  options: {
    mutation?: UseMutationOptions<PostCompanyRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostCompanyRegisterMutationRequest }>
    client?: Partial<RequestConfig<PostCompanyRegisterMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postCompanyRegisterMutationKey()

  return useMutation<PostCompanyRegisterMutationResponse, ResponseErrorConfig<Error>, { data: PostCompanyRegisterMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postCompanyRegister(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}