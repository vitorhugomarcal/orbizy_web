import client from '@kubb/plugin-client/clients/axios'
import type { PostUnitCompanyCreateMutationRequest, PostUnitCompanyCreateMutationResponse } from '../models/PostUnitCompanyCreate.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const postUnitCompanyCreateMutationKey = () => [{ url: '/unit/company/create' }] as const

export type PostUnitCompanyCreateMutationKey = ReturnType<typeof postUnitCompanyCreateMutationKey>

/**
 * {@link /unit/company/create}
 */
export async function postUnitCompanyCreate(
  data: PostUnitCompanyCreateMutationRequest,
  config: Partial<RequestConfig<PostUnitCompanyCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<PostUnitCompanyCreateMutationResponse, ResponseErrorConfig<Error>, PostUnitCompanyCreateMutationRequest>({
    method: 'POST',
    url: `/unit/company/create`,
    baseURL: 'https://api.orbizy.app',
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /unit/company/create}
 */
export function usePostUnitCompanyCreate(
  options: {
    mutation?: UseMutationOptions<PostUnitCompanyCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostUnitCompanyCreateMutationRequest }>
    client?: Partial<RequestConfig<PostUnitCompanyCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? postUnitCompanyCreateMutationKey()

  return useMutation<PostUnitCompanyCreateMutationResponse, ResponseErrorConfig<Error>, { data: PostUnitCompanyCreateMutationRequest }>({
    mutationFn: async ({ data }) => {
      return postUnitCompanyCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}